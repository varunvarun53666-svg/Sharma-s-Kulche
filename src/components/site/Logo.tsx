import { Link } from "@tanstack/react-router";

// Swap this component's contents for the real logo image when ready.
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="Sharma's Kulche home">
      <svg viewBox="0 0 64 64" className="size-9 shrink-0" aria-hidden="true">
        <ellipse cx="32" cy="40" rx="26" ry="9" className="fill-charcoal/80" />
        <circle cx="32" cy="32" r="19" className="fill-primary" />
        <circle cx="32" cy="32" r="13" className="fill-accent" />
        <circle cx="27" cy="29" r="2" className="fill-secondary" />
        <circle cx="37" cy="34" r="2" className="fill-secondary" />
      </svg>
      <span className={`font-display text-xl leading-none sm:text-2xl ${light ? "text-charcoal-foreground" : "text-foreground"}`}>
        Sharma's <span className="text-primary">Kulche</span>
      </span>
    </Link>
  );
}
