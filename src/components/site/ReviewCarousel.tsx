import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from "lucide-react";
import type { Review } from "@/lib/reviews";
import { branches } from "@/data/branches";
import { Stars } from "./Stars";

export function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const n = reviews.length;
  useEffect(() => {
    if (!playing || reduce || n < 2) return;
    const id = setInterval(() => setI((x) => (x + 1) % n), 5000);
    return () => clearInterval(id);
  }, [playing, reduce, n]);
  const r = reviews[i];
  if (!r) return <p className="text-center text-charcoal-foreground/70">Reviews coming soon.</p>;
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Quote className="mx-auto size-12 text-primary" aria-hidden="true" />
      <div className="relative min-h-52" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.figure key={r.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
            <blockquote className="mt-4 font-display text-2xl leading-snug text-charcoal-foreground sm:text-3xl">“{r.comment}”</blockquote>
            <figcaption className="mt-6 flex flex-col items-center gap-2 text-charcoal-foreground/80">
              <Stars value={r.rating} className="size-5" />
              <span className="font-semibold">{r.name}</span>
              <span className="text-sm text-charcoal-foreground/60">{branches.find((b) => b.slug === r.branch)?.name} branch</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button onClick={() => setI((i - 1 + n) % n)} aria-label="Previous review" className="rounded-full bg-charcoal-foreground/10 p-2 text-charcoal-foreground hover:bg-primary"><ChevronLeft className="size-5" /></button>
        <button onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause reviews" : "Play reviews"} className="rounded-full bg-charcoal-foreground/10 p-2 text-charcoal-foreground hover:bg-primary">{playing ? <Pause className="size-5" /> : <Play className="size-5" />}</button>
        <button onClick={() => setI((i + 1) % n)} aria-label="Next review" className="rounded-full bg-charcoal-foreground/10 p-2 text-charcoal-foreground hover:bg-primary"><ChevronRight className="size-5" /></button>
      </div>
    </div>
  );
}
