const words = ["Fresh Kulche", "Spicy Chole", "Tangy Chutneys", "Made Fresh Daily", "Loaded with Butter", "Delhi Style"];
export function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="-rotate-1 overflow-hidden bg-fire py-4 shadow-warm">
      <div className="animate-marquee flex w-max gap-8 whitespace-nowrap">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-2xl text-primary-foreground sm:text-3xl">
            {w} <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
