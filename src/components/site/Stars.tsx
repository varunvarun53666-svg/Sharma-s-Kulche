import { Star } from "lucide-react";
export function Stars({ value, className = "size-4" }: { value: number; className?: string }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => <Star key={i} className={`${className} ${i <= Math.round(value) ? "fill-accent text-accent" : "text-muted-foreground/40"}`} />)}
    </span>
  );
}
