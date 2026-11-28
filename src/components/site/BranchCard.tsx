import { Link } from "@tanstack/react-router";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import type { Branch } from "@/data/branches";
import { OpenBadge } from "./OpenBadge";
import { GoogleIcon } from "./BrandIcons";

export function BranchPreview({ b }: { b: Branch }) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-card shadow-soft transition-shadow hover:shadow-warm">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={b.image} alt={`${b.name} branch`} loading="lazy" className="food-grade size-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute left-3 top-3"><OpenBadge hours={b.hours} /></div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl">{b.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{b.area}</p>
        <p className="mt-4 flex gap-2 text-sm"><MapPin className="size-4 shrink-0 text-primary" />{b.address}</p>
        <p className="mt-2 flex gap-2 text-sm"><Clock className="size-4 shrink-0 text-primary" />{b.hoursLabel}</p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Link to="/locations" hash={b.slug} className="inline-flex items-center gap-1 font-semibold text-secondary">View Details <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link>
          {b.googleReviewUrl && <a href={b.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary"><GoogleIcon className="size-4" />Review this branch</a>}
        </div>
      </div>
    </article>
  );
}
