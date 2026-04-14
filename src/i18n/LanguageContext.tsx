import { createContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type Lang = "fr" | "en" | "de" | "es";

export const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: "fr", label: "Français", flag: "\u{1F1EB}\u{1F1F7}" },
  { code: "en", label: "English", flag: "\u{1F1EC}\u{1F1E7}" },
  { code: "de", label: "Deutsch", flag: "\u{1F1E9}\u{1F1EA}" },
  { code: "es", label: "Español", flag: "\u{1F1EA}\u{1F1F8}" },
];

type Translations = Record<string, string>;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  lang: "fr",
  setLang: () => {},
  t: (key) => key,
});

// Eager-load all translations (small files, ~3KB each)
import frTranslations from "./translations/fr.json";
import enTranslations from "./translations/en.json";
import deTranslations from "./translations/de.json";
import esTranslations from "./translations/es.json";

const allTranslations: Record<Lang, Translations> = {
  fr: frTranslations,
  en: enTranslations,
  de: deTranslations,
  es: esTranslations,
};

const STORAGE_KEY = "chez-mounier-lang";

function isValidLang(v: string | null): v is Lang {
  return v === "fr" || v === "en" || v === "de" || v === "es";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isValidLang(saved)) {
      setLangState(saved);
    }
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
    document.documentElement.lang = newLang;
  }, []);

  const t = useCallback(
    (key: string): string => {
      return allTranslations[lang]?.[key] || allTranslations.fr[key] || key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
