import { Link } from "@tanstack/react-router";
import { useInView } from "@/hooks/useInView";
import { Phone } from "lucide-react";
import chrystelle from "@/assets/chrystelle-mounier.webp";
import { useTranslation } from "@/i18n/useTranslation";

export default function AboutSection() {
  const { ref, inView } = useInView();
  const { t } = useTranslation();

  return (
    <section id="notre-histoire" className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="mx-auto max-w-6xl px-6" ref={ref}>
        <div className="grid gap-12 md:grid-cols-2 md:gap-20 items-center">
          <div
            className={`transition-all duration-1000 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              {t("about.overtitle")}
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
              {t("about.title")}
            </h2>
            <div className="section-divider mt-6" />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
              <h3 className="font-serif text-lg font-semibold text-foreground">
                {t("about.h5_generations")}
              </h3>
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                {t("about.h5_homemade")}
              </h3>
              <p>{t("about.p3")}</p>
              <p>{t("about.p4")}</p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { value: "1985", label: t("about.stat_foundation") },
                { value: "< 20€", label: t("about.stat_menu") },
                { value: "★ 4.2", label: t("about.stat_tripadvisor") },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/histoire"
                className="inline-flex items-center gap-3 font-serif text-sm font-medium uppercase tracking-widest text-gold transition-colors hover:text-foreground"
              >
                <span className="h-px w-8 bg-gold/50" />
                {t("about.cta_history")}
                <span className="h-px w-8 bg-gold/50" />
              </Link>
              <a
                href="tel:+33478377926"
                className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
              >
                <Phone className="h-3.5 w-3.5" />
                04 78 37 79 26
              </a>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="absolute -inset-3 rounded-sm border border-gold/20" />
            <div className="overflow-hidden rounded-sm">
              <img
                src={chrystelle}
                alt="Chrystelle Mounier accueillant les clients à l'entrée du restaurant Chez Mounier, entourée des guides Petit Futé et Routard recommandant le bouchon depuis 2012"
                className="h-[550px] w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
                width={1200}
                height={1200}
              />
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-sm bistro-gradient px-6 py-4 shadow-xl">
              <p className="font-serif text-3xl font-bold text-primary-foreground">40 ans</p>
              <p className="text-xs uppercase tracking-widest text-primary-foreground/70">de tradition</p>
            </div>
            <div className="absolute -top-3 -right-3 h-16 w-16 border-t-2 border-r-2 border-gold/30 rounded-tr-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}
