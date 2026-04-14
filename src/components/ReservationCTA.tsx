import { useInView } from "@/hooks/useInView";
import { Phone, ExternalLink } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

export default function ReservationCTA() {
  const { ref, inView } = useInView();
  const { t } = useTranslation();

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-cream to-background overflow-hidden paper-grain">
      <div className="relative mx-auto max-w-3xl px-6 text-center z-10" ref={ref}>
        <div className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
            {t("cta.overtitle")}
          </p>
          <h5 className="font-serif text-xl font-bold text-cream-foreground md:text-2xl">
            {t("cta.title")}
          </h5>
          <div className="section-divider mx-auto mt-6" />
          <p className="mx-auto mt-6 max-w-lg text-muted-foreground leading-relaxed">
            {t("cta.description")}
          </p>

          <a
            href="https://share.google/2h8h4WkbPf3QPLChf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center justify-center gap-3 rounded-sm bistro-gradient px-10 py-4 font-serif text-sm font-medium uppercase tracking-widest text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
          >
            <Phone className="h-4 w-4" />
            {t("cta.cta_phone")}
          </a>

          <div className="mt-10 flex items-center justify-center gap-6">
            <a
              href="https://www.facebook.com/p/Chez-Mounier-100063830836961/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Facebook <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-muted-foreground/30">&middot;</span>
            <a
              href="https://www.instagram.com/chezmounier/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Instagram <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-muted-foreground/30">&middot;</span>
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
    </section>
  );
}
