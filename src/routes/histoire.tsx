import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useInView } from "@/hooks/useInView";
import { useTranslation } from "@/i18n/useTranslation";
import chrystelle from "@/assets/chrystelle-mounier.webp";
import interieur from "@/assets/interieur-boiseries.webp";
import terrasseFacade from "@/assets/terrasse-facade.webp";

export const Route = createFileRoute("/histoire")({
  component: HistoirePage,
  head: () => ({
    meta: [
      { title: "Notre Histoire — 3 Générations de Bouchon | Chez Mounier" },
      { name: "description", content: "L'histoire de Chez Mounier : fondé en 1985 par Marc Mounier, continué par Chrystelle et Manon. 3 générations, une même passion. Inventeurs du Gnafron, producteurs locaux." },
      { property: "og:title", content: "Notre Histoire — 3 Générations de Bouchon Lyonnais" },
      { property: "og:description", content: "De Marc à Manon, trois générations perpétuent la tradition du bouchon lyonnais Rue des Marronniers depuis 1985." },
      { property: "og:url", content: "https://chezmounier.fr/histoire" },
      { property: "og:image", content: "https://chezmounier.fr/og-image.webp" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://chezmounier.fr/histoire" }],
  }),
});

const timeline = [
  {
    year: "1983",
    title: "Les Prémices — Chez les Gones",
    text: "Marc Mounier fait ses armes aux Halles de Lyon–Paul Bocuse avec « Chez les Gones ». C'est là qu'il invente le Gnafron — un saucisson dans un appareil de crème et fromage râpé — recette devenue un classique de la maison.",
  },
  {
    year: "1985",
    title: "Naissance de Chez Mounier",
    text: "Marc ouvre le restaurant au 3 Rue des Marronniers, au cœur de la Presqu'île. La salle principale et celles du fond accueillent les premiers clients. La carte est établie dès le premier jour avec les spécialités qui font encore notre fierté : tout fait maison, de la pâte à tarte aux sauces.",
  },
  {
    year: "1990s",
    title: "L'Accueil de Mme Mounier",
    text: "Mme Mounier mère accueille les clients pendant de nombreuses années, partageant le savoir-faire familial et cet accueil chaleureux que nos mères lyonnaises savaient offrir. Le bar centenaire de l'entrée, les banquettes, les boiseries et le sol en mosaïque donnent au lieu son cachet intemporel.",
  },
  {
    year: "2000s",
    title: "Chrystelle prend le relais",
    text: "Chrystelle Mounier, fille de Marc, reprend les rênes et agrandit le restaurant avec la salle donnant sur la rue, offrant aux passants la vue d'un véritable bistrot d'antan. Véritable figure de bouchon, elle excelle autant à ravir les estomacs qu'à nourrir son auditoire d'anecdotes sur la gastronomie des gones.",
  },
  {
    year: "Auj.",
    title: "Trois Générations à Table",
    text: "Manon, fille de Chrystelle et petite-fille de Marc, complète le tableau familial en assurant le service en salle. Trois générations réunies sous le même toit, perpétuant l'esprit du bouchon authentique : convivialité, générosité et cuisine sincère.",
  },
];

const producteurs = [
  { name: "Viande Charolaise", origin: "Éleveurs du Charolais, Bourgogne", detail: "Race à viande d'exception, élevée en plein air" },
  { name: "Vins des Côtes du Rhône", origin: "Petits domaines viticoles, Vallée du Rhône", detail: "Sélection de cuvées de producteurs indépendants" },
  { name: "Beaujolais", origin: "Vignerons du Beaujolais", detail: "Servi en pot lyonnais, comme le veut la tradition" },
  { name: "Fromages Affinés", origin: "Producteurs du Vercors & Monts du Lyonnais", detail: "Saint-Marcellin coulant, cervelle de canut" },
  { name: "Pralines Roses", origin: "Artisans confiseurs de Lyon", detail: "Pour notre tarte aux pralines maison" },
  { name: "Légumes de Saison", origin: "Maraîchers du marché Saint-Antoine", detail: "Approvisionnement frais, circuits courts" },
];

function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
  const { ref, inView } = useInView();
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className={`relative flex items-start gap-8 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {/* Vertical line connector */}
      <div className="hidden md:flex flex-col items-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-sm font-bold shadow-lg">
          {item.year.slice(0, 4)}
        </div>
        {index < timeline.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
      </div>

      <div className={`flex-1 rounded-sm bg-card p-6 shadow-sm border border-border/50 ${isEven ? "" : ""}`}>
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold md:hidden mb-2">{item.year}</p>
        <h3 className="font-serif text-xl font-bold text-foreground">{item.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
      </div>
    </div>
  );
}

function HistoirePage() {
  const { ref: producteursRef, inView: producteursInView } = useInView();
  const { t } = useTranslation();

  return (
    <Layout>
      <PageHeader
        overtitle={t("history_page.overtitle")}
        title={t("history_page.title")}
        description={t("history_page.description")}
      />

      {/* Introduction with image */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
                {t("history_page.spirit_title")}
              </h2>
              <div className="section-divider mt-6" />
              <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
                <p>
                  Le <strong className="text-foreground">bouchon</strong>, c'est l'âme de la gastronomie lyonnaise.
                  Pas de la cuisine quatre étoiles — du vrai, du goût, du généreux. L'aventure commence dès l'entrée,
                  où l'on longe notre bar centenaire avant de rejoindre sa table. Ici, on est un peu en famille :
                  pas de chichis, plutôt des familiarités avec les clients.
                </p>
                <p>
                  De douces banquettes habillent des murs rehaussés de boiseries. Le tout paré d'un bordeaux
                  chaleureux — des nappes aux tableaux, jusqu'au liseré des assiettes. Le sol en mosaïque
                  confère au lieu un cachet rétro, celui d'un véritable bistrot d'antan. Rue des Marronniers,
                  Chez Mounier est considéré comme l'un des derniers bouchons résistants à ne pas avoir cédé
                  à la tentation touristique.
                </p>
                <p>
                  Tout est fait maison — même la pâte à tarte. Salade lyonnaise, tablier de sapeur, quenelles,
                  gnafron, tête de veau, andouillette ficelle et tarte aux pralines sont nos fiertés. Des menus
                  complets (entrée + plat + fromage + dessert) à moins de 20&nbsp;€. C'est complet tous les soirs :
                  il faut y aller tôt ou bien réserver.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-3 rounded-sm border border-gold/20" />
              <div className="overflow-hidden rounded-sm">
                <img
                  src={chrystelle}
                  alt="Chrystelle Mounier à l'entrée du restaurant, entourée des guides Petit Futé et Routard qui recommandent Chez Mounier depuis 2012"
                  className="h-[450px] w-full object-cover"
                  loading="lazy"
                  width={1200}
                  height={1200}
                />
              </div>
              <div className="absolute -bottom-5 -left-5 rounded-sm bistro-gradient px-6 py-4 shadow-xl">
                <p className="font-serif text-3xl font-bold text-primary-foreground">40 ans</p>
                <p className="text-xs uppercase tracking-widest text-primary-foreground/70">de tradition</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-cream paper-grain">
        <div className="mx-auto max-w-3xl px-6 relative z-10">
          <div className="text-center mb-14">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">{t("history_page.timeline_overtitle")}</p>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">{t("history_page.timeline_title")}</h2>
            <div className="section-divider mx-auto mt-6" />
          </div>

          <div className="space-y-8">
            {timeline.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Producteurs */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">{t("history_page.producers_overtitle")}</p>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">{t("history_page.producers_title")}</h2>
            <div className="section-divider mx-auto mt-6" />
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground leading-relaxed">
              {t("history_page.producers_description")}
            </p>
          </div>

          <div
            ref={producteursRef}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {producteurs.map((p, i) => (
              <div
                key={p.name}
                className={`rounded-sm border border-border bg-card p-6 transition-all duration-700 hover:shadow-md hover:-translate-y-1 ${
                  producteursInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <h3 className="font-serif text-lg font-semibold text-foreground">{p.name}</h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gold">{p.origin}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width image banner */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={interieur}
          alt="Intérieur authentique Chez Mounier — boiseries, murs rouges et ambiance chaleureuse du bouchon lyonnais"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-warm/60 flex items-center justify-center">
          <p className="font-serif text-3xl md:text-4xl font-bold text-warm-foreground text-center px-6">
            « La cuisine, c'est l'amour du terroir dans l'assiette »
          </p>
        </div>
      </section>
    </Layout>
  );
}
