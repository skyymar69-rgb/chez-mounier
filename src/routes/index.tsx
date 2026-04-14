import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SpecialtiesSection from "@/components/SpecialtiesSection";
import InfoSection from "@/components/InfoSection";
import TrustBadges from "@/components/TrustBadges";
import RueDesMarronniersSection from "@/components/RueDesMarronniersSection";
import ReservationCTA from "@/components/ReservationCTA";
import GoogleReviews from "@/components/GoogleReviews";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Chez Mounier — Bouchon Lyonnais Authentique à Lyon depuis 1985" },
      {
        name: "description",
        content:
          "Chez Mounier : bouchon lyonnais familial depuis 1985, 3 générations. Cuisine 100% faite maison — quenelles, tablier de sapeur, gnafron. 3 Rue des Marronniers, Lyon 2e. Réservez au 04 78 37 79 26.",
      },
      { property: "og:title", content: "Chez Mounier — Bouchon Lyonnais Authentique à Lyon depuis 1985" },
      { property: "og:description", content: "3 générations de cuisine lyonnaise faite maison. Quenelles, tablier de sapeur, gnafron et tarte aux pralines au cœur de la Presqu'île." },
      { property: "og:type", content: "restaurant" },
      { property: "og:url", content: "https://chezmounier.fr/" },
      { property: "og:image", content: "https://chezmounier.fr/og-image.webp" },
      { property: "og:image:alt", content: "Façade du restaurant Chez Mounier, bouchon lyonnais à Lyon" },
      { name: "robots", content: "index, follow" },
      { name: "geo.region", content: "FR-69" },
      { name: "geo.placename", content: "Lyon" },
    ],
    links: [
      { rel: "canonical", href: "https://chezmounier.fr/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          "@id": "https://chezmounier.fr/#restaurant",
          name: "Chez Mounier",
          alternateName: "Restaurant Chez Mounier Lyon",
          description: "Chez Mounier est un bouchon lyonnais familial fondé en 1985 par Marc Mounier, aujourd'hui tenu par trois générations. Cuisine traditionnelle 100% faite maison — quenelles de brochet, tablier de sapeur, gnafron (recette originale de Marc Mounier), tarte aux pralines roses — accompagnée des vins du Rhône de petits producteurs.",
          image: [
            "https://chezmounier.fr/og-image.webp",
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: "3 Rue des Marronniers",
            addressLocality: "Lyon",
            postalCode: "69002",
            addressRegion: "Auvergne-Rhône-Alpes",
            addressCountry: "FR",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 45.7578,
            longitude: 4.8335,
          },
          telephone: "+33478377926",
          url: "https://chezmounier.fr/",
          servesCuisine: ["Cuisine lyonnaise", "Cuisine traditionnelle française", "Bouchon lyonnais"],
          priceRange: "€€",
          currenciesAccepted: "EUR",
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "12:00", closes: "14:15" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "19:00", closes: "22:15" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "12:00", closes: "14:30" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "19:00", closes: "22:15" },
          ],
          acceptsReservations: "True",
          paymentAccepted: "Cash, Credit Card, Visa, Mastercard, Maestro, Ticket Restaurant",
          founder: {
            "@type": "Person",
            name: "Marc Mounier",
          },
          foundingDate: "1985",
          numberOfEmployees: { "@type": "QuantitativeValue", minValue: 6, maxValue: 9 },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.2",
            bestRating: "5",
            worstRating: "1",
            ratingCount: "1280",
            reviewCount: "850",
          },
          review: [
            {
              "@type": "Review",
              reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
              author: { "@type": "Person", name: "La Compagnie du Rognon" },
              reviewBody: "Un véritable et délicieux morceau d'histoire. Chez Mounier, le bon goût de la cuisine de maman n'a d'égal que les quantités servies par mamie.",
            },
          ],
          sameAs: [
            "https://www.facebook.com/p/Chez-Mounier-100063830836961/",
            "https://www.instagram.com/chezmounier/",
            "https://www.tripadvisor.fr/Restaurant_Review-g187265-d782164-Reviews-Chez_Mounier-Lyon_Rhone_Auvergne_Rhone_Alpes.html",
            "https://chez-mounier-restaurant-lyon.eatbu.com/",
          ],
          hasMenu: {
            "@type": "Menu",
            name: "Carte Chez Mounier",
            description: "Cuisine lyonnaise traditionnelle faite maison : entrées, plats, fromages, desserts et vins de la région",
            url: "https://chezmounier.fr/menu",
            hasMenuSection: [
              { "@type": "MenuSection", name: "Entrées", description: "Salade lyonnaise, foies de volaille, saucisson chaud, œufs en meurette" },
              { "@type": "MenuSection", name: "Plats", description: "Quenelles de brochet, tablier de sapeur, gnafron, andouillette, rognons de veau" },
              { "@type": "MenuSection", name: "Fromages", description: "Saint-Marcellin, cervelle de canut maison" },
              { "@type": "MenuSection", name: "Desserts", description: "Tarte aux pralines roses, crumble aux pommes, crème caramel" },
            ],
          },
          amenityFeature: [
            { "@type": "LocationFeatureSpecification", name: "Accès PMR", value: true },
            { "@type": "LocationFeatureSpecification", name: "Terrasse", value: true },
            { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
            { "@type": "LocationFeatureSpecification", name: "Climatisation", value: true },
          ],
          publicAccess: true,
          isAccessibleForFree: false,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Où se trouve le restaurant Chez Mounier à Lyon ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Chez Mounier se situe au 3 Rue des Marronniers, 69002 Lyon, au cœur de la Presqu'île. Le restaurant est accessible en 3 minutes à pied depuis la station de métro Bellecour (ligne A).",
              },
            },
            {
              "@type": "Question",
              name: "Quels sont les horaires d'ouverture de Chez Mounier ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Le restaurant est ouvert du mardi au vendredi de 12h à 14h15 et de 19h à 22h15, le samedi de 12h à 14h30 et de 19h à 22h15. Fermé le dimanche et le lundi.",
              },
            },
            {
              "@type": "Question",
              name: "Comment réserver une table Chez Mounier ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Vous pouvez réserver par téléphone au 04 78 37 79 26 ou via le formulaire en ligne sur notre site. Pour les groupes de plus de 10 personnes, nous vous recommandons de nous appeler directement.",
              },
            },
            {
              "@type": "Question",
              name: "Quelles sont les spécialités de Chez Mounier ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Nos spécialités lyonnaises faites maison incluent la salade lyonnaise, le tablier de sapeur, les quenelles de brochet sauce Nantua, le Gnafron (recette originale de Marc Mounier), la cervelle de canut et la tarte aux pralines roses.",
              },
            },
            {
              "@type": "Question",
              name: "Quels sont les prix Chez Mounier ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Les entrées sont proposées entre 9,50 € et 13 €, les plats entre 14,50 € et 19,50 €, et les desserts entre 7 € et 9 €. Le restaurant offre un excellent rapport qualité-prix pour une cuisine lyonnaise faite maison.",
              },
            },
            {
              "@type": "Question",
              name: "Qu'est-ce qu'un bouchon lyonnais ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Un bouchon lyonnais est un restaurant traditionnel typique de Lyon, caractérisé par une cuisine familiale généreuse, des recettes transmises de génération en génération, une ambiance conviviale avec nappes à carreaux ou bordeaux, et des vins locaux servis en pot lyonnais (46 cl). Chez Mounier est un bouchon authentique en activité depuis 1985.",
              },
            },
            {
              "@type": "Question",
              name: "Qu'est-ce que le Gnafron Chez Mounier ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Le Gnafron est une spécialité exclusive de Chez Mounier, inventée par Marc Mounier lorsqu'il travaillait aux Halles de Lyon–Paul Bocuse. C'est un saucisson préparé dans un appareil de crème et fromage râpé, gratiné au four. Un classique rare de la cuisine lyonnaise.",
              },
            },
            {
              "@type": "Question",
              name: "Chez Mounier est-il adapté aux familles et aux groupes ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui, Chez Mounier est un restaurant familial par essence — tenu par trois générations de la famille Mounier. Il accueille les familles, les groupes jusqu'à 10 personnes (au-delà, contacter par téléphone), et dispose d'un accès PMR, d'une terrasse, de la climatisation et du WiFi.",
              },
            },
          ],
        }),
      },
    ],
  }),
});

function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <SpecialtiesSection />
      <TrustBadges />
      <RueDesMarronniersSection />
      <GoogleReviews />
      <InfoSection />
      <ReservationCTA />
    </Layout>
  );
}
