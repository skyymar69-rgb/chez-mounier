import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Flame, Leaf, Fish, UtensilsCrossed, Wine } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

export const Route = createFileRoute("/menu")({
  component: MenuPage,
  head: () => ({
    meta: [
      { title: "La Carte — Cuisine Lyonnaise Faite Maison | Chez Mounier" },
      { name: "description", content: "Carte complète Chez Mounier : entrées (salade lyonnaise, foies de volaille), plats signature (quenelles, tablier de sapeur, gnafron), fromages, desserts maison. Prix, allergènes et vins du Rhône." },
      { property: "og:title", content: "La Carte — Cuisine Lyonnaise Faite Maison | Chez Mounier" },
      { property: "og:description", content: "30+ plats traditionnels faits maison. Quenelles, gnafron, tablier de sapeur et vins du Rhône de petits producteurs." },
      { property: "og:type", content: "restaurant.menu" },
      { property: "og:url", content: "https://chezmounier.fr/menu" },
      { property: "og:image", content: "https://chezmounier.fr/og-image.webp" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://chezmounier.fr/menu" }],
  }),
});

type Filter = "all" | "vegetarien" | "viande" | "poisson" | "boissons" | "formules";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  tags: ("all" | "vegetarien" | "viande" | "poisson" | "boissons")[];
  allergens?: string;
  maison?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface Formula {
  name: string;
  price: string;
  note?: string;
  starters: string[];
  mains: string[];
  mainsNote?: string;
  cheese: string[];
  supplement?: string;
}

const menuData: MenuSection[] = [
  {
    title: "Les entrées",
    items: [
      { name: "Salade lyonnaise", description: "Croûtons, lardons et œuf poché sur un lit de salade", price: "11,00 €", tags: ["viande"], allergens: "Œuf, gluten", maison: true },
      { name: "Salade de chèvre chaud", description: "Fromage de chèvre chaud sur toast avec salade", price: "10,50 €", tags: ["vegetarien"], allergens: "Lait, gluten" },
      { name: "Hareng en salade", description: "Filets de harengs marinés, pommes de terre tièdes et salade", price: "10,50 €", tags: ["poisson"], allergens: "Poisson, moutarde" },
      { name: "Salade aux foies de volaille", description: "Foies de volaille poêlés sur lit de salade", price: "11,00 €", tags: ["viande"], allergens: "Lait" },
      { name: "La poêlée de foies de volaille à partager", description: "Pour 3 personnes — foies de volaille et salade", price: "22,00 €", tags: ["viande"], allergens: "Lait" },
      { name: "Gâteau de foie de volaille, sauce tomate", description: "Pâté de foies de volaille, sauce tomate aux herbes", price: "12,00 €", tags: ["viande"], allergens: "Œuf, lait" },
      { name: "Gnafron à la crème", description: "Gratin de rondelles de saucisson à cuire, crème et gruyère râpé", price: "12,00 €", tags: ["viande"], allergens: "Lait, gluten", maison: true },
      { name: "Gnafron à la crème et son gâteau de foie de volaille", description: "Gratin de saucisson accompagné du pâté de foies maison", price: "12,50 €", tags: ["viande"], allergens: "Œuf, lait, gluten", maison: true },
      { name: "Œufs vigneronne", description: "Œuf poché sur toast et sa fameuse sauce au vin rouge", price: "11,50 €", tags: ["vegetarien"], allergens: "Œuf, sulfites" },
      { name: "Salade des gones", description: "Salade composée avec pied de veau, museau de bœuf, lentilles, cervelas", price: "10,50 €", tags: ["viande"] },
      { name: "Salade verte", description: "Salade verte de saison", price: "7,00 €", tags: ["vegetarien"] },
    ],
  },
  {
    title: "Les spécialités lyonnaises",
    items: [
      { name: "Saucisson chaud, pommes vapeur et salade verte", description: "Saucisson à cuire, pommes de terre vapeur et salade", price: "12,50 €", tags: ["viande"], allergens: "Gluten" },
      { name: "Tête de veau, sauce gribiche", description: "Tête de veau pochée, sauce froide aux câpres, moutarde et cornichons", price: "16,50 €", tags: ["viande"], allergens: "Œuf, moutarde" },
      { name: "Tripes à la tomate", description: "Tripes mijotées en sauce tomate, pommes vapeur", price: "12,00 €", tags: ["viande"], allergens: "Céleri" },
      { name: "Andouillette à la ficelle à la fraise de veau « maison Bobosse » sauce moutarde", description: "Andouillette tirée à la ficelle, sauce moutarde", price: "19,50 €", tags: ["viande"], allergens: "Moutarde", maison: true },
      { name: "Tablier de sapeur, sauce tartare", description: "Gras-double pané et doré, sauce tartare maison", price: "13,00 €", tags: ["viande"], allergens: "Œuf, gluten, moutarde", maison: true },
      { name: "Poêlée de gras double", description: "Tripes émincées poêlées aux oignons et vinaigre", price: "13,00 €", tags: ["viande"] },
      { name: "Poêlée de gras double et tablier de sapeur, sauce tartare", description: "Le duo : gras double poêlé et tablier de sapeur pané", price: "14,50 €", tags: ["viande"], allergens: "Œuf, gluten, moutarde", maison: true },
      { name: "Boudin noir à la crème d'oignons", description: "Boudin noir grillé, crème d'oignons fondante", price: "12,50 €", tags: ["viande"] },
      { name: "½ Rognon de veau flambé au cognac et échalotes", description: "Demi-rognon de veau flambé au cognac, sauce échalotes", price: "19,50 €", tags: ["viande"], allergens: "Lait" },
      { name: "Quenelle de brochet sauce Nantua", description: "Quenelle « soufflé » gratinée, sauce aux écrevisses — en plat unique, temps de préparation 20 min", price: "13,50 €", tags: ["poisson"], allergens: "Crustacés, œuf, gluten, lait", maison: true },
    ],
  },
  {
    title: "Les viandes",
    items: [
      { name: "Onglet de bœuf aux échalotes", description: "Onglet de bœuf grillé (env. 180 g), sauce échalotes", price: "18,50 €", tags: ["viande"], allergens: "Lait" },
      { name: "Pièce du boucher aux échalotes ou sauce St Marcellin", description: "Pièce de bœuf (250 g), sauce échalotes ou sauce au Saint-Marcellin", price: "24,50 €", tags: ["viande"], allergens: "Lait" },
      { name: "Plat du jour", description: "Selon l'inspiration du chef et le marché du jour", price: "12,00 €", tags: ["viande"] },
    ],
  },
  {
    title: "Les poissons et plats végétariens",
    items: [
      { name: "Assiette végétarienne", description: "Assiette composée de légumes de saison", price: "8,50 €", tags: ["vegetarien"] },
      { name: "Filet de lieu à la meunière", description: "Filet de lieu noir cuit au beurre et citron", price: "12,00 €", tags: ["poisson"], allergens: "Poisson, lait" },
    ],
  },
  {
    title: "Les fromages",
    items: [
      { name: "½ Saint-Marcellin de la Mère Richard", description: "Coulant et crémeux, affiné aux Halles de Lyon", price: "7,50 €", tags: ["vegetarien"], allergens: "Lait", maison: true },
      { name: "Fromage de chèvre de Mr Raynaud", description: "Fromage de chèvre fermier", price: "7,00 €", tags: ["vegetarien"], allergens: "Lait" },
      { name: "Cervelle de canut", description: "Fromage blanc, herbes fraîches, échalotes, huile d'olive", price: "7,00 €", tags: ["vegetarien"], allergens: "Lait", maison: true },
      { name: "Fromage blanc faisselle", description: "Faisselle fermière nature", price: "6,00 €", tags: ["vegetarien"], allergens: "Lait" },
    ],
  },
  {
    title: "Les desserts",
    items: [
      { name: "Tarte aux pralines roses", description: "Pralines de Lyon, pâte brisée maison", price: "9,00 €", tags: ["vegetarien"], allergens: "Gluten, œuf, lait, fruits à coque", maison: true },
      { name: "Île flottante", description: "Meringue pochée, crème anglaise vanille, caramel", price: "8,50 €", tags: ["vegetarien"], allergens: "Œuf, lait" },
      { name: "Mousse au chocolat", description: "Chocolat noir, crème fouettée", price: "8,00 €", tags: ["vegetarien"], allergens: "Œuf, lait" },
      { name: "Crème caramel", description: "Crème aux œufs onctueuse, caramel ambré", price: "7,50 €", tags: ["vegetarien"], allergens: "Œuf, lait" },
      { name: "Faisselle au coulis de fruits", description: "Faisselle fermière, coulis frais de saison", price: "7,00 €", tags: ["vegetarien"], allergens: "Lait" },
    ],
  },
  {
    title: "Les eaux minérales",
    items: [
      { name: "Evian — litre", description: "", price: "5,00 €", tags: ["all", "boissons"] },
      { name: "Evian — ½ litre", description: "", price: "3,50 €", tags: ["all", "boissons"] },
      { name: "Badoit — litre", description: "", price: "5,00 €", tags: ["all", "boissons"] },
      { name: "Badoit — ½ litre", description: "", price: "3,50 €", tags: ["all", "boissons"] },
    ],
  },
  {
    title: "Les vins",
    items: [
      { name: "Mâcon blanc « chardonnay » (12,5°)", description: "Verre 4,50 € · ¼ 7,00 € · Pot 12,00 €", price: "4,50 – 12,00 €", tags: ["all", "boissons"], allergens: "Sulfites" },
      { name: "Rosé « Côte de Provence » (12°)", description: "Verre 4,00 € · ¼ 6,00 € · Pot 10,50 €", price: "4,00 – 10,50 €", tags: ["all", "boissons"], allergens: "Sulfites" },
      { name: "Côte du Rhône (13°)", description: "Verre 4,50 € · ¼ 7,00 € · Pot 12,00 €", price: "4,50 – 12,00 €", tags: ["all", "boissons"], allergens: "Sulfites" },
      { name: "Saint Joseph, cave de Saint Désirat", description: "Verre 6,50 € · ¼ 11,50 € · Pot 18,50 €", price: "6,50 – 18,50 €", tags: ["all", "boissons"], allergens: "Sulfites" },
      { name: "Beaujolais village Boulet (12,5°)", description: "Verre 4,00 € · ¼ 6,00 € · Pot 11,00 €", price: "4,00 – 11,00 €", tags: ["all", "boissons"], allergens: "Sulfites" },
      { name: "Moulin à vent Boulet (13°)", description: "Verre 4,50 € · ¼ 7,00 € · Pot 12,00 €", price: "4,50 – 12,00 €", tags: ["all", "boissons"], allergens: "Sulfites" },
      { name: "Juliénas Boulet (13°)", description: "Verre 4,50 € · ¼ 7,00 € · Pot 12,00 €", price: "4,50 – 12,00 €", tags: ["all", "boissons"], allergens: "Sulfites" },
      { name: "Chiroubles Maison Passot (13°)", description: "Verre 4,50 € · ¼ 7,00 € · Pot 12,00 €", price: "4,50 – 12,00 €", tags: ["all", "boissons"], allergens: "Sulfites" },
    ],
  },
];

const formulasData: Formula[] = [
  {
    name: "Menu à 18,50 €",
    price: "18,50 €",
    starters: [
      "Salade des gones (pied de veau, museau de bœuf, lentilles, cervelas)",
      "Salade lyonnaise (croûtons, lardons et œuf poché)",
      "Salade de chèvre chaud",
      "Gâteau de foie de volaille, sauce tomate",
    ],
    mains: [
      "Andouillette sauce moutarde",
      "Filet de lieu noir à la meunière",
      "Boudin noir à la crème d'oignons",
      "Tripes à la tomate",
      "Plat du jour",
    ],
    mainsNote: "Tous nos plats sont accompagnés de légumes et de féculents (pas de frites).",
    cheese: [
      "½ St Marcellin de la Mère Richard",
      "Fromage blanc faisselle",
      "Dessert ou entremet maison",
    ],
  },
  {
    name: "Menu à 25,50 €",
    price: "25,50 €",
    starters: [
      "Hareng en salade",
      "Gnafron à la crème (rondelle de saucisson à cuire gratinées au four avec crème, œuf et gruyère râpé)",
      "Salade aux foies de volaille",
      "Une entrée aux choix dans le menu à 18,00 €",
    ],
    mains: [
      "Andouillette à la ficelle à la fraise de veau de la Maison Bobosse, sauce moutarde (sup. 5,00 €)",
      "Quenelle de brochet sauce Nantua et son riz",
      "Tablier de sapeur sauce tartare (tripes de bœuf panées)",
      "Poêlée de gras double (tripes de bœuf poêlées avec oignons, vin blanc et vinaigre)",
    ],
    mainsNote: "Tous nos plats sont accompagnés de légumes et de féculents. Pas de frites.",
    cheese: [
      "½ St Marcellin de la Mère Richard",
      "Fromage de chèvre de Mr Raynaud",
      "Cervelle de canut ou fromage blanc faisselle",
      "Dessert ou entremet",
    ],
  },
  {
    name: "Menu à 29,50 €",
    price: "29,50 €",
    starters: [
      "Œufs vigneronne",
      "Saucisson chaud, pommes vapeur",
      "Gnafron à la crème et gâteau de foie de volaille",
    ],
    mains: [
      "Tête de veau, sauce gribiche",
      "Onglet de bœuf aux échalotes (sup. 2,00 €)",
      "Tablier de sapeur sauce tartare et poêlée de gras double",
    ],
    mainsNote: "Tous nos plats sont accompagnés de légumes et de féculents. Pas de frites.",
    cheese: [
      "Fromages aux choix",
      "Dessert (ou entremet) maison",
    ],
  },
  {
    name: "Menu des gones — 11,00 € (jusqu'à 10 ans)",
    price: "11,00 €",
    note: "Jusqu'à 10 ans",
    starters: [],
    mains: [
      "Andouillette nature ou à la moutarde",
      "Filet de lieu noir meunière",
      "Saucisson chaud, pommes vapeur",
      "Plat du jour",
    ],
    mainsNote: "Tous nos plats sont accompagnés de légumes et de féculents (pas de frites).",
    cheese: [
      "Fromage ou dessert ou entremet",
    ],
  },
];

function MenuPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const { t } = useTranslation();

  const filters: { key: Filter; label: string; icon: React.ReactNode }[] = [
    { key: "all", label: t("menu_page.filter_all"), icon: null },
    { key: "formules", label: t("menu_page.filter_formulas"), icon: <UtensilsCrossed className="h-3.5 w-3.5" /> },
    { key: "vegetarien", label: t("menu_page.filter_vegetarian"), icon: <Leaf className="h-3.5 w-3.5" /> },
    { key: "viande", label: t("menu_page.filter_meat"), icon: <Flame className="h-3.5 w-3.5" /> },
    { key: "poisson", label: t("menu_page.filter_fish"), icon: <Fish className="h-3.5 w-3.5" /> },
    { key: "boissons", label: t("menu_page.filter_drinks"), icon: <Wine className="h-3.5 w-3.5" /> },
  ];

  const showFormulas = filter === "formules";

  return (
    <Layout>
      <PageHeader
        overtitle={t("menu_page.overtitle")}
        title={t("menu_page.title")}
        description={t("menu_page.description")}
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-4xl px-6">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                  filter === f.key
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {f.icon}
                {f.label}
              </button>
            ))}
          </div>

          {/* Formulas view */}
          {showFormulas && (
            <div className="space-y-12">
              {formulasData.map((formula) => (
                <div key={formula.name} className="rounded-sm border border-border bg-card p-6 md:p-8 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
                    <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                      {formula.name}
                    </h2>
                    <span className="font-serif text-2xl font-bold text-primary whitespace-nowrap">
                      {formula.price}
                    </span>
                  </div>

                  {formula.note && (
                    <p className="mb-4 text-xs font-medium uppercase tracking-wider text-gold">{formula.note}</p>
                  )}

                  {/* Starters */}
                  {formula.starters.length > 0 && (
                    <div className="mb-5">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-gold mb-3">
                        {t("menu_page.section_starters")}
                      </h3>
                      <ul className="space-y-1.5">
                        {formula.starters.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-gold/40">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="h-px bg-border my-5" />

                  {/* Mains */}
                  <div className="mb-5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gold mb-3">
                      {t("menu_page.section_mains")}
                    </h3>
                    <ul className="space-y-1.5">
                      {formula.mains.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-gold/40">
                          {item}
                        </li>
                      ))}
                    </ul>
                    {formula.mainsNote && (
                      <p className="mt-3 text-xs text-muted-foreground/70 italic">{formula.mainsNote}</p>
                    )}
                  </div>

                  <div className="h-px bg-border my-5" />

                  {/* Cheese / Dessert */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gold mb-3">
                      {t("menu_page.section_cheese_dessert")}
                    </h3>
                    <ul className="space-y-1.5">
                      {formula.cheese.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-gold/40">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* A la carte view */}
          {!showFormulas && menuData.map((section) => {
            const filtered = section.items.filter(
              (item) => filter === "all" || item.tags.includes(filter as any) || item.tags.includes("all")
            );
            if (filtered.length === 0) return null;

            return (
              <div key={section.title} className="mb-16 last:mb-0">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-border" />
                  <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                    {section.title}
                  </h2>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="space-y-6">
                  {filtered.map((item) => (
                    <div
                      key={item.name}
                      className="group flex flex-col sm:flex-row sm:items-start justify-between gap-2 rounded-sm p-4 transition-colors hover:bg-cream/60"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-serif text-lg font-semibold text-foreground">
                            {item.name}
                          </h3>
                          {item.maison && (
                            <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold">
                              {t("menu_page.homemade_badge")}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        )}
                        {item.allergens && (
                          <p className="mt-1.5 text-[11px] text-muted-foreground/60">
                            {t("menu_page.allergens_label")} : {item.allergens}
                          </p>
                        )}
                      </div>
                      <p className="font-serif text-lg font-bold text-primary whitespace-nowrap sm:ml-6">
                        {item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Supplement note */}
          {!showFormulas && (
            <div className="mt-4 mb-8 text-center">
              <p className="text-sm text-muted-foreground">
                {t("menu_page.supplement_note")}
              </p>
            </div>
          )}

          {/* Note */}
          <div className="mt-12 rounded-sm border border-border bg-cream/50 p-6 text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("menu_page.note")}
            </p>
            <p className="mt-2 text-xs text-muted-foreground/60">
              {t("menu_page.legal_note")}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
