import { motion } from "framer-motion";

export function PageHero({ title, sub, image, children }: { title: string; sub: string; image: string; children?: React.ReactNode }) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-charcoal pb-14 pt-32">
      <img src={image} alt="" className="food-grade absolute inset-0 size-full object-cover opacity-60" fetchPriority="high" />
      <div className="bg-hero-overlay vignette absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-5xl text-charcoal-foreground sm:text-7xl">
          {title}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="mt-4 max-w-xl text-lg text-charcoal-foreground/80">
          {sub}
        </motion.p>
        {children}
      </div>
    </section>
  );
}
