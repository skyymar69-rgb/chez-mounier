interface PageHeaderProps {
  overtitle: string;
  title: string;
  description?: string;
}

export default function PageHeader({ overtitle, title, description }: PageHeaderProps) {
  return (
    <section className="bg-warm pt-32 pb-16 md:pt-40 md:pb-20 text-center">
      <div className="mx-auto max-w-3xl px-6">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
          {overtitle}
        </p>
        <h1 className="font-serif text-4xl font-bold text-warm-foreground md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <div className="section-divider mx-auto mt-6" />
        {description && (
          <p className="mx-auto mt-6 max-w-xl text-warm-foreground/70 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
