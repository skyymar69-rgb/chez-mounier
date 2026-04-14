import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";

export const Route = createFileRoute("/mentions-legales")({
  component: MentionsLegalesPage,
  head: () => ({
    meta: [
      { title: "Mentions Légales — Chez Mounier | Restaurant Lyon" },
      { name: "description", content: "Mentions légales du site Chez Mounier. Éditeur, hébergeur, propriété intellectuelle et conditions d'utilisation." },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "https://chezmounier.fr/mentions-legales" }],
  }),
});

function MentionsLegalesPage() {
  return (
    <Layout>
      <PageHeader overtitle="Informations légales" title="Mentions Légales" />

      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-3xl px-6 prose prose-sm text-foreground">

          <h2 className="font-serif text-2xl font-bold text-foreground mt-0">1. Éditeur du site</h2>
          <p>
            Le site <strong>chezmounier.fr</strong> est édité par :
          </p>
          <ul className="list-none pl-0">
            <li><strong>CC MOUNIER</strong> (nom commercial : « Restaurant Chez Mounier »)</li>
            <li>Forme juridique : SAS, société par actions simplifiée</li>
            <li>Capital social : 10 000,00 €</li>
            <li>SIREN : 752 728 519</li>
            <li>SIRET (siège) : 752 728 519 00014</li>
            <li>RCS : 752 728 519 R.C.S. Lyon (immatriculée le 16/07/2012)</li>
            <li>N° TVA intracommunautaire : FR58752728519</li>
            <li>Activité : Restauration traditionnelle (Code NAF : 56.10A)</li>
            <li>Siège social : 3 Rue des Marronniers, 69002 Lyon, France</li>
            <li>Téléphone : <a href="tel:+33478377926" className="text-primary hover:underline">04 78 37 79 26</a></li>
            <li>Dirigeants : MOUNIER PERRET Chrystelle, MOUNIER Christophe</li>
          </ul>
          <p>
            Directrice de la publication : Chrystelle Mounier Perret, en qualité de dirigeante de la SAS CC MOUNIER.
          </p>

          <h2 className="font-serif text-2xl font-bold text-foreground">2. Conception et réalisation</h2>
          <p>
            Le site a été conçu et réalisé par :<br />
            <strong>Agence Web Kayzen</strong><br />
            6 rue Pierre Termier, 69009 Lyon<br />
            SIREN : 999 418 346 000 14 — RCS Lyon : 999 418 346<br />
            APE : 4791B — N° TVA Intra : FR85 999418346<br />
            Téléphone : <a href="tel:+33487776861" className="text-primary hover:underline">04 87 77 68 61</a><br />
            Email : <a href="mailto:contact@kayzen-lyon.fr" className="text-primary hover:underline">contact@kayzen-lyon.fr</a><br />
            Site web : <a href="https://internet.kayzen-lyon.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">internet.kayzen-lyon.fr</a>
          </p>

          <h2 className="font-serif text-2xl font-bold text-foreground">3. Hébergement</h2>
          <p>
            Le site est hébergé par :<br />
            <strong>IONOS SARL</strong><br />
            7 place de la Gare, 57200 Sarreguemines, France<br />
            RCS Sarreguemines — SIRET : 431 303 775 000 16<br />
            Téléphone : 0970 808 911<br />
            Site web : <a href="https://www.ionos.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.ionos.fr</a>
          </p>
          <p>
            IONOS s'engage dans un hébergement <strong>éco-responsable et sans carbone</strong>, alimenté à 100% par des énergies renouvelables.
          </p>

          <h2 className="font-serif text-2xl font-bold text-foreground">4. Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu du site chezmounier.fr (textes, photographies, illustrations, logos, icônes, vidéos, structure générale) est la propriété exclusive de la SAS CC Mounier ou de ses partenaires et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de la SAS CC Mounier.
          </p>

          <h2 className="font-serif text-2xl font-bold text-foreground">5. Données personnelles et RGPD</h2>
          <p>
            La collecte et le traitement des données personnelles effectués via ce site sont conformes au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée.
          </p>
          <p>
            Pour en savoir plus sur la manière dont nous collectons, utilisons et protégeons vos données personnelles, consultez notre{" "}
            <a href="/confidentialite" className="text-primary hover:underline">Politique de Confidentialité</a>.
          </p>
          <p>
            Conformément à la réglementation en vigueur, vous disposez d'un droit d'accès, de rectification, de suppression, de limitation, de portabilité et d'opposition au traitement de vos données personnelles. Pour exercer ces droits, contactez-nous par email à{" "}
            <a href="mailto:contact@chezmounier.fr" className="text-primary hover:underline">contact@chezmounier.fr</a> ou par courrier à l'adresse du restaurant.
          </p>

          <h2 className="font-serif text-2xl font-bold text-foreground">6. Cookies</h2>
          <p>
            Le site utilise des cookies strictement nécessaires à son fonctionnement. Aucun cookie publicitaire ou de traçage n'est déposé sans votre consentement préalable. Pour plus d'informations, consultez notre{" "}
            <a href="/confidentialite" className="text-primary hover:underline">Politique de Confidentialité</a>.
          </p>

          <h2 className="font-serif text-2xl font-bold text-foreground">7. Limitation de responsabilité</h2>
          <p>
            La SAS CC Mounier s'efforce de fournir des informations aussi précises que possible sur le site. Toutefois, elle ne saurait être tenue responsable des omissions, inexactitudes ou carences dans la mise à jour de ces informations.
          </p>
          <p>
            Les informations présentes sur le site (carte, prix, horaires) sont données à titre indicatif et peuvent évoluer sans préavis. Pour des informations à jour, contactez directement le restaurant.
          </p>

          <h2 className="font-serif text-2xl font-bold text-foreground">8. Liens hypertextes</h2>
          <p>
            Le site peut contenir des liens hypertextes vers d'autres sites internet. La SAS CC Mounier ne dispose d'aucun contrôle sur le contenu de ces sites tiers et décline toute responsabilité quant à leur contenu.
          </p>

          <h2 className="font-serif text-2xl font-bold text-foreground">9. Droit applicable</h2>
          <p>
            Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux de Lyon seront seuls compétents.
          </p>

          <p className="text-muted-foreground text-xs mt-12">
            Dernière mise à jour : avril 2026
          </p>
        </div>
      </section>
    </Layout>
  );
}
