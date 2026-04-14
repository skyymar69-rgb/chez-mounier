import { useEffect, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { ChevronDown } from "lucide-react";
import facadeHero from "@/assets/facade-chez-mounier.webp";
import { useTranslation } from "@/i18n/useTranslation";

export default function HeroSection() {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);
  const onScroll = useCallback(() => {
    requestAnimationFrame(() => setScrollY(window.scrollY));
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden" aria-label={t("nav.home")}>
      <img
        src={facadeHero}
        alt="Façade du restaurant Chez Mounier de nuit, enseigne bordeaux et dorée, Rue des Marronniers à Lyon 2e"
        className="absolute inset-0 h-[120%] w-full object-cover will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        width={1200}
        height={1200}
        fetchPriority="high"
        decoding="async"
      />

      <div className="hero-overlay absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgb(26_26_26_/_0.4)_100%)]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 flex items-center gap-4 animate-fade-in delay-100">
          <div className="h-px w-12 bg-gold/50" />
          <span className="text-[10px] font-medium uppercase tracking-[0.5em] text-gold/80">
            {t("hero.tagline")}
          </span>
          <div className="h-px w-12 bg-gold/50" />
        </div>

        <p className="mb-4 text-sm font-light uppercase tracking-[0.35em] text-gold animate-fade-up delay-200">
          {t("hero.subtitle")}
        </p>

        <h1 className="font-serif text-5xl font-bold leading-[0.95] text-primary-foreground sm:text-6xl md:text-7xl lg:text-8xl animate-fade-up delay-300">
          <span className="block">Chez Mounier</span>
          <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl font-normal text-primary-foreground/70">
            {t("hero.main_title")}
          </span>
        </h1>

        <div className="shimmer mx-auto mt-8 h-px w-32 animate-fade-up delay-400" />

        <p className="mt-6 max-w-lg text-base font-light leading-relaxed text-primary-foreground/70 animate-fade-up delay-500">
          {t("hero.description")}
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row animate-fade-up delay-600">
          <a
            href="https://share.google/2h8h4WkbPf3QPLChf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-sm bistro-gradient px-8 py-3.5 font-serif text-sm font-medium uppercase tracking-widest text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
          >
            <Phone className="h-4 w-4" />
            {t("hero.cta_reserve")}
          </a>
          <Link
            to="/menu"
            className="inline-flex items-center justify-center rounded-sm border border-primary-foreground/30 bg-transparent px-8 py-3.5 font-serif text-sm font-medium uppercase tracking-widest text-primary-foreground/90 transition-all hover:border-gold hover:text-gold"
          >
            {t("hero.cta_menu")}
          </Link>
        </div>
      </div>

      <a
        href="#notre-histoire"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-foreground/50 transition-colors hover:text-gold"
        aria-label={t("hero.scroll_label")}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">{t("hero.scroll")}</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
