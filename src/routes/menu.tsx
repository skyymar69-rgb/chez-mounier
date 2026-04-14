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

function getMenuData(t: (k: string) => string): MenuSection[] {
  return [
    {
      title: t("m.sec_starters"),
      items: [
        { name: t("m.salade_lyonnaise"), description: t("m.salade_lyonnaise_d"), price: "11,00 €", tags: ["viande"], allergens: t("m.alg_egg_gluten"), maison: true },
        { name: t("m.salade_chevre"), description: t("m.salade_chevre_d"), price: "10,50 €", tags: ["vegetarien"], allergens: t("m.alg_milk_gluten") },
        { name: t("m.hareng"), description: t("m.hareng_d"), price: "10,50 €", tags: ["poisson"], allergens: t("m.alg_fish_mustard") },
        { name: t("m.salade_foies"), description: t("m.salade_foies_d"), price: "11,00 €", tags: ["viande"], allergens: t("m.alg_milk") },
        { name: t("m.poelee_foies"), description: t("m.poelee_foies_d"), price: "22,00 €", tags: ["viande"], allergens: t("m.alg_milk") },
        { name: t("m.gateau_foie"), description: t("m.gateau_foie_d"), price: "12,00 €", tags: ["viande"], allergens: t("m.alg_egg_milk") },
        { name: t("m.gnafron"), description: t("m.gnafron_d"), price: "12,00 €", tags: ["viande"], allergens: t("m.alg_milk_gluten"), maison: true },
        { name: t("m.gnafron_gateau"), description: t("m.gnafron_gateau_d"), price: "12,50 €", tags: ["viande"], allergens: t("m.alg_egg_milk_gluten"), maison: true },
        { name: t("m.oeufs_vigneronne"), description: t("m.oeufs_vigneronne_d"), price: "11,50 €", tags: ["vegetarien"], allergens: t("m.alg_egg_sulfites") },
        { name: t("m.salade_gones"), description: t("m.salade_gones_d"), price: "10,50 €", tags: ["viande"] },
        { name: t("m.salade_verte"), description: t("m.salade_verte_d"), price: "7,00 €", tags: ["vegetarien"] },
      ],
    },
    {
      title: t("m.sec_specialties"),
      items: [
        { name: t("m.saucisson_chaud"), description: t("m.saucisson_chaud_d"), price: "12,50 €", tags: ["viande"], allergens: t("m.alg_gluten") },
        { name: t("m.tete_veau"), description: t("m.tete_veau_d"), price: "16,50 €", tags: ["viande"], allergens: t("m.alg_egg_mustard") },
        { name: t("m.tripes"), description: t("m.tripes_d"), price: "12,00 €", tags: ["viande"], allergens: t("m.alg_celery") },
        { name: t("m.andouillette"), description: t("m.andouillette_d"), price: "19,50 €", tags: ["viande"], allergens: t("m.alg_mustard"), maison: true },
        { name: t("m.tablier_sapeur"), description: t("m.tablier_sapeur_d"), price: "13,00 €", tags: ["viande"], allergens: t("m.alg_egg_gluten_mustard"), maison: true },
        { name: t("m.poelee_gras_double"), description: t("m.poelee_gras_double_d"), price: "13,00 €", tags: ["viande"] },
        { name: t("m.duo_gras_tablier"), description: t("m.duo_gras_tablier_d"), price: "14,50 €", tags: ["viande"], allergens: t("m.alg_egg_gluten_mustard"), maison: true },
        { name: t("m.boudin_noir"), description: t("m.boudin_noir_d"), price: "12,50 €", tags: ["viande"] },
        { name: t("m.rognon_veau"), description: t("m.rognon_veau_d"), price: "19,50 €", tags: ["viande"], allergens: t("m.alg_milk") },
        { name: t("m.quenelle"), description: t("m.quenelle_d"), price: "13,50 €", tags: ["poisson"], allergens: t("m.alg_crustacean_egg_gluten_milk"), maison: true },
      ],
    },
    {
      title: t("m.sec_meats"),
      items: [
        { name: t("m.onglet"), description: t("m.onglet_d"), price: "18,50 €", tags: ["viande"], allergens: t("m.alg_milk") },
        { name: t("m.piece_boucher"), description: t("m.piece_boucher_d"), price: "24,50 €", tags: ["viande"], allergens: t("m.alg_milk") },
        { name: t("m.plat_jour"), description: t("m.plat_jour_d"), price: "12,00 €", tags: ["viande"] },
      ],
    },
    {
      title: t("m.sec_fish_veg"),
      items: [
        { name: t("m.assiette_veg"), description: t("m.assiette_veg_d"), price: "8,50 €", tags: ["vegetarien"] },
        { name: t("m.lieu_meuniere"), description: t("m.lieu_meuniere_d"), price: "12,00 €", tags: ["poisson"], allergens: t("m.alg_fish_milk") },
      ],
    },
    {
      title: t("m.sec_cheese"),
      items: [
        { name: t("m.st_marcellin"), description: t("m.st_marcellin_d"), price: "7,50 €", tags: ["vegetarien"], allergens: t("m.alg_milk"), maison: true },
        { name: t("m.chevre_raynaud"), description: t("m.chevre_raynaud_d"), price: "7,00 €", tags: ["vegetarien"], allergens: t("m.alg_milk") },
        { name: t("m.cervelle_canut"), description: t("m.cervelle_canut_d"), price: "7,00 €", tags: ["vegetarien"], allergens: t("m.alg_milk"), maison: true },
        { name: t("m.faisselle"), description: t("m.faisselle_d"), price: "6,00 €", tags: ["vegetarien"], allergens: t("m.alg_milk") },
      ],
    },
    {
      title: t("m.sec_desserts"),
      items: [
        { name: t("m.tarte_pralines"), description: t("m.tarte_pralines_d"), price: "9,00 €", tags: ["vegetarien"], allergens: t("m.alg_gluten_egg_milk_nuts"), maison: true },
        { name: t("m.ile_flottante"), description: t("m.ile_flottante_d"), price: "8,50 €", tags: ["vegetarien"], allergens: t("m.alg_egg_milk") },
        { name: t("m.mousse_chocolat"), description: t("m.mousse_chocolat_d"), price: "8,00 €", tags: ["vegetarien"], allergens: t("m.alg_egg_milk") },
        { name: t("m.creme_caramel"), description: t("m.creme_caramel_d"), price: "7,50 €", tags: ["vegetarien"], allergens: t("m.alg_egg_milk") },
        { name: t("m.faisselle_coulis"), description: t("m.faisselle_coulis_d"), price: "7,00 €", tags: ["vegetarien"], allergens: t("m.alg_milk") },
      ],
    },
    {
      title: t("m.sec_water"),
      items: [
        { name: "Evian — litre", description: "", price: "5,00 €", tags: ["all", "boissons"] },
        { name: "Evian — ½ litre", description: "", price: "3,50 €", tags: ["all", "boissons"] },
        { name: "Badoit — litre", description: "", price: "5,00 €", tags: ["all", "boissons"] },
        { name: "Badoit — ½ litre", description: "", price: "3,50 €", tags: ["all", "boissons"] },
      ],
    },
    {
      title: t("m.sec_wines"),
      items: [
        { name: "Mâcon blanc « chardonnay » (12,5°)", description: t("m.wine_price_format_1"), price: "4,50 – 12,00 €", tags: ["all", "boissons"], allergens: t("m.alg_sulfites") },
        { name: "Rosé « Côte de Provence » (12°)", description: t("m.wine_price_format_2"), price: "4,00 – 10,50 €", tags: ["all", "boissons"], allergens: t("m.alg_sulfites") },
        { name: "Côte du Rhône (13°)", description: t("m.wine_price_format_1"), price: "4,50 – 12,00 €", tags: ["all", "boissons"], allergens: t("m.alg_sulfites") },
        { name: "Saint Joseph, cave de Saint Désirat", description: t("m.wine_price_format_3"), price: "6,50 – 18,50 €", tags: ["all", "boissons"], allergens: t("m.alg_sulfites") },
        { name: "Beaujolais village Boulet (12,5°)", description: t("m.wine_price_format_4"), price: "4,00 – 11,00 €", tags: ["all", "boissons"], allergens: t("m.alg_sulfites") },
        { name: "Moulin à vent Boulet (13°)", description: t("m.wine_price_format_1"), price: "4,50 – 12,00 €", tags: ["all", "boissons"], allergens: t("m.alg_sulfites") },
        { name: "Juliénas Boulet (13°)", description: t("m.wine_price_format_1"), price: "4,50 – 12,00 €", tags: ["all", "boissons"], allergens: t("m.alg_sulfites") },
        { name: "Chiroubles Maison Passot (13°)", description: t("m.wine_price_format_1"), price: "4,50 – 12,00 €", tags: ["all", "boissons"], allergens: t("m.alg_sulfites") },
      ],
    },
  ];
}

function getFormulasData(t: (k: string) => string): Formula[] {
  return [
    {
      name: t("m.f1_name"),
      price: "18,50 €",
      starters: [t("m.f1_s1"), t("m.f1_s2"), t("m.f1_s3"), t("m.f1_s4")],
      mains: [t("m.f1_m1"), t("m.f1_m2"), t("m.f1_m3"), t("m.f1_m4"), t("m.f1_m5")],
      mainsNote: t("m.formulas_sides_note"),
      cheese: [t("m.f1_c1"), t("m.f1_c2"), t("m.f1_c3")],
    },
    {
      name: t("m.f2_name"),
      price: "25,50 €",
      starters: [t("m.f2_s1"), t("m.f2_s2"), t("m.f2_s3"), t("m.f2_s4")],
      mains: [t("m.f2_m1"), t("m.f2_m2"), t("m.f2_m3"), t("m.f2_m4")],
      mainsNote: t("m.formulas_sides_note"),
      cheese: [t("m.f2_c1"), t("m.f2_c2"), t("m.f2_c3"), t("m.f2_c4")],
    },
    {
      name: t("m.f3_name"),
      price: "29,50 €",
      starters: [t("m.f3_s1"), t("m.f3_s2"), t("m.f3_s3")],
      mains: [t("m.f3_m1"), t("m.f3_m2"), t("m.f3_m3")],
      mainsNote: t("m.formulas_sides_note"),
      cheese: [t("m.f3_c1"), t("m.f3_c2")],
    },
    {
      name: t("m.f4_name"),
      price: "11,00 €",
      note: t("m.f4_note"),
      starters: [],
      mains: [t("m.f4_m1"), t("m.f4_m2"), t("m.f4_m3"), t("m.f4_m4")],
      mainsNote: t("m.formulas_sides_note"),
      cheese: [t("m.f4_c1")],
    },
  ];
}

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

  const menuData = getMenuData(t);
  const formulasData = getFormulasData(t);
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
