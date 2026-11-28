import { createContext, useCallback, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, X } from "lucide-react";
import cateringImage from "@/assets/chole-kulche.jpg";
import { BRANCH_OPTIONS, EVENT_TYPES, cateringLeadSchema, validationMessages } from "@/lib/leads";
import { submitLead } from "@/lib/leads.functions";
import { whatsappUrl } from "@/data/branches";
import { WhatsAppIcon } from "./BrandIcons";

const DISMISS_KEY = "sharmas-catering-dismissed-until";
const SESSION_KEY = "sharmas-catering-shown";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

type CateringContextValue = { openCatering: () => void };
const CateringContext = createContext<CateringContextValue | null>(null);

export function useCateringModal() {
  const context = useContext(CateringContext);
  if (!context) throw new Error("useCateringModal must be used inside CateringModalProvider");
  return context;
}

function storageGet(storage: Storage, key: string) {
  try { return storage.getItem(key); } catch { return null; }
}
function storageSet(storage: Storage, key: string, value: string) {
  try { storage.setItem(key, value); } catch { /* Storage may be disabled; the dialog still works. */ }
}

export function CateringModalProvider({ children }: { children: ReactNode }) {
  const pathname = useLocation({ select: (location) => location.pathname });
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;
  const openedAtRef = useRef(0);
  const retryRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const openCatering = useCallback(() => {
    storageSet(window.sessionStorage, SESSION_KEY, "1");
    setSubmitted(false);
    setOpen(true);
  }, []);

  const openAutomatically = useCallback(() => {
    const path = pathnameRef.current;
    if (path === "/story" || path === "/auth" || path.startsWith("/admin")) return;
    if (storageGet(window.sessionStorage, SESSION_KEY)) return;
    const dismissedUntil = Number(storageGet(window.localStorage, DISMISS_KEY) ?? 0);
    if (dismissedUntil > Date.now()) return;
    if (document.querySelector('[aria-modal="true"]')) {
      if (retryRef.current) clearTimeout(retryRef.current);
      retryRef.current = setTimeout(openAutomatically, 2000);
      return;
    }
    openCatering();
  }, [openCatering]);

  useEffect(() => {
    if (!openedAtRef.current) openedAtRef.current = Date.now();
    if (pathname === "/story" || pathname === "/auth" || pathname.startsWith("/admin")) return;
    const remaining = Math.max(0, 15000 - (Date.now() - openedAtRef.current));
    const timer = setTimeout(openAutomatically, remaining);
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= 0.5) openAutomatically();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      if (retryRef.current) clearTimeout(retryRef.current);
    };
  }, [pathname, openAutomatically]);

  const close = () => {
    storageSet(window.localStorage, DISMISS_KEY, String(Date.now() + SEVEN_DAYS));
    setOpen(false);
  };

  return (
    <CateringContext.Provider value={{ openCatering }}>
      {children}
      <Dialog.Root open={open} onOpenChange={(next) => { if (!next) close(); }}>
        <AnimatePresence>
          {open && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div className="fixed inset-0 z-[70] bg-charcoal/80 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
              </Dialog.Overlay>
              <Dialog.Content asChild forceMount aria-describedby="catering-description">
                <motion.div
                  style={{ x: "-50%", y: "-50%" }}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 280, damping: 26 }}
                  className="fixed left-1/2 top-1/2 z-[71] max-h-[92svh] w-[calc(100%-1.5rem)] max-w-4xl overflow-y-auto rounded-[2rem] bg-card shadow-warm focus:outline-none md:grid md:grid-cols-[0.82fr_1.18fr] md:overflow-hidden"
                >
                  <div className="relative h-40 overflow-hidden md:h-auto md:min-h-[650px]">
                    <img src={cateringImage} alt="Fresh chole kulche for your event" className="food-grade absolute inset-0 size-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                    <p className="absolute bottom-5 left-5 right-5 font-display text-2xl text-charcoal-foreground">Fresh kulche. Happy crowds.</p>
                  </div>
                  <div className="relative p-5 sm:p-8 md:max-h-[92svh] md:overflow-y-auto">
                    <Dialog.Close className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-charcoal/10 text-foreground transition-colors hover:bg-charcoal hover:text-charcoal-foreground focus:outline-none focus:ring-2 focus:ring-ring" aria-label="Close catering enquiry">
                      <X className="size-5" />
                    </Dialog.Close>
                    {submitted ? (
                      <div className="flex min-h-80 flex-col items-center justify-center py-10 text-center" role="status">
                        <span className="grid size-16 place-items-center rounded-full bg-veg text-primary-foreground"><Check className="size-8" /></span>
                        <Dialog.Title className="mt-6 font-display text-4xl">Thank you!</Dialog.Title>
                        <Dialog.Description id="catering-description" className="mt-3 max-w-sm text-base">Our team will call you within 24 hours.</Dialog.Description>
                        <Dialog.Close className="mt-8 rounded-full bg-charcoal px-7 py-3 font-semibold text-charcoal-foreground">Done</Dialog.Close>
                      </div>
                    ) : (
                      <>
                        <Dialog.Title className="pr-10 font-display text-3xl sm:text-4xl">Catering &amp; Bulk Orders</Dialog.Title>
                        <Dialog.Description id="catering-description" className="mt-2 pr-4 text-sm leading-relaxed">Planning an office lunch, wedding or event? Get a special quote from Sharma's Kulche.</Dialog.Description>
                        <CateringForm onSuccess={() => setSubmitted(true)} />
                      </>
                    )}
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </CateringContext.Provider>
  );
}

const field = "mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";

function CateringForm({ onSuccess }: { onSuccess: () => void }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    const form = new FormData(event.currentTarget);
    const parsed = cateringLeadSchema.safeParse({
      leadType: "catering",
      name: form.get("name"), phone: form.get("phone"), eventType: form.get("eventType"),
      guests: form.get("guests"), eventDate: form.get("eventDate"), branch: form.get("branch"),
      message: form.get("message"), website: form.get("website"), sourcePage: window.location.pathname,
    });
    if (!parsed.success) { setErrors(validationMessages(parsed.error)); return; }
    setErrors({}); setGeneralError(""); setPending(true);
    try {
      await submitLead({ data: parsed.data });
      onSuccess();
    } catch (error) {
      setGeneralError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally { setPending(false); }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="mt-5" aria-busy={pending}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] size-px opacity-0" />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">Name<input name="name" autoComplete="name" maxLength={60} className={field} /></label>
        <label className="text-sm font-medium">Phone number<input name="phone" type="tel" inputMode="numeric" autoComplete="tel" maxLength={10} placeholder="10-digit number" className={field} /></label>
      </div>
      {(errors["name"] || errors["phone"]) && <p className="mt-1 text-xs text-destructive">{errors["name"] ?? errors["phone"]}</p>}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">Event type
          <select name="eventType" defaultValue="" className={field}><option value="" disabled>Choose event</option>{EVENT_TYPES.map((type) => <option key={type}>{type}</option>)}</select>
        </label>
        <label className="text-sm font-medium">Approximate guests<input name="guests" type="number" inputMode="numeric" min={1} max={100000} placeholder="e.g. 80" className={field} /></label>
      </div>
      {(errors["eventType"] || errors["guests"]) && <p className="mt-1 text-xs text-destructive">{errors["eventType"] ?? errors["guests"]}</p>}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">Event date <span className="font-normal text-muted-foreground">(optional)</span><input name="eventDate" type="date" className={field} /></label>
        <label className="text-sm font-medium">Preferred branch
          <select name="branch" defaultValue="Not sure" className={field}>{BRANCH_OPTIONS.map((branch) => <option key={branch}>{branch}</option>)}</select>
        </label>
      </div>
      {errors["branch"] && <p className="mt-1 text-xs text-destructive">{errors["branch"]}</p>}
      <label className="mt-4 block text-sm font-medium">Message <span className="font-normal text-muted-foreground">(optional)</span><textarea name="message" rows={3} maxLength={1200} className={field} placeholder="Tell us what you have in mind" /></label>
      {generalError && <p role="alert" className="mt-3 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">{generalError}</p>}
      <button disabled={pending} className="mt-5 w-full rounded-full bg-fire py-3.5 font-semibold text-primary-foreground shadow-warm transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">{pending ? "Sending enquiry…" : "Get a Free Quote"}</button>
      <a href={whatsappUrl("Hi! I'd like a quote for catering / bulk order.")} target="_blank" rel="noopener noreferrer" className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border-2 border-veg py-3 font-semibold text-veg"><WhatsAppIcon /> Chat on WhatsApp</a>
    </form>
  );
}
