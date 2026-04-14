import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "@/i18n/useTranslation";

const CONSENT_KEY = "chez-mounier-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const refuse = () => {
    localStorage.setItem(CONSENT_KEY, "refused");
    setVisible(false);
  };

  const { t } = useTranslation();

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("cookie.aria_label")}
      className="fixed bottom-0 left-0 right-0 z-[60] bg-warm text-warm-foreground shadow-2xl border-t border-warm-foreground/10"
    >
      <div className="mx-auto max-w-5xl px-6 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <p className="text-sm leading-relaxed">
            {t("cookie.message")}{" "}
            <Link to="/confidentialite" className="text-gold hover:underline">
              {t("cookie.learnmore")}
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={refuse}
            className="rounded-sm border border-warm-foreground/30 px-5 py-2 text-xs font-medium uppercase tracking-wider text-warm-foreground/70 transition-colors hover:border-warm-foreground hover:text-warm-foreground"
          >
            {t("cookie.refuse")}
          </button>
          <button
            onClick={accept}
            className="rounded-sm bistro-gradient px-5 py-2 text-xs font-medium uppercase tracking-wider text-primary-foreground shadow transition-all hover:shadow-lg"
          >
            {t("cookie.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
