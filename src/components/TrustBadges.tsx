import { useTranslation } from "@/i18n/useTranslation";
import logoBouchonColor from "@/assets/logo-lyonnais-bouchon-color.jpeg";
import logoBouchonsColor from "@/assets/logo-bouchons-lyonnais-color.png";
import logoHallesColor from "@/assets/logo-halles-lyon-color.jpeg";
import logoBlasonColor from "@/assets/logo-blason-lyon-color.jpeg";
import logoGrandLyon from "@/assets/logo-grand-lyon-color.png";
import logoToquesB from "@/assets/logo-toques-blanches.jpg";
import logoFrancsMachons from "@/assets/logo-francs-machons.png";

const logos = [
  { src: logoBouchonColor, alt: "Les Lyonnais Bouchon — Label bouchon lyonnais authentique" },
  { src: logoBouchonsColor, alt: "Les Bouchons Lyonnais — Recommandé par l'Office de Tourisme et la CCI de Lyon" },
  { src: logoHallesColor, alt: "Les Halles de Lyon — Paul Bocuse" },
  { src: logoBlasonColor, alt: "Blason de la Ville de Lyon" },
  { src: logoGrandLyon, alt: "Logo historique du Grand Lyon" },
  { src: logoToquesB, alt: "Les Toques Blanches Lyonnaises" },
  { src: logoFrancsMachons, alt: "Les Francs-Mâchons de Lyon" },
];

const textBadgeKeys = [
  "trust.authentic",
  "trust.homemade",
  "trust.since1985",
  "trust.3generations",
  "trust.petitfute",
  "trust.routard",
  "trust.tripadvisor",
  "trust.fresh",
  "trust.menu20",
  "trust.full_every_night",
];

export default function TrustBadges() {
  const { t } = useTranslation();

  return (
    <section className="bg-warm overflow-hidden" aria-label="Distinctions et engagements">
      {/* Logo carousel */}
      <div className="py-8 relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-warm to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-warm to-transparent z-10" />
        <div className="flex animate-marquee items-center whitespace-nowrap">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="mx-10 flex-shrink-0 opacity-90 hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 rounded-lg p-3">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={80}
                  className="h-16 md:h-20 w-auto drop-shadow-[0_0_8px_rgba(201,168,76,0.3)]"
                  loading="lazy"
                  fetchPriority="low"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Text badges */}
      <div className="py-4 border-t border-warm-foreground/5 relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-warm to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-warm to-transparent z-10" />
        <div className="flex animate-marquee-slow whitespace-nowrap">
          {[...textBadgeKeys, ...textBadgeKeys].map((key, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 mx-6 text-xs font-medium uppercase tracking-[0.2em] text-gold/80"
            >
              <span className="h-1 w-1 rounded-full bg-gold/60" />
              {t(key)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
