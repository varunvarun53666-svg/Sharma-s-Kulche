import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import making from "@/assets/making-kulcha.jpg";
import { gallery, galleryFilters } from "@/data/gallery";
import { pageHead } from "@/components/site/seo";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/gallery")({
  head: () => pageHead("Gallery", "Kulche, chole, our branches and the making of every buttery kulcha at Sharma's Kulche, Bengaluru."),
  component: Gallery,
});

function Gallery() {
  const [filter, setFilter] = useState<(typeof galleryFilters)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const items = filter === "All" ? gallery : gallery.filter((g) => g.kind === filter);
  const cur = open !== null ? items[open] : undefined;
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % items.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, items.length]);

  return (
    <>
      <PageHero title="Gallery" sub="A peek at the plates, the places and the tawa action." image={making} />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Gallery filters">
          {galleryFilters.map((f) => (
            <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${filter === f ? "bg-fire text-primary-foreground shadow-warm" : "bg-muted hover:bg-accent"}`}>{f}</button>
          ))}
        </div>
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {items.map((g, i) => (
            <motion.button layout key={g.alt} onClick={() => setOpen(i)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="group relative mb-5 block w-full overflow-hidden rounded-3xl shadow-soft" aria-label={`Open ${g.alt}`}>
              {g.video ? (
                <video src={g.video} poster={g.src} muted loop playsInline autoPlay preload="none" className={`food-grade w-full object-cover ${g.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`} />
              ) : (
                <img src={g.src} alt={g.alt} loading="lazy" className={`food-grade w-full object-cover transition-transform duration-700 group-hover:scale-110 ${g.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`} />
              )}
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-charcoal/80 to-transparent p-4 text-left text-sm font-medium text-charcoal-foreground opacity-0 transition-opacity group-hover:opacity-100">{g.alt}</span>
              {g.video && <span className="absolute right-3 top-3 rounded-full bg-charcoal/70 p-2 text-charcoal-foreground"><Play className="size-4" /></span>}
            </motion.button>
          ))}
        </div>
      </section>
      <AnimatePresence>
        {cur && (
          <motion.div role="dialog" aria-modal="true" aria-label={cur.alt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center bg-charcoal/95 p-4" onClick={() => setOpen(null)}>
            <button aria-label="Close" className="absolute right-4 top-4 rounded-full bg-charcoal-foreground/10 p-3 text-charcoal-foreground" onClick={() => setOpen(null)} autoFocus><X /></button>
            <button aria-label="Previous" className="absolute left-2 rounded-full bg-charcoal-foreground/10 p-3 text-charcoal-foreground sm:left-6" onClick={(e) => { e.stopPropagation(); setOpen(((open ?? 0) - 1 + items.length) % items.length); }}><ChevronLeft /></button>
            <motion.div key={cur.alt} initial={{ scale: 0.95 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()}>
              {cur.video ? <video src={cur.video} controls autoPlay muted loop className="max-h-[85vh] rounded-2xl" /> : <img src={cur.src} alt={cur.alt} className="food-grade max-h-[85vh] rounded-2xl object-contain" />}
              <p className="mt-3 text-center text-charcoal-foreground/80">{cur.alt}</p>
            </motion.div>
            <button aria-label="Next" className="absolute right-2 rounded-full bg-charcoal-foreground/10 p-3 text-charcoal-foreground sm:right-6" onClick={(e) => { e.stopPropagation(); setOpen(((open ?? 0) + 1) % items.length); }}><ChevronRight /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
