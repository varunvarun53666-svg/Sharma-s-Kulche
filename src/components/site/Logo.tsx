import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="Sharma's Kulche home">
      <img src={logo} alt="Sharma's Kulche logo" className="size-10 shrink-0 rounded-full object-contain" />
      <span className={`font-display text-xl leading-none sm:text-2xl ${light ? "text-charcoal-foreground" : "text-foreground"}`}>
        Sharma's <span className="text-primary">Kulche</span>
      </span>
    </Link>
  );
}