import { useInView } from "@/hooks/useInView";
import interieur from "@/assets/interieur-boiseries.webp";
import { useTranslation } from "@/i18n/useTranslation";

export default function RueDesMarronniersSection() {
  const { ref, inView } = useInView();
  const { t } = useTranslation();

  return (
    <section className="py-24 md:py-32 bg-warm text-warm-foreground overflow-hidden">
      <div className="mx-auto max-w-6xl px-6" ref={ref}>
        <div className="grid gap-12 md:grid-cols-2 md:gap-20 items-center">
          {/* Image */}
          <div
            className={`relative transition-all duration-1000 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="overflow-hidden rounded-sm">
              <img
                src={interieur}
                alt="Intérieur authentique du bouchon lyonnais Chez Mounier — boiseries, murs rouges et ambiance chaleureuse typique de la Rue des Marronniers"
                className="h-[450px] w-full object-cover"
                loading="lazy"
                width={1038}
                height={1038}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 rounded-sm bg-gold px-5 py-3 shadow-xl">
              <p className="font-serif text-2xl font-bold text-gold-foreground">1723</p>
              <p className="text-[10px] uppercase tracking-widest text-gold-foreground/70">Depuis</p>
            </div>
          </div>

          {/* Text */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              {t("rue.overtitle")}
            </p>
            <h2 className="font-serif text-3xl font-bold text-warm-foreground md:text-4xl text-balance">
              {t("rue.title")}
            </h2>
            <div className="section-divider mt-6" />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-warm-foreground/80">
              <h3 className="font-serif text-lg font-semibold text-warm-foreground">
                {t("rue.h5_history")}
              </h3>
              <p>{t("rue.p1")}</p>
              <p>{t("rue.p2")}</p>
              <p>{t("rue.p3")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
