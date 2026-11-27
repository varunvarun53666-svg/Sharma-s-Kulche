import { Link } from "@tanstack/react-router";
import { Phone, MapPin, UtensilsCrossed } from "lucide-react";
import { branches, directionsUrl, whatsappUrl } from "@/data/branches";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}
export { WhatsAppIcon };

export function FloatingActions() {
  const main = branches[0]!;
  return (
    <>
      <a
        href={whatsappUrl("Hi Sharma's Kulche! I'd like to place an order / enquire.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-24 right-4 z-40 grid size-14 place-items-center rounded-full bg-veg text-primary-foreground shadow-warm transition-transform hover:scale-110 lg:bottom-6 lg:right-6"
      >
        <WhatsAppIcon className="size-7" />
      </a>
      <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-charcoal-foreground/10 bg-charcoal/95 text-charcoal-foreground backdrop-blur-md lg:hidden">
        <a href={`tel:+${main.phone}`} className="flex flex-col items-center gap-1 py-3 text-xs font-medium"><Phone className="size-5 text-primary" />Call</a>
        <a href={directionsUrl(main)} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 border-x border-charcoal-foreground/10 py-3 text-xs font-medium"><MapPin className="size-5 text-primary" />Directions</a>
        <Link to="/menu" className="flex flex-col items-center gap-1 py-3 text-xs font-medium"><UtensilsCrossed className="size-5 text-primary" />Menu</Link>
      </nav>
    </>
  );
}
