import { useState, useEffect } from "react";
import { useInView } from "@/hooks/useInView";
import { Clock, MapPin, Phone, Accessibility, Wifi, Dog, Wind, TreePine, CreditCard } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

function useIsOpen() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const check = () => {
      const now = new Date();
      const day = now.getDay();
      const time = now.getHours() * 60 + now.getMinutes();
      if (day === 0 || day === 1) { setIsOpen(false); return; }
      const lunchEnd = day === 6 ? 14 * 60 + 30 : 14 * 60 + 15;
      setIsOpen((time >= 12 * 60 && time <= lunchEnd) || (time >= 19 * 60 && time <= 22 * 60 + 15));
    };
    check();
    const interval = setInterval(check, 60_000);
    return () => clearInterval(interval);
  }, []);
  return isOpen;
}

export default function InfoSection() {
  const { ref, inView } = useInView();
  const isOpen = useIsOpen();
  const { t } = useTranslation();

  const hours = [
    { day: t("days.monday"), time: t("info.closed"), closed: true },
    { day: t("days.tuesday"), time: "12h00 – 14h15 / 19h00 – 22h15", closed: false },
    { day: t("days.wednesday"), time: "12h00 – 14h15 / 19h00 – 22h15", closed: false },
    { day: t("days.thursday"), time: "12h00 – 14h15 / 19h00 – 22h15", closed: false },
    { day: t("days.friday"), time: "12h00 – 14h15 / 19h00 – 22h15", closed: false },
    { day: t("days.saturday"), time: "12h00 – 14h30 / 19h00 – 22h15", closed: false },
    { day: t("days.sunday"), time: t("info.closed"), closed: true },
  ];

  const services = [
    { icon: Accessibility, label: t("info.pmr") },
    { icon: Wind, label: t("info.ac") },
    { icon: TreePine, label: t("info.terrace") },
    { icon: Wifi, label: t("info.wifi") },
    { icon: Dog, label: t("info.pets") },
  ];

  return (
    <section className="py-24 md:py-32 bg-warm text-warm-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
            {t("info.overtitle")}
          </p>
          <h2 className="font-serif text-3xl font-bold md:text-4xl lg:text-5xl">
            {t("info.title")}
          </h2>
          <div className="section-divider mx-auto mt-6" />
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3" ref={ref}>
          {/* Hours */}
          <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gold" />
                <h3 className="font-serif text-xl font-semibold">{t("info.hours_title")}</h3>
              </div>
              <span className={`rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider ${
                isOpen ? "bg-green-900/30 text-green-400" : "bg-warm-foreground/10 text-warm-foreground/50"
              }`}>
                {isOpen ? t("info.open") : t("info.closed")}
              </span>
            </div>
            <div className="space-y-3">
              {hours.map((h) => (
                <div key={h.day} className="flex justify-between border-b border-warm-foreground/10 pb-2 text-sm">
                  <span className="font-medium">{h.day}</span>
                  <span className={h.closed ? "text-warm-foreground/40 italic" : "text-warm-foreground/70"}>
                    {h.closed ? t("info.closed") : h.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="mb-6 flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gold" />
              <h3 className="font-serif text-xl font-semibold">{t("info.location_title")}</h3>
            </div>
            <address className="not-italic text-warm-foreground/80 leading-relaxed">
              3 Rue des Marronniers<br />
              69002 Lyon, France
            </address>
            <p className="mt-3 text-xs text-warm-foreground/50">
              {t("info.metro")}
            </p>
            <div className="mt-6">
              <iframe
                title="Localisation Chez Mounier — 3 Rue des Marronniers, Lyon"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.3!2d4.8320!3d45.7575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ea516f6a6f29%3A0x4e95b8c9c5b3e4a!2sChez%20Mounier!5e0!3m2!1sfr!2sfr"
                className="h-48 w-full rounded-sm border-0 opacity-80 transition-opacity hover:opacity-100"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold" />
                <a href="tel:+33478377926" className="text-gold transition-colors hover:text-gold/80 font-medium">
                  04 78 37 79 26
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className={`transition-all duration-700 delay-[400ms] ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="mb-6">
              <h3 className="font-serif text-xl font-semibold">{t("info.services_title")}</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {services.map((s) => (
                <div key={s.label} className="flex items-center gap-3 rounded-sm bg-warm-foreground/5 p-3 transition-colors hover:bg-warm-foreground/10">
                  <s.icon className="h-4 w-4 text-gold flex-shrink-0" />
                  <span className="text-xs text-warm-foreground/80">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="h-4 w-4 text-gold" />
                <h4 className="text-sm font-medium uppercase tracking-wider text-warm-foreground/60">{t("info.payment_title")}</h4>
              </div>
              <p className="text-sm text-warm-foreground/70 leading-relaxed">
                {t("info.payment_methods")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
