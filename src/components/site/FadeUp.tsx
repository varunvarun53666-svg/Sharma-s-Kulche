import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function FadeUp({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({ eyebrow, title, sub, light }: { eyebrow: string; title: string; sub?: string; light?: boolean }) {
  return (
    <FadeUp className="mx-auto mb-10 max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
      <h2 className={`mt-2 text-4xl sm:text-5xl ${light ? "text-charcoal-foreground" : ""}`}>{title}</h2>
      <Divider />
      {sub && <p className={`mt-3 ${light ? "text-charcoal-foreground/75" : "text-muted-foreground"}`}>{sub}</p>}
    </FadeUp>
  );
}

export function Divider() {
  return (
    <motion.svg viewBox="0 0 200 16" className="mx-auto mt-4 h-4 w-40" aria-hidden="true">
      <motion.path
        d="M2 8 Q 25 0 50 8 T 100 8 T 150 8 T 198 8"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        className="stroke-primary"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />
    </motion.svg>
  );
}
