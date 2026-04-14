import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "@/i18n/useTranslation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { MapPin, Phone, Clock, Mail, Send, CheckCircle, ExternalLink, Accessibility, Wifi, Dog, Wind, TreePine } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact & Accès — Chez Mounier Lyon | Métro Bellecour" },
      { name: "description", content: "Chez Mounier : 3 Rue des Marronniers, 69002 Lyon. Tél. 04 78 37 79 26. Métro Bellecour (3 min). Horaires, plan d'accès, formulaire de contact et réseaux sociaux." },
      { property: "og:title", content: "Contact & Accès — Chez Mounier Lyon" },
      { property: "og:description", content: "3 Rue des Marronniers, Lyon 2e. À 3 min du métro Bellecour. Ouvert mar-sam, midi et soir." },
      { property: "og:url", content: "https://chezmounier.fr/contact" },
      { property: "og:image", content: "https://chezmounier.fr/og-image.webp" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://chezmounier.fr/contact" }],
  }),
});

const contactSchema = z.object({
  name: z.string().min(2, "Veuillez indiquer votre nom"),
  email: z.string().email("Adresse email invalide"),
  subject: z.string().min(2, "Veuillez indiquer un objet"),
  message: z.string().min(10, "Votre message est trop court"),
  consent: z.literal(true, { errorMap: () => ({ message: "Vous devez accepter la politique de confidentialité" }) }),
  honeypot: z.string().max(0).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const hourKeys = [
  { dayKey: "days.monday", time: "", closed: true },
  { dayKey: "days.tuesday", time: "12h00 – 14h15 / 19h00 – 22h15", closed: false },
  { dayKey: "days.wednesday", time: "12h00 – 14h15 / 19h00 – 22h15", closed: false },
  { dayKey: "days.thursday", time: "12h00 – 14h15 / 19h00 – 22h15", closed: false },
  { dayKey: "days.friday", time: "12h00 – 14h15 / 19h00 – 22h15", closed: false },
  { dayKey: "days.saturday", time: "12h00 – 14h30 / 19h00 – 22h15", closed: false },
  { dayKey: "days.sunday", time: "", closed: true },
];

function useIsOpen(): boolean {
  const now = new Date();
  const day = now.getDay();
  const time = now.getHours() * 60 + now.getMinutes();
  if (day === 0 || day === 1) return false;
  const lunchEnd = day === 6 ? 14 * 60 + 30 : 14 * 60 + 15;
  if (time >= 12 * 60 && time <= lunchEnd) return true;
  if (time >= 19 * 60 && time <= 22 * 60 + 15) return true;
  return false;
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const isOpen = useIsOpen();
  const { t } = useTranslation();

  const services = [
    { icon: Accessibility, label: t("info.pmr") },
    { icon: Wind, label: t("info.ac") },
    { icon: TreePine, label: t("info.terrace") },
    { icon: Wifi, label: t("info.wifi") },
    { icon: Dog, label: t("info.pets") },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (_data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
  };

  return (
    <Layout>
      <PageHeader
        overtitle={t("contact_page.overtitle")}
        title={t("contact_page.title")}
        description={t("contact_page.description")}
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Info */}
            <div className="space-y-8">
              {/* Address & Map */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-5 w-5 text-gold" />
                  <h2 className="font-serif text-xl font-semibold text-foreground">{t("contact_page.address_title")}</h2>
                </div>
                <address className="not-italic text-muted-foreground leading-relaxed mb-2">
                  3 Rue des Marronniers<br />
                  69002 Lyon, France
                </address>
                <p className="text-xs text-muted-foreground/60">
                  {t("contact_page.metro")}
                </p>
                <div className="mt-4 overflow-hidden rounded-sm border border-border">
                  <iframe
                    title="Localisation Chez Mounier — 3 Rue des Marronniers, Lyon"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.3!2d4.8320!3d45.7575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ea516f6a6f29%3A0x4e95b8c9c5b3e4a!2sChez%20Mounier!5e0!3m2!1sfr!2sfr"
                    className="h-64 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gold flex-shrink-0" />
                  <a href="tel:+33478377926" className="text-lg font-serif font-bold text-primary transition-colors hover:text-primary/80">
                    04 78 37 79 26
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gold flex-shrink-0" />
                  <a href="mailto:contact@chezmounier.fr" className="text-muted-foreground transition-colors hover:text-foreground">
                    contact@chezmounier.fr
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gold" />
                    <h2 className="font-serif text-xl font-semibold text-foreground">{t("contact_page.hours_title")}</h2>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider ${
                      isOpen
                        ? "bg-green-100 text-green-700"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isOpen ? t("info.open") : t("info.closed")}
                  </span>
                </div>
                <div className="space-y-2">
                  {hourKeys.map((h) => (
                    <div key={h.dayKey} className="flex justify-between border-b border-border pb-2 text-sm">
                      <span className="font-medium text-foreground">{t(h.dayKey)}</span>
                      <span className={h.closed ? "text-muted-foreground/40 italic" : "text-muted-foreground"}>
                        {h.closed ? t("info.closed") : h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3">{t("contact_page.services_title")}</h3>
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => (
                    <div key={s.label} className="inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1.5 text-xs text-foreground">
                      <s.icon className="h-3.5 w-3.5 text-gold" />
                      {s.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3">{t("contact_page.social_title")}</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/p/Chez-Mounier-100063830836961/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Facebook <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href="https://www.tripadvisor.fr/Restaurant_Review-g187265-d782164-Reviews-Chez_Mounier-Lyon_Rhone_Auvergne_Rhone_Alpes.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    TripAdvisor <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact form */}
            <div>
              <div className="rounded-sm border border-border bg-card p-8">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">{t("contact_page.form_title")}</h2>

                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <p className="font-serif text-xl font-bold text-foreground">{t("contact_page.form_sent")}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t("contact_page.form_sent_message")}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                      <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-foreground">{t("contact_page.form_name")}</label>
                      <input
                        type="text"
                        id="contact-name"
                        {...register("name")}
                        className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                      />
                      {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-foreground">{t("contact_page.form_email")}</label>
                      <input
                        type="email"
                        id="contact-email"
                        {...register("email")}
                        className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                      />
                      {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium text-foreground">{t("contact_page.form_subject")}</label>
                      <input
                        type="text"
                        id="contact-subject"
                        {...register("subject")}
                        className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                      />
                      {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-foreground">{t("contact_page.form_message")}</label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        {...register("message")}
                        className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 resize-none"
                      />
                      {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
                    </div>

                    {/* Honeypot */}
                    <div className="absolute -left-[9999px]" aria-hidden="true">
                      <label htmlFor="contact-website">Ne pas remplir</label>
                      <input type="text" id="contact-website" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
                    </div>

                    {/* RGPD Consent */}
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          {...register("consent")}
                          className="mt-1 h-4 w-4 rounded border-input accent-primary"
                        />
                        <span className="text-sm text-muted-foreground leading-relaxed">
                          {t("contact_page.form_consent_prefix")}{" "}
                          <a href="/confidentialite" target="_blank" className="text-primary hover:underline">
                            {t("contact_page.form_consent_link")}
                          </a>. *
                        </span>
                      </label>
                      {errors.consent && <p className="mt-1 text-xs text-destructive">{errors.consent.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 rounded-sm bistro-gradient px-8 py-3 text-sm font-medium uppercase tracking-widest text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-[1.01] disabled:opacity-60"
                    >
                      <Send className="h-4 w-4" />
                      {isSubmitting ? t("contact_page.form_sending") : t("contact_page.form_send")}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
