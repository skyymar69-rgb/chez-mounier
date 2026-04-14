import { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/i18n/useTranslation";
import { LANGUAGES, type Lang } from "@/i18n/LanguageContext";
import FlagIcon from "./FlagIcon";

export default function LanguageSelector() {
  const { lang, setLang } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === lang)!;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-xs font-medium text-primary-foreground/70 transition-colors hover:text-gold hover:bg-white/10"
        aria-label={`Langue : ${current.label}`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <FlagIcon code={current.code} />
        <span className="hidden sm:inline uppercase tracking-wider">{current.code}</span>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-40 rounded-sm glass shadow-xl border border-white/10 py-1 z-50"
          role="listbox"
          aria-label="Choisir la langue"
        >
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code as Lang);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                lang === l.code
                  ? "text-gold bg-white/10"
                  : "text-primary-foreground/70 hover:text-gold hover:bg-white/5"
              }`}
              role="option"
              aria-selected={lang === l.code}
            >
              <FlagIcon code={l.code} />
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
