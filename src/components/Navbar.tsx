import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import quenellesImg from "@/assets/quenelles-nantua.webp";
import tartePralinesImg from "@/assets/tarte-pralines.webp";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "@/i18n/useTranslation";

const navKeys = [
  { key: "nav.menu", to: "/menu" },
  { key: "nav.history", to: "/histoire" },
  { key: "nav.gallery", to: "/galerie" },
  { key: "nav.contact", to: "/contact" },
] as const;

export default function Navbar() {
  const { t } = useTranslation();

  const megaMenuItems = {
    carte: [
      { label: t("nav.mega_starters"), desc: t("nav.mega_starters_desc"), to: "/menu" },
      { label: t("nav.mega_mains"), desc: t("nav.mega_mains_desc"), to: "/menu" },
      { label: t("nav.mega_cheese_desserts"), desc: t("nav.mega_cheese_desserts_desc"), to: "/menu" },
      { label: t("nav.mega_drinks"), desc: t("nav.mega_drinks_desc"), to: "/menu" },
    ],
  };
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    setMegaOpen(false);
    setOpen(false);
  }, [location.pathname]);

  const solid = !isHome || scrolled;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-sm focus:bg-gold focus:px-4 focus:py-2 focus:text-gold-foreground"
      >
        {t("nav.skipToContent")}
      </a>

      <nav
        role="navigation"
        aria-label="Navigation principale"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          solid ? "glass shadow-lg py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex flex-col hover:opacity-90 transition-opacity" aria-label="Chez Mounier — Accueil">
            <span className="font-serif text-xl font-bold text-primary-foreground leading-none">Chez Mounier</span>
            <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-gold/80 leading-tight mt-0.5">{t("nav.tagline")}</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {/* La Carte — with mega dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <Link
                to="/menu"
                aria-current={location.pathname === "/menu" ? "page" : undefined}
                className={`relative inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full ${
                  location.pathname === "/menu" ? "text-gold after:w-full" : "text-primary-foreground/70 hover:text-gold"
                }`}
              >
                {t("nav.menu")}
                <ChevronDown className={`h-3 w-3 transition-transform ${megaOpen ? "rotate-180" : ""}`} />
              </Link>

              {/* Mega dropdown */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-300 ${
                  megaOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-2"
                }`}
              >
                <div className="w-[600px] rounded-sm glass shadow-2xl border border-white/10 p-6">
                  <div className="grid grid-cols-[1fr,180px] gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold mb-3">
                        {t("nav.mega_title")}
                      </p>
                      {megaMenuItems.carte.map((item) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          className="block rounded-sm p-3 transition-colors hover:bg-white/5"
                        >
                          <p className="text-sm font-medium text-primary-foreground">{item.label}</p>
                          <p className="mt-0.5 text-xs text-primary-foreground/50">{item.desc}</p>
                        </Link>
                      ))}
                      <div className="pt-2 border-t border-white/10 mt-2">
                        <p className="px-3 text-[11px] text-gold/80">
                          {t("nav.mega_promo")}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="overflow-hidden rounded-sm">
                        <img
                          src={quenellesImg}
                          alt="Quenelles de brochet sauce Nantua"
                          className="h-24 w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="overflow-hidden rounded-sm">
                        <img
                          src={tartePralinesImg}
                          alt="Tarte aux pralines roses de Lyon"
                          className="h-24 w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <p className="text-[10px] text-center text-primary-foreground/40">
                        {t("nav.mega_caption")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other nav links */}
            {navKeys.slice(1).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                aria-current={location.pathname === link.to ? "page" : undefined}
                className={`relative text-xs font-medium uppercase tracking-[0.2em] transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full ${
                  location.pathname === link.to ? "text-gold after:w-full" : "text-primary-foreground/70 hover:text-gold"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}

            <LanguageSelector />
            <ThemeToggle />
            <a
              href="https://share.google/2h8h4WkbPf3QPLChf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-gold/50 px-4 py-2 text-xs font-medium uppercase tracking-widest text-gold transition-all hover:bg-gold hover:text-gold-foreground"
            >
              <Phone className="h-3 w-3" />
              {t("nav.reserve")}
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="text-primary-foreground md:hidden"
            aria-label={open ? t("nav.close_menu") : t("nav.open_menu")}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`fixed inset-0 top-0 z-40 transition-all duration-500 md:hidden ${
            open ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-warm/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div
            className={`absolute right-0 top-0 h-full w-80 glass p-8 pt-20 overflow-y-auto transition-transform duration-500 ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <Link to="/" onClick={() => setOpen(false)} className="block py-3 text-sm uppercase tracking-widest text-primary-foreground/70 transition-colors hover:text-gold">
              {t("nav.home")}
            </Link>

            {/* La Carte with sub-items on mobile */}
            <div className="py-3 border-b border-white/10">
              <Link to="/menu" onClick={() => setOpen(false)} className={`block text-sm uppercase tracking-widest transition-colors hover:text-gold ${location.pathname === "/menu" ? "text-gold" : "text-primary-foreground/70"}`}>
                {t("nav.menu")}
              </Link>
              <div className="mt-2 ml-4 space-y-1">
                {megaMenuItems.carte.map((item) => (
                  <Link key={item.label} to={item.to} onClick={() => setOpen(false)} className="block py-1.5 text-xs text-primary-foreground/50 hover:text-gold transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {navKeys.slice(1).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`block py-3 text-sm uppercase tracking-widest transition-colors hover:text-gold ${
                  location.pathname === link.to ? "text-gold" : "text-primary-foreground/70"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}

            <div className="mt-6 pt-4 border-t border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <LanguageSelector />
                <ThemeToggle />
              </div>
              <a
                href="https://share.google/2h8h4WkbPf3QPLChf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-sm border border-gold/50 px-6 py-3 text-xs font-medium uppercase tracking-widest text-gold transition-all hover:bg-gold hover:text-gold-foreground"
              >
                <Phone className="h-3 w-3" />
                {t("nav.reserve")}
              </a>
              <p className="mt-4 text-[11px] text-primary-foreground/30 leading-relaxed">
                3 Rue des Marronniers<br />69002 Lyon · Mar–Sam
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
