import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/useTranslation";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4">{t("page404.overtitle")}</p>
        <h1 className="font-serif text-7xl font-bold text-foreground">{t("page404.title")}</h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {t("page404.description")}
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-sm bistro-gradient px-6 py-3 text-sm font-medium uppercase tracking-widest text-primary-foreground shadow-lg transition-all hover:shadow-xl"
          >
            {t("page404.cta")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Chez Mounier — Bouchon Lyonnais Traditionnel depuis 1985" },
      { name: "description", content: "Chez Mounier, bouchon lyonnais authentique au 3 Rue des Marronniers, Lyon 2e. Cuisine traditionnelle faite maison depuis 1985." },
      { name: "author", content: "Chez Mounier" },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: "Chez Mounier" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://chezmounier.fr/og-image.webp" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Façade du restaurant Chez Mounier, bouchon lyonnais à Lyon" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://chezmounier.fr/og-image.webp" },
      { name: "theme-color", content: "#C1440E" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preload", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Open+Sans:wght@300;400;500;600;700&display=swap", as: "style" },
      { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Open+Sans:wght@300;400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "alternate", type: "text/plain", href: "https://chezmounier.fr/llms.txt", title: "LLMs.txt" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <LanguageProvider>
      <Outlet />
    </LanguageProvider>
  );
}
