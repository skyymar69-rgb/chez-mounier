import { useState, useRef, useEffect, useCallback, type FormEvent, type KeyboardEvent } from "react";
import { useTranslation } from "@/i18n/useTranslation";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Message {
  role: "user" | "assistant";
  content: string;
}

/* ------------------------------------------------------------------ */
/*  System prompt — all restaurant info lives here                     */
/* ------------------------------------------------------------------ */

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de Chez Mounier, un bouchon lyonnais authentique fondé en 1985 par Marc Mounier. Aujourd'hui, le restaurant est dirigé par Chrystelle (fille de Marc) et Manon (petite-fille).

Informations clés :
- Nom : Chez Mounier — Bouchon Lyonnais depuis 1985
- Adresse : 3 Rue des Marronniers, 69002 Lyon
- Téléphone : 04 78 37 79 26
- Horaires : Mardi au Vendredi 12h-14h15 et 19h-22h15 / Samedi 12h-14h30 et 19h-22h15 / Fermé dimanche et lundi
- Métro : Bellecour (Ligne A), à 3 minutes à pied
- Réservation fortement recommandée (complet tous les soirs)

Spécialités :
- Quenelles de brochet
- Tablier de sapeur
- Gnafron (invention de Marc Mounier)
- Salade lyonnaise
- Tarte aux pralines
- Cervelle de canut
- St-Marcellin Mère Richard

Menu complet (entrée + plat + fromage + dessert) à moins de 20 €. Tout est fait maison, y compris les pâtes à pâtisserie.

Services :
- Accès PMR (personnes à mobilité réduite)
- Climatisation
- Terrasse
- WiFi gratuit
- Animaux acceptés

Moyens de paiement : Espèces, chèques, CB, Visa, Mastercard, Maestro, sans contact, Ticket Restaurant

Réseaux sociaux :
- Instagram : @chezmounier
- Facebook : Chez-Mounier

Consignes :
- Réponds toujours en français.
- Sois chaleureux, accueillant et convivial, comme dans un vrai bouchon lyonnais.
- Reste concis (2-4 phrases max sauf si on te demande plus de détails).
- Si on te pose une question hors sujet, ramène poliment la conversation vers le restaurant.
- Pour les réservations, invite à appeler le 04 78 37 79 26 ou à réserver en ligne.`;

/* WELCOME_MESSAGE and FALLBACK_MESSAGE moved inside the component to use t() */

/* ------------------------------------------------------------------ */
/*  Icons (inline SVGs to avoid extra dependencies)                    */
/* ------------------------------------------------------------------ */

function ChatBubbleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Gemini API helper                                                  */
/* ------------------------------------------------------------------ */

async function askGemini(history: Message[], fallbackMessage: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  if (!apiKey) return fallbackMessage;

  const contents = [
    { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
    { role: "model", parts: [{ text: "Compris ! Je suis pr\u00eat \u00e0 aider les clients de Chez Mounier." }] },
    ...history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
  ];

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    },
  );

  if (!res.ok) {
    await res.text();
    return "D\u00e9sol\u00e9, une erreur est survenue. Veuillez r\u00e9essayer ou nous appeler au 04 78 37 79 26.";
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text ?? "Je n'ai pas pu g\u00e9n\u00e9rer de r\u00e9ponse. N'h\u00e9sitez pas \u00e0 appeler le 04 78 37 79 26.";
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Chatbot() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: t("chatbot.welcome") },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Auto-scroll to latest message */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* Focus input when panel opens */
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  /* Escape key closes the panel */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    },
    [open],
  );

  /* Submit message */
  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInput("");
    setLoading(true);

    try {
      // Send full history (excluding the welcome message) for context
      const historyForApi = updatedHistory.filter((_, i) => i > 0);
      const reply = await askGemini(historyForApi, t("chatbot.fallback"));
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: t("chatbot.error"),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ---------- Floating button ---------- */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label={t("chatbot.open")}
          className="fixed bottom-20 right-4 z-[70] flex h-14 w-14 items-center justify-center rounded-full bistro-gradient text-cream shadow-lg transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:bottom-6 sm:right-6"
        >
          <ChatBubbleIcon className="h-6 w-6" />
        </button>
      )}

      {/* ---------- Chat panel ---------- */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label={t("chatbot.title")}
          aria-modal="true"
          onKeyDown={handleKeyDown}
          className="fixed bottom-0 right-0 z-[70] flex h-[100dvh] w-full flex-col sm:bottom-6 sm:right-6 sm:h-[min(600px,80dvh)] sm:w-[400px] sm:rounded-2xl sm:shadow-2xl overflow-hidden"
        >
          {/* Glass background */}
          <div className="absolute inset-0 glass sm:rounded-2xl" />

          {/* ----- Header ----- */}
          <header className="relative z-10 flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-400" aria-hidden="true" />
              <h2 className="font-serif text-lg font-semibold text-gold">{t("chatbot.title")}</h2>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label={t("chatbot.close")}
              className="flex h-8 w-8 items-center justify-center rounded-full text-warm-foreground/70 transition-colors hover:bg-white/10 hover:text-warm-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </header>

          {/* ----- Messages ----- */}
          <div
            className="relative z-10 flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin"
            role="log"
            aria-live="polite"
            aria-label={t("chatbot.messages_label")}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bistro-gradient text-cream rounded-br-sm"
                      : "bg-white/10 text-warm-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gold [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gold [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gold [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ----- Input ----- */}
          <form
            onSubmit={handleSubmit}
            className="relative z-10 flex items-center gap-2 border-t border-white/10 px-4 py-3"
          >
            <label htmlFor="chatbot-input" className="sr-only">
              {t("chatbot.label")}
            </label>
            <input
              ref={inputRef}
              id="chatbot-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chatbot.placeholder")}
              disabled={loading}
              autoComplete="off"
              className="flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-warm-foreground placeholder:text-warm-foreground/40 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label={t("chatbot.send")}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bistro-gradient text-cream transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-40"
            >
              <SendIcon className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
