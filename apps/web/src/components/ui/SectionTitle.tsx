type SectionTitleProps = {
  title: string;
  subtitle?: string;
  centered?: boolean;
};

export default function SectionTitle({ title, subtitle, centered = false }: SectionTitleProps) {
  const align = centered ? "text-center mx-auto" : "";

  return (
    <header className={align}>
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-2xl text-zinc-600">{subtitle}</p> : null}
    </header>
  );
}
