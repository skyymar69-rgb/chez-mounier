import { Star } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useTranslation } from "@/i18n/useTranslation";

/*
  JSON-LD Review schema (to be added to page <head> later):

  {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Chez Mounier",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3 Rue des Marronniers",
      "addressLocality": "Lyon",
      "postalCode": "69002",
      "addressCountry": "FR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.2",
      "reviewCount": "1280",
      "bestRating": "5"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Marie-Claire D." },
        "datePublished": "2025-11-14",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Un vrai bouchon comme il n'en existe presque plus ! Les quenelles de brochet sauce Nantua sont absolument divines, faites maison et servies bien gratinées. L'ambiance familiale avec trois générations aux fourneaux, on sent que c'est du vrai."
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Philippe R." },
        "datePublished": "2025-10-02",
        "reviewRating": { "@type": "Rating", "ratingValue": "4", "bestRating": "5" },
        "reviewBody": "Tablier de sapeur parfaitement pané et croustillant, sauce gribiche impeccable. Les portions sont très généreuses pour le prix. Seul petit bémol : l'attente un samedi soir, mais ça vaut le coup."
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Isabelle M." },
        "datePublished": "2025-09-18",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "La salade lyonnaise est un régal — lardons croustillants, œuf poché coulant, vinaigrette parfaite. On a enchaîné avec la tarte aux pralines roses, un pur bonheur. Rapport qualité-prix imbattable pour Lyon."
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Jean-Marc L." },
        "datePublished": "2025-08-25",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Le dernier vrai bouchon du quartier des Marronniers. Le gnafron est savoureux, tout est fait maison. Mention spéciale pour les beaujolais servis au pot. Ambiance conviviale et chaleureuse, on revient toujours."
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Sophie T." },
        "datePublished": "2025-07-30",
        "reviewRating": { "@type": "Rating", "ratingValue": "4", "bestRating": "5" },
        "reviewBody": "Les œufs vigneronne en entrée étaient délicieux, très bien relevés. Le menu complet entrée-plat-fromage-dessert à moins de 20 € est un rapport qualité-prix exceptionnel. Service rapide et souriant."
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Laurent B." },
        "datePublished": "2025-06-12",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Trois générations de savoir-faire, ça se sent dans chaque plat. Les quenelles sont les meilleures de Lyon, portions généreuses et cuisson parfaite. Ambiance familiale authentique, la nappe à carreaux et le pot lyonnais, on est bien ici."
      }
    ]
  }
*/

interface Review {
  name: string;
  date: string;
  rating: number;
  text: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-gold text-gold"
              : "fill-none text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function GoogleReviews() {
  const { ref, inView } = useInView();
  const { t } = useTranslation();

  const reviews: Review[] = [
    { name: t("reviews.r1_name"), date: t("reviews.r1_date"), rating: 5, text: t("reviews.r1_text") },
    { name: t("reviews.r2_name"), date: t("reviews.r2_date"), rating: 4, text: t("reviews.r2_text") },
    { name: t("reviews.r3_name"), date: t("reviews.r3_date"), rating: 5, text: t("reviews.r3_text") },
    { name: t("reviews.r4_name"), date: t("reviews.r4_date"), rating: 5, text: t("reviews.r4_text") },
    { name: t("reviews.r5_name"), date: t("reviews.r5_date"), rating: 4, text: t("reviews.r5_text") },
    { name: t("reviews.r6_name"), date: t("reviews.r6_date"), rating: 5, text: t("reviews.r6_text") },
  ];

  return (
    <section id="avis-google" className="py-24 md:py-32 bg-cream">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
            {t("reviews.overtitle")}
          </p>
          <h2 className="font-serif text-3xl font-bold text-cream-foreground md:text-4xl lg:text-5xl">
            {t("reviews.title")}
          </h2>
          <div className="section-divider mx-auto mt-6" />

          {/* Rating badge */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-gold/20 bg-card px-6 py-3 shadow-sm">
            <GoogleIcon />
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-cream-foreground">4.2</span>
              <StarRating rating={4} />
            </div>
            <span className="h-4 w-px bg-muted-foreground/20" />
            <span className="text-sm text-muted-foreground">
              {t("reviews.badge_google")}
            </span>
            <span className="h-4 w-px bg-muted-foreground/20" />
            <span className="text-sm font-medium text-gold">
              {t("reviews.badge_reviews")}
            </span>
          </div>
        </div>

        {/* Reviews: horizontal scroll on mobile, 2-col grid on desktop */}
        <div
          ref={ref}
          className="mt-14 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin md:grid md:grid-cols-2 md:overflow-visible md:pb-0 md:snap-none"
        >
          {reviews.map((review, i) => (
            <article
              key={review.name}
              className={`min-w-[320px] shrink-0 snap-start rounded-sm border border-gold/10 hover:border-gold/40 bg-card p-6 shadow-sm transition-all duration-700 hover:shadow-md md:min-w-0 md:shrink ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Header: name + date */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-cream-foreground">
                      {review.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {review.date}
                    </p>
                  </div>
                </div>
                <GoogleIcon />
              </div>

              {/* Stars */}
              <div className="mt-3">
                <StarRating rating={review.rating} />
              </div>

              {/* Review text */}
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {review.text}
              </p>

              {/* Verified badge */}
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-sm bg-cream px-2.5 py-1">
                <svg
                  className="h-3.5 w-3.5 text-[#4285F4]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-1.065-3.288 3 3 0 00-4.602-1.073 3 3 0 00-5.472 0 3 3 0 00-4.602 1.073 3 3 0 00-1.065 3.288 3 3 0 010 5.304 3 3 0 001.065 3.288 3 3 0 004.602 1.073 3 3 0 005.472 0 3 3 0 004.602-1.073 3 3 0 001.065-3.288zm-5.318-1.568a.75.75 0 00-1.17-.936l-2.39 2.988-1.06-1.06a.75.75 0 10-1.06 1.06l1.5 1.5a.75.75 0 001.115-.062l3.065-3.49z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-[11px] font-medium text-muted-foreground">
                  {t("reviews.verified")}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* CTA to Google */}
        <div className="mt-14 text-center">
          <a
            href="https://g.page/r/chezmounier/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-serif text-sm font-medium uppercase tracking-widest text-gold transition-colors hover:text-foreground"
          >
            <span className="h-px w-8 bg-gold/50" />
            {t("reviews.cta")}
            <span className="h-px w-8 bg-gold/50" />
          </a>
        </div>
      </div>
    </section>
  );
}
