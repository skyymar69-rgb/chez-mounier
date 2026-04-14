import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";

export const Route = createFileRoute("/confidentialite")({
  component: ConfidentialitePage,
  head: () => ({
    meta: [
      { title: "Politique de Confidentialité — Chez Mounier" },
      { name: "description", content: "Politique de confidentialité et gestion des données personnelles du site Chez Mounier. RGPD, cookies, droits des utilisateurs." },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "https://chezmounier.fr/confidentialite" }],
  }),
});

function ConfidentialitePage() {
  return (
    <Layout>
      <PageHeader overtitle="Vos données" title="Politique de Confidentialité" />

      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-3xl px-6 prose prose-sm text-foreground">

          <h2 className="font-serif text-2xl font-bold text-foreground mt-0">1. Responsable du traitement</h2>
          <p>
            Le responsable du traitement des données personnelles collectées sur le site chezmounier.fr est :<br />
            <strong>SAS CC Mounier</strong><br />
            3 Rue des Marronniers, 69002 Lyon<br />
            Email : <a href="mailto:contact@chezmounier.fr" className="text-primary hover:underline">contact@chezmounier.fr</a><br />
            Téléphone : 04 78 37 79 26
          </p>

          <h2 className="font-serif text-2xl font-bold text-foreground">2. Données collectées</h2>
          <p>Nous collectons les données personnelles suivantes, uniquement lorsque vous les fournissez volontairement via nos formulaires :</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li><strong>Formulaire de réservation</strong> : nom, prénom, adresse email, numéro de téléphone, date et heure souhaitées, nombre de couverts, message optionnel</li>
            <li><strong>Formulaire de contact</strong> : nom, adresse email, objet et message</li>
          </ul>
          <p>
            Aucune donnée n'est collectée automatiquement à des fins de profilage, de publicité ciblée ou de revente à des tiers.
          </p>

          <h2 className="font-serif text-2xl font-bold text-foreground">3. Finalités du traitement</h2>
          <p>Vos données personnelles sont utilisées exclusivement pour :</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Traiter votre demande de réservation et vous recontacter</li>
            <li>Répondre à vos messages envoyés via le formulaire de contact</li>
            <li>Assurer le bon fonctionnement technique du site</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-foreground">4. Base juridique du traitement</h2>
          <p>
            Le traitement de vos données repose sur <strong>votre consentement</strong> (article 6.1.a du RGPD), recueilli explicitement lors de la soumission de chaque formulaire via une case à cocher obligatoire.
          </p>

          <h2 className="font-serif text-2xl font-bold text-foreground">5. Durée de conservation</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li><strong>Données de réservation</strong> : conservées 12 mois après la date de la réservation</li>
            <li><strong>Données de contact</strong> : conservées 12 mois après le dernier échange</li>
            <li><strong>Cookies de consentement</strong> : 13 mois maximum conformément aux recommandations de la CNIL</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-foreground">6. Destinataires des données</h2>
          <p>
            Vos données personnelles sont destinées uniquement au personnel autorisé de la SAS CC Mounier pour le traitement de votre demande. Elles ne sont en aucun cas cédées, vendues ou louées à des tiers.
          </p>
          <p>
            Les sous-traitants techniques suivants peuvent avoir accès à vos données dans le cadre strict de leurs prestations :
          </p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li><strong>IONOS SARL</strong> (hébergement du site) — 7 place de la Gare, 57200 Sarreguemines</li>
            <li><strong>Agence Web Kayzen</strong> (maintenance technique) — 6 rue Pierre Termier, 69009 Lyon</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-foreground">7. Cookies</h2>
          <h3 className="font-serif text-xl font-semibold text-foreground">7.1 Cookies strictement nécessaires</h3>
          <p>
            Le site utilise des cookies techniques strictement nécessaires à son fonctionnement (préférences de consentement). Ces cookies ne nécessitent pas votre consentement préalable conformément à l'article 82 de la loi Informatique et Libertés.
          </p>
          <h3 className="font-serif text-xl font-semibold text-foreground">7.2 Cookies de mesure d'audience</h3>
          <p>
            Aucun cookie de mesure d'audience (Google Analytics, etc.) n'est utilisé sur ce site. Aucun cookie publicitaire ou de traçage tiers n'est déposé.
          </p>
          <h3 className="font-serif text-xl font-semibold text-foreground">7.3 Gestion de vos préférences</h3>
          <p>
            Vous pouvez à tout moment modifier vos préférences en matière de cookies via le bandeau de consentement accessible en bas de page, ou en supprimant les cookies de votre navigateur.
          </p>

          <h2 className="font-serif text-2xl font-bold text-foreground">8. Vos droits</h2>
          <p>
            Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :
          </p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li><strong>Droit d'accès</strong> : obtenir la confirmation que vos données sont traitées et en obtenir une copie</li>
            <li><strong>Droit de rectification</strong> : corriger vos données inexactes ou incomplètes</li>
            <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
            <li><strong>Droit à la limitation</strong> : limiter le traitement dans certains cas</li>
            <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré et lisible</li>
            <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
            <li><strong>Droit de retirer votre consentement</strong> à tout moment</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous :<br />
            Email : <a href="mailto:contact@chezmounier.fr" className="text-primary hover:underline">contact@chezmounier.fr</a><br />
            Courrier : SAS CC Mounier, 3 Rue des Marronniers, 69002 Lyon
          </p>
          <p>
            Nous nous engageons à répondre à votre demande dans un délai d'un mois. En cas de difficulté, vous pouvez introduire une réclamation auprès de la{" "}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">CNIL</a>{" "}
            (Commission Nationale de l'Informatique et des Libertés).
          </p>

          <h2 className="font-serif text-2xl font-bold text-foreground">9. Sécurité des données</h2>
          <p>
            Nous mettons en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction. Le site utilise le protocole HTTPS (chiffrement SSL/TLS) pour sécuriser les échanges de données.
          </p>

          <h2 className="font-serif text-2xl font-bold text-foreground">10. Transferts de données hors UE</h2>
          <p>
            Vos données personnelles sont hébergées en France (IONOS) et ne font l'objet d'aucun transfert en dehors de l'Union européenne.
          </p>

          <h2 className="font-serif text-2xl font-bold text-foreground">11. Modification de la politique</h2>
          <p>
            La présente politique de confidentialité peut être mise à jour à tout moment. La date de dernière mise à jour est indiquée ci-dessous. Nous vous invitons à la consulter régulièrement.
          </p>

          <p className="text-muted-foreground text-xs mt-12">
            Dernière mise à jour : avril 2026
          </p>
        </div>
      </section>
    </Layout>
  );
}
