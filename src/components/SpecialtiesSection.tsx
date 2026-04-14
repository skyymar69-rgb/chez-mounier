import { Link } from "@tanstack/react-router";
import { useInView } from "@/hooks/useInView";
import { useTranslation } from "@/i18n/useTranslation";
import saladeLyonnaiseImg from "@/assets/salade-lyonnaise.webp";
import quenellesImg from "@/assets/quenelles-nantua.webp";
import tartePralinesImg from "@/assets/tarte-pralines.webp";
import tablierSapeurImg from "@/assets/tablier-sapeur.webp";

export default function SpecialtiesSection() {
  const { ref, inView } = useInView();
  const { t } = useTranslation();

  const specialties = [
    {
      name: "Salade Lyonnaise",
      description: t("specialties.salade_desc"),
      image: saladeLyonnaiseImg,
      alt: "Salade lyonnaise servie Chez Mounier avec œuf poché et lardons croustillants",
      tag: t("specialties.tag_starter"),
    },
    {
      name: "Tablier de Sapeur",
      description: t("specialties.tablier_desc"),
      image: tablierSapeurImg,
      alt: "Tablier de sapeur croustillant à la panure dorée, spécialité lyonnaise Chez Mounier",
      tag: t("specialties.tag_specialty"),
    },
    {
      name: "Quenelles de Brochet",
      description: t("specialties.quenelles_desc"),
      image: quenellesImg,
      alt: "Quenelles de brochet sauce Nantua gratinées, accompagnées d'un verre de vin rouge",
      tag: t("specialties.tag_main"),
    },
    {
      name: "Tarte aux Pralines",
      description: t("specialties.tarte_desc"),
      image: tartePralinesImg,
      alt: "Part de tarte aux pralines roses de Lyon, pâte maison Chez Mounier",
      tag: t("specialties.tag_dessert"),
    },
  ];

  return (
    <section id="nos-specialites" className="py-24 md:py-32 bg-cream">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
            {t("specialties.overtitle")}
          </p>
          <h2 className="font-serif text-3xl font-bold text-cream-foreground md:text-4xl lg:text-5xl">
            {t("specialties.title")}
          </h2>
          <div className="section-divider mx-auto mt-6" />
          <div className="mx-auto mt-6 text-muted-foreground leading-relaxed space-y-4 text-left sm:text-center">
            <p>{t("specialties.intro")}</p>
            <h3 className="font-serif text-lg font-semibold text-cream-foreground pt-2">
              {t("specialties.h5_value")}
            </h3>
            <p>{t("specialties.value_text")}</p>
          </div>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" ref={ref}>
          {specialties.map((item, i) => (
            <div
              key={item.name}
              className={`group overflow-hidden rounded-sm bg-card shadow-sm transition-all duration-700 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-transform duration-300 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* 28. Taller image with overlay on hover */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt || item.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  width={800}
                  height={800}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {/* 29. Category tag badge */}
                <span className="absolute top-3 left-3 rounded-sm bg-gold/90 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-gold-foreground">
                  {item.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-3 font-serif text-sm font-medium uppercase tracking-widest text-gold transition-colors hover:text-foreground"
          >
            <span className="h-px w-8 bg-gold/50" />
            {t("specialties.cta_menu")}
            <span className="h-px w-8 bg-gold/50" />
          </Link>
        </div>
      </div>
    </section>
  );
}
