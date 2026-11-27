import type { MenuItem } from "@/data/menu";

export function VegMark() {
  return <span title="Vegetarian" aria-label="Vegetarian" className="grid size-4 place-items-center rounded-[3px] border-2 border-veg"><span className="size-1.5 rounded-full bg-veg" /></span>;
}

export function DishCard({ item }: { item: MenuItem }) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-card shadow-soft transition-shadow hover:shadow-warm">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={item.image} alt={item.name} loading="lazy" className="food-grade size-full object-cover transition-transform duration-700 group-hover:scale-110" />
        {item.bestseller && <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow-soft">★ Bestseller</span>}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="flex min-w-0 items-center gap-2 font-sans text-lg font-semibold">{item.veg && <span className="shrink-0"><VegMark /></span>}<span className="truncate">{item.name}</span></h3>
          <span className="shrink-0 font-display text-xl text-secondary">₹{item.price}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
      </div>
    </article>
  );
}
