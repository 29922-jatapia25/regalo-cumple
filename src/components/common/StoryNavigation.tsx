import { Heart } from "lucide-react";

const links = [
  ["historia", "Historia"],
  ["fotos", "Fotos"],
  ["razones", "Razones"],
  ["carta", "Carta"],
] as const;

export function StoryNavigation() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-background/82 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:h-18 sm:px-6" aria-label="Secciones de nuestra historia">
        <a href="#historia" className="mr-auto flex shrink-0 items-center gap-2 font-display text-lg text-cream outline-none focus-visible:ring-2 focus-visible:ring-gold">
          <span className="grid size-8 place-items-center rounded-full border border-gold/25 text-gold"><Heart size={13} /></span>
          <span className="hidden sm:inline">Nuestra historia</span>
        </a>
        <div className="no-scrollbar flex min-w-0 gap-1 overflow-x-auto">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={`#${href}`}
              className="shrink-0 rounded-full px-3 py-2 text-xs text-muted transition hover:bg-white/7 hover:text-cream focus-visible:outline-2 focus-visible:outline-gold sm:px-4"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
