import { Link } from "@tanstack/react-router";
import { Phone, MapPin, UtensilsCrossed } from "lucide-react";
import { branches, directionsUrl, whatsappUrl } from "@/data/branches";
import { WhatsAppIcon } from "./BrandIcons";

export function FloatingActions() {
  const main = branches[0]!;
  return (
    <>
      <a
        href={whatsappUrl("Hi Sharma's Kulche! I'd like to know more.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-24 right-4 z-40 grid size-14 place-items-center rounded-full bg-veg text-primary-foreground shadow-warm transition-transform hover:scale-110 lg:bottom-6 lg:right-6"
      >
        <WhatsAppIcon className="size-7" />
      </a>
      <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-charcoal-foreground/10 bg-charcoal/95 text-charcoal-foreground backdrop-blur-md lg:hidden">
        <a href={`tel:+${main.phone}`} className="flex flex-col items-center gap-1 py-3 text-xs font-medium"><Phone className="size-5 text-primary" />Call</a>
        <a href={directionsUrl(main)} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 border-x border-charcoal-foreground/10 py-3 text-xs font-medium"><MapPin className="size-5 text-primary" />Directions</a>
        <a href={whatsappUrl("Hi Sharma's Kulche! I'd like to know more.")} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 py-3 text-xs font-medium"><WhatsAppIcon className="size-5 text-primary" />WhatsApp</a>
        <Link to="/menu" className="flex flex-col items-center gap-1 border-l border-charcoal-foreground/10 py-3 text-xs font-medium"><UtensilsCrossed className="size-5 text-primary" />Menu</Link>
      </nav>
    </>
  );
}
