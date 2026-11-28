import { brand, whatsappUrl } from "@/data/branches";

export function InstagramIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.2" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.45" cy="6.65" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.55 21.5v-8.35h2.8l.42-3.25h-3.22V7.82c0-.94.26-1.58 1.61-1.58h1.72V3.32c-.3-.04-1.32-.13-2.5-.13-2.48 0-4.17 1.51-4.17 4.29v2.42H7.4v3.25h2.81v8.35h3.34Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}

export function GoogleIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.23c0-.68-.06-1.36-.18-2.02H12v3.82h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.9-1.74 2.99-4.31 2.99-7.32Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.98-.9 6.63-2.45l-3.24-2.5c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.06v2.58A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.39 13.88A6.02 6.02 0 0 1 6.07 12c0-.65.11-1.29.31-1.88V7.54H3.06A10 10 0 0 0 2 12c0 1.61.39 3.14 1.06 4.46l3.33-2.58Z" />
      <path fill="#EA4335" d="M12 5.99c1.47 0 2.79.51 3.83 1.5l2.87-2.87A9.63 9.63 0 0 0 12 2a10 10 0 0 0-8.94 5.54l3.32 2.58C7.18 7.75 9.39 5.99 12 5.99Z" />
    </svg>
  );
}

export function SocialLinks({ className = "" }: { className?: string }) {
  const base = "social-link grid size-11 place-items-center rounded-full bg-charcoal-foreground/10 text-charcoal-foreground transition-all duration-300 hover:-translate-y-0.5";
  return (
    <div className={`flex gap-3 ${className}`}>
      <a href={brand.instagram} target="_blank" rel="noopener noreferrer" aria-label="Sharma's Kulche on Instagram" className={`${base} social-instagram`}><InstagramIcon /></a>
      <a href={brand.facebook} target="_blank" rel="noopener noreferrer" aria-label="Sharma's Kulche on Facebook" className={`${base} social-facebook`}><FacebookIcon /></a>
      <a href={whatsappUrl("Hi Sharma's Kulche! I'd like to know more.")} target="_blank" rel="noopener noreferrer" aria-label="Chat with Sharma's Kulche on WhatsApp" className={`${base} social-whatsapp`}><WhatsAppIcon /></a>
    </div>
  );
}
