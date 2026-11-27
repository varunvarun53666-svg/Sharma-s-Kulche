import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import storefront from "@/assets/branch-storefront.png.asset.json";
import { branches, directionsUrl, embedUrl } from "@/data/branches";
import { pageHead } from "@/components/site/seo";
import { PageHero } from "@/components/site/PageHero";
import { FadeUp } from "@/components/site/FadeUp";
import { OpenBadge } from "@/components/site/OpenBadge";

export const Route = createFileRoute("/locations")({
  head: () => pageHead("Locations", "Find Sharma's Kulche in Kammanahalli, VV Puram and Bharathiya City, Bengaluru — addresses, hours, phone and directions."),
  component: Locations,
});

function Locations() {
  return (
    <>
      <PageHero title="Find a Branch" sub="Three tawas across Bengaluru, all firing up fresh kulche." image={storefront.url} />
      <section className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6">
        {branches.map((b, i) => (
          <FadeUp key={b.slug}>
            <article id={b.slug} className="scroll-mt-28 overflow-hidden rounded-[2rem] bg-card shadow-warm lg:grid lg:grid-cols-2">
              <div className={`group relative aspect-[4/3] overflow-hidden lg:aspect-auto ${i % 2 ? "lg:order-2" : ""}`}>
                <img src={b.image} alt={`Sharma's Kulche ${b.name} outlet`} loading="lazy" className="food-grade size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute left-4 top-4"><OpenBadge hours={b.hours} /></div>
              </div>
              <div className="p-6 sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{b.area}</p>
                <h2 className="mt-2 text-4xl sm:text-5xl">{b.name}</h2>
                <ul className="mt-6 space-y-3">
                  <li className="flex gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-primary" />{b.address}</li>
                  <li className="flex gap-3"><Clock className="mt-0.5 size-5 shrink-0 text-primary" />{b.hoursLabel}</li>
                  <li className="flex gap-3"><Phone className="mt-0.5 size-5 shrink-0 text-primary" />{b.phoneDisplay}</li>
                </ul>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a href={`tel:+${b.phone}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-fire px-6 py-3 font-semibold text-primary-foreground shadow-warm"><Phone className="size-4" />Call now</a>
                  <a href={directionsUrl(b)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-charcoal px-6 py-3 font-semibold hover:bg-charcoal hover:text-charcoal-foreground"><Navigation className="size-4" />Get Directions</a>
                </div>
                <iframe title={`Map of ${b.name} branch`} src={embedUrl(b)} loading="lazy" className="mt-6 h-56 w-full rounded-2xl border-0" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </article>
          </FadeUp>
        ))}
      </section>
    </>
  );
}
