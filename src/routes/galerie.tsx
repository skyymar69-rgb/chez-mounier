import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useTranslation } from "@/i18n/useTranslation";

import terrasseFacade from "@/assets/terrasse-facade.webp";
import chrystelle from "@/assets/chrystelle-mounier.webp";
import interieur from "@/assets/interieur-boiseries.webp";
import saladeLyonnaise from "@/assets/salade-lyonnaise.webp";
import quenellesNantua from "@/assets/quenelles-nantua.webp";
import tablierSapeur from "@/assets/tablier-sapeur.webp";
import oeufVigneronne from "@/assets/oeufs-vigneronne.webp";
import tartePralines from "@/assets/tarte-pralines.webp";
import tetDeVeau from "@/assets/tete-de-veau.webp";
import quenellesGratinees from "@/assets/quenelles-gratinees.webp";
import saucissonChaud from "@/assets/saucisson-chaud.webp";
import tripesTomate from "@/assets/tripes-tomate.webp";
import tablierTeteDuo from "@/assets/tablier-tete-duo.webp";
import mousseChocolat from "@/assets/mousse-chocolat.webp";

export const Route = createFileRoute("/galerie")({
  component: GaleriePage,
  head: () => ({
    meta: [
      { title: "Galerie Photos — Chez Mounier | Bouchon Lyonnais Lyon" },
      { name: "description", content: "Découvrez en images l'ambiance et les plats de Chez Mounier : terrasse Rue des Marronniers, intérieur authentique, quenelles, tablier de sapeur, tarte aux pralines." },
      { property: "og:title", content: "Galerie Photos — Chez Mounier" },
      { property: "og:description", content: "Découvrez en images l'ambiance et les plats de Chez Mounier, bouchon lyonnais authentique." },
      { property: "og:url", content: "https://chezmounier.fr/galerie" },
      { property: "og:image", content: "https://chezmounier.fr/og-image.webp" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://chezmounier.fr/galerie" }],
  }),
});

const photos = [
  { src: terrasseFacade, alt: "Terrasse du restaurant Chez Mounier avec l'enseigne bordeaux et les clients attablés, Rue des Marronniers à Lyon", caption: "La terrasse, Rue des Marronniers" },
  { src: chrystelle, alt: "Chrystelle Mounier accueillant les clients à l'entrée du restaurant, entourée des guides Petit Futé et Routard", caption: "Chrystelle Mounier, 2e génération" },
  { src: interieur, alt: "Intérieur chaleureux du bouchon Chez Mounier avec boiseries, murs rouges et ambiance authentique", caption: "L'intérieur et ses boiseries" },
  { src: saladeLyonnaise, alt: "Salade lyonnaise avec œuf poché, lardons croustillants et croûtons dorés servie Chez Mounier", caption: "Salade lyonnaise, œuf poché" },
  { src: quenellesNantua, alt: "Quenelles de brochet sauce Nantua gratinées servies en terrasse avec un verre de vin rouge", caption: "Quenelles sauce Nantua" },
  { src: tablierSapeur, alt: "Tablier de sapeur croustillant à la panure dorée, spécialité lyonnaise Chez Mounier", caption: "Tablier de sapeur croustillant" },
  { src: oeufVigneronne, alt: "Œufs vigneronne en sauce au vin rouge, version végétarienne des œufs en meurette", caption: "Œufs vigneronne" },
  { src: tetDeVeau, alt: "Tête de veau sauce ravigote accompagnée de légumes et pommes de terre", caption: "Tête de veau ravigote" },
  { src: saucissonChaud, alt: "Saucisson chaud pistaché avec pommes vapeur et salade", caption: "Saucisson chaud pistaché" },
  { src: tripesTomate, alt: "Tripes à la tomate mijotées longuement avec pommes de terre, spécialité bouchon lyonnais", caption: "Tripes à la tomate" },
  { src: quenellesGratinees, alt: "Quenelles de brochet gratinées au four dans leur plat en fonte", caption: "Quenelles gratinées au four" },
  { src: tablierTeteDuo, alt: "Duo de tablier de sapeur et tête de veau servis côte à côte, deux classiques du bouchon lyonnais", caption: "Le duo : tablier & tête de veau" },
  { src: tartePralines, alt: "Part de tarte aux pralines roses de Lyon, pâte brisée maison Chez Mounier", caption: "Tarte aux pralines roses" },
  { src: mousseChocolat, alt: "Mousse au chocolat fondante avec crème anglaise maison", caption: "Mousse au chocolat" },
];

function GaleriePage() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { t } = useTranslation();

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)), []);
  const next = useCallback(() => setLightbox((i) => (i !== null ? (i + 1) % photos.length : null)), []);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handler);
    };
  }, [lightbox, close, prev, next]);

  return (
    <Layout>
      <PageHeader
        overtitle={t("gallery_page.overtitle")}
        title={t("gallery_page.title")}
        description={t("gallery_page.description")}
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className="group relative overflow-hidden rounded-sm aspect-square cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                aria-label={`${t("gallery_page.view_large")} : ${photo.caption}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warm/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="absolute bottom-0 left-0 right-0 px-3 py-2 text-xs text-warm-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {photo.caption}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-warm/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={photos[lightbox].caption}
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 rounded-full bg-warm-foreground/10 p-3 text-warm-foreground transition-colors hover:bg-warm-foreground/20"
            aria-label={t("gallery_page.close")}
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 z-10 rounded-full bg-warm-foreground/10 p-3 text-warm-foreground transition-colors hover:bg-warm-foreground/20"
            aria-label={t("gallery_page.prev")}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 z-10 rounded-full bg-warm-foreground/10 p-3 text-warm-foreground transition-colors hover:bg-warm-foreground/20"
            aria-label={t("gallery_page.next")}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] px-16" onClick={(e) => e.stopPropagation()}>
            <img
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              className="max-h-[75vh] w-auto mx-auto rounded-sm shadow-2xl"
            />
            <p className="mt-4 text-center text-sm text-warm-foreground/70">
              {photos[lightbox].caption}
              <span className="ml-3 text-warm-foreground/40">
                {lightbox + 1} / {photos.length}
              </span>
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
}
