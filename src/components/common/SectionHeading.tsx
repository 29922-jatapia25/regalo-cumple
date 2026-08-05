interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-10 max-w-2xl sm:mb-14 ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-gold sm:text-xs">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl leading-[1.08] text-cream sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
