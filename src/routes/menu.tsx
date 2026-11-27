import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import hero from "@/assets/chole-kulche.jpg";
import { categories, menu, type Category } from "@/data/menu";
import { pageHead } from "@/components/site/seo";
import { PageHero } from "@/components/site/PageHero";
import { DishCard, VegMark } from "@/components/site/DishCard";

export const Route = createFileRoute("/menu")({
  head: () => pageHead("Menu", "Amritsari kulche, pindi chole, combos, chaat, lassi and desserts — prices and bestsellers at Sharma's Kulche, Bengaluru."),
  component: MenuPage,
});

function MenuPage() {
  const [cat, setCat] = useState<Category | "All">("All");
  const items = cat === "All" ? menu : menu.filter((m) => m.category === cat);
  return (
    <>
      <PageHero title="Our Menu" sub="Everything is 100% vegetarian, made fresh and finished with a generous dollop of butter." image={hero} />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="sticky top-16 z-30 -mx-4 mb-10 overflow-x-auto bg-background/90 px-4 py-3 backdrop-blur sm:top-20" role="tablist" aria-label="Menu categories">
          <div className="flex w-max gap-2">
            {(["All", ...categories] as const).map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${cat === c ? "text-primary-foreground" : "bg-muted text-foreground hover:bg-accent"}`}>
                {cat === c && <motion.span layoutId="menu-pill" className="absolute inset-0 rounded-full bg-fire" transition={{ type: "spring", bounce: 0.25, duration: 0.5 }} />}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="mb-6 flex items-center gap-2 text-sm text-muted-foreground"><VegMark /> Pure vegetarian kitchen · Prices in ₹, inclusive of taxes</p>
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.3 }}>
                <DishCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  );
}
