import { useState, useEffect, useRef } from "react";
import { Accessibility, Type, ZoomIn, ZoomOut, Contrast, RotateCcw } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

interface A11ySettings {
  fontSize: number; // 100 = default, 125 = large, 150 = very large
  highContrast: boolean;
  reducedMotion: boolean;
  largeSpacing: boolean;
}

const DEFAULT: A11ySettings = { fontSize: 100, highContrast: false, reducedMotion: false, largeSpacing: false };

export default function AccessibilityToggle() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(DEFAULT);
  const { t } = useTranslation();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("chez-mounier-a11y");
    if (saved) {
      try { setSettings(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${settings.fontSize}%`;
    root.classList.toggle("high-contrast", settings.highContrast);
    root.classList.toggle("reduce-motion", settings.reducedMotion);
    root.classList.toggle("large-spacing", settings.largeSpacing);
    localStorage.setItem("chez-mounier-a11y", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const reset = () => setSettings(DEFAULT);

  const updateFontSize = (delta: number) => {
    setSettings((s) => ({
      ...s,
      fontSize: Math.max(100, Math.min(200, s.fontSize + delta)),
    }));
  };

  return (
    <div className="fixed bottom-20 left-4 z-[55]" ref={panelRef}>
      {/* Panel */}
      {open && (
        <div
          className="mb-3 w-72 rounded-sm bg-card shadow-2xl border border-border p-5 space-y-4"
          role="dialog"
          aria-label="Paramètres d'accessibilité"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-foreground">{t("a11y.title")}</h3>
            <button
              onClick={reset}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              aria-label={t("a11y.reset")}
            >
              <RotateCcw className="h-3 w-3" />
              {t("a11y.reset")}
            </button>
          </div>

          {/* Font size */}
          <div>
            <p className="text-xs font-medium text-foreground mb-2 flex items-center gap-2">
              <Type className="h-3.5 w-3.5 text-gold" />
              {t("a11y.fontsize")} ({settings.fontSize}%)
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateFontSize(-25)}
                disabled={settings.fontSize <= 100}
                className="rounded-sm border border-border p-2 text-foreground hover:bg-accent disabled:opacity-30 transition-colors"
                aria-label="Réduire la taille du texte"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full transition-all"
                  style={{ width: `${((settings.fontSize - 100) / 100) * 100}%` }}
                />
              </div>
              <button
                onClick={() => updateFontSize(25)}
                disabled={settings.fontSize >= 200}
                className="rounded-sm border border-border p-2 text-foreground hover:bg-accent disabled:opacity-30 transition-colors"
                aria-label="Augmenter la taille du texte"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* High contrast */}
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-xs font-medium text-foreground flex items-center gap-2">
              <Contrast className="h-3.5 w-3.5 text-gold" />
              {t("a11y.contrast")}
            </span>
            <input
              type="checkbox"
              checked={settings.highContrast}
              onChange={(e) => setSettings((s) => ({ ...s, highContrast: e.target.checked }))}
              className="h-4 w-4 rounded accent-primary"
              role="switch"
              aria-checked={settings.highContrast}
            />
          </label>

          {/* Reduced motion */}
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-xs font-medium text-foreground flex items-center gap-2">
              <RotateCcw className="h-3.5 w-3.5 text-gold" />
              {t("a11y.motion")}
            </span>
            <input
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={(e) => setSettings((s) => ({ ...s, reducedMotion: e.target.checked }))}
              className="h-4 w-4 rounded accent-primary"
              role="switch"
              aria-checked={settings.reducedMotion}
            />
          </label>

          {/* Large spacing */}
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-xs font-medium text-foreground flex items-center gap-2">
              <Type className="h-3.5 w-3.5 text-gold" />
              {t("a11y.spacing")}
            </span>
            <input
              type="checkbox"
              checked={settings.largeSpacing}
              onChange={(e) => setSettings((s) => ({ ...s, largeSpacing: e.target.checked }))}
              className="h-4 w-4 rounded accent-primary"
              role="switch"
              aria-checked={settings.largeSpacing}
            />
          </label>

          <p className="text-[10px] text-muted-foreground leading-relaxed pt-2 border-t border-border">
            Conforme WCAG 2.2 AA · RGAA · EAA 2025
          </p>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-105"
        aria-label="Ouvrir les paramètres d'accessibilité"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Accessibility className="h-5 w-5" />
      </button>
    </div>
  );
}
