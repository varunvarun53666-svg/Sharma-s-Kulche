import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { useCateringModal } from "./CateringModal";

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/locations", label: "Locations" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/story", label: "Our Story" },
  { to: "/franchise", label: "Franchise" },
] as const;

export function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { openCatering } = useCateringModal();
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const dark = solid || open;
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${dark ? "bg-charcoal/95 shadow-soft backdrop-blur-md" : "bg-linear-to-b from-charcoal/70 to-transparent"}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <Logo light />
        <ul className="hidden items-center gap-0 xl:flex">
          {navLinks.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="rounded-full px-3 py-2 text-sm font-medium text-charcoal-foreground/85 transition-colors hover:text-accent"
                activeProps={{ className: "!text-accent" }}
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li><button onClick={openCatering} className="rounded-full px-3 py-2 text-sm font-medium text-charcoal-foreground/85 transition-colors hover:text-accent">Catering &amp; Bulk Orders</button></li>
        </ul>
        <Link to="/locations" className="hidden rounded-full bg-fire px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-warm transition-transform hover:scale-105 xl:inline-flex">
          Find a Branch
        </Link>
        <button className="rounded-full p-2 text-charcoal-foreground xl:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-4 pb-6 xl:hidden">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={() => setOpen(false)} className="block border-b border-charcoal-foreground/10 py-3 font-display text-2xl text-charcoal-foreground" activeProps={{ className: "!text-primary" }} activeOptions={{ exact: true }}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li><button onClick={() => { setOpen(false); openCatering(); }} className="block w-full border-b border-charcoal-foreground/10 py-3 text-left font-display text-2xl text-charcoal-foreground">Catering &amp; Bulk Orders</button></li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
