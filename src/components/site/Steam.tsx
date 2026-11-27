// Floating steam / spice particles for the hero. Positions are fixed (no Math.random) to stay SSR-safe.
const particles = [
  { l: 8, s: 70, d: 9, delay: 0, k: "steam" }, { l: 22, s: 40, d: 11, delay: 2, k: "spice" },
  { l: 35, s: 90, d: 10, delay: 4, k: "steam" }, { l: 48, s: 30, d: 8, delay: 1, k: "spice" },
  { l: 60, s: 80, d: 12, delay: 3, k: "steam" }, { l: 72, s: 26, d: 9, delay: 5, k: "spice" },
  { l: 84, s: 60, d: 10, delay: 6, k: "steam" }, { l: 92, s: 22, d: 7, delay: 2.5, k: "spice" },
  { l: 15, s: 18, d: 8, delay: 6.5, k: "spice" }, { l: 66, s: 16, d: 9.5, delay: 7, k: "spice" },
];
export function Steam() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-full overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className={`animate-rise absolute bottom-[-10%] rounded-full ${p.k === "steam" ? "bg-charcoal-foreground/15 blur-2xl" : "bg-accent/70 blur-[1px]"}`}
          style={{ left: `${p.l}%`, width: p.k === "steam" ? p.s : p.s / 4, height: p.k === "steam" ? p.s : p.s / 4, animationDelay: `${p.delay}s`, ["--dur" as string]: `${p.d}s` }}
        />
      ))}
    </div>
  );
}
