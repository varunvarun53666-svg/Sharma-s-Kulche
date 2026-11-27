import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { branches, brand } from "@/data/branches";
import { navLinks } from "./Navbar";

export function Footer() {
  return (
    <footer className="bg-charcoal pb-28 pt-16 text-charcoal-foreground lg:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm text-charcoal-foreground/70">Soft, buttery, Delhi-style kulche — made fresh every day across Bengaluru.</p>
          <div className="mt-5 flex gap-3">
            <a href={brand.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full bg-charcoal-foreground/10 p-2.5 transition-colors hover:bg-primary"><Instagram className="size-5" /></a>
            <a href={brand.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-full bg-charcoal-foreground/10 p-2.5 transition-colors hover:bg-primary"><Facebook className="size-5" /></a>
          </div>
        </div>
        <div>
          <h3 className="text-lg text-accent">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((l) => <li key={l.to}><Link to={l.to} className="text-charcoal-foreground/75 hover:text-primary">{l.label}</Link></li>)}
          </ul>
        </div>
        {branches.slice(0, 2).map((b) => (
          <div key={b.slug} className="text-sm">
            <h3 className="text-lg text-accent">{b.name}</h3>
            <p className="mt-4 text-charcoal-foreground/75">{b.address}</p>
            <p className="mt-2 text-charcoal-foreground/75">{b.hoursLabel}</p>
            <a href={`tel:+${b.phone}`} className="mt-2 inline-flex items-center gap-2 text-primary"><Phone className="size-4" />{b.phoneDisplay}</a>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-charcoal-foreground/10 px-4 pt-6 text-center text-xs text-charcoal-foreground/50 sm:px-6">
        © {new Date().getFullYear()} Sharma's Kulche · Kammanahalli · VV Puram · Bharathiya City
      </p>
    </footer>
  );
}
