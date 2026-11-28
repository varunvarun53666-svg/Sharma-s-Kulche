import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Flame, ScrollText, Soup, MapPinned } from "lucide-react";
import heroImg from "@/assets/hero-kulcha.jpg";
import makingImg from "@/assets/making-kulcha.jpg";
import { menu } from "@/data/menu";
import { branches, brand } from "@/data/branches";
import { reviewsQuery } from "@/lib/reviews";
import { pageHead } from "@/components/site/seo";
import { Steam } from "@/components/site/Steam";
import { Marquee } from "@/components/site/Marquee";
import { FadeUp, SectionTitle } from "@/components/site/FadeUp";
import { DishCard } from "@/components/site/DishCard";
import { Counter } from "@/components/site/Counter";
import { BranchPreview } from "@/components/site/BranchCard";
import { ReviewCarousel } from "@/components/site/ReviewCarousel";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(reviewsQuery),
  head: () => pageHead("Soft. Buttery. Straight off the Tawa.", "Bengaluru's favourite Delhi-style kulche and chole, served fresh at Kammanahalli, VV Puram and Bharathiya City."),
  component: Home,
  errorComponent: () => <p className="p-20 text-center">Something went wrong loading the page.</p>,
  notFoundComponent: () => <p className="p-20 text-center">Not found.</p>,
});

const features = [
  { icon: Flame, title: "Fresh Daily", text: "Dough kneaded every morning, kulche made only when you order." },
  { icon: ScrollText, title: "Authentic Recipe", text: "A family recipe carried from the lanes of Delhi and Amritsar." },
  { icon: Soup, title: "Generous Portions", text: "Big plates, extra chole, never shy with the butter." },
  { icon: MapPinned, title: "3 Branches", text: "Kammanahalli, VV Puram and Bharathiya City — always nearby." },
];

function Home() {
  const { data: reviews } = useSuspenseQuery(reviewsQuery);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const parRef = useRef<HTMLElement>(null);
  const { scrollYProgress: p2 } = useScroll({ target: parRef, offset: ["start end", "end start"] });
  const y2 = useTransform(p2, [0, 1], ["-15%", "15%"]);
  const signature = menu.filter((m) => m.bestseller).slice(0, 6);

  return (
    <>
      <section ref={heroRef} className="relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal">
        <motion.div style={{ y }} className="absolute inset-0">
          {/* [VIDEO_FILE] replace /videos/tawa-hero.mp4 with your own clip; the poster shows on slow connections */}
          <video className="food-grade size-full object-cover" src="/videos/tawa-hero.mp4" poster={heroImg} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        </motion.div>
        <div className="bg-hero-overlay vignette absolute inset-0" />
        <Steam />
        <div className="relative mx-auto w-full max-w-7xl px-4 pt-20 sm:px-6">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex rounded-full border border-accent/40 bg-charcoal/40 px-4 py-1.5 text-sm font-medium text-accent backdrop-blur">
            Delhi-style street food · Bengaluru
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="mt-6 max-w-4xl text-5xl leading-[1.05] text-charcoal-foreground sm:text-7xl lg:text-8xl">
            Soft. Buttery. <span className="text-primary">Straight off the Tawa.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="mt-6 max-w-xl text-lg text-charcoal-foreground/85 sm:text-xl">
            Bengaluru's favourite kulche, served fresh at 3 branches.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/menu" className="rounded-full bg-fire px-8 py-4 text-center font-semibold text-primary-foreground shadow-warm transition-transform hover:scale-105">View Menu</Link>
            <Link to="/locations" className="rounded-full border-2 border-charcoal-foreground/60 px-8 py-4 text-center font-semibold text-charcoal-foreground backdrop-blur transition-colors hover:bg-charcoal-foreground hover:text-charcoal">Find a Branch</Link>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 -mt-6"><Marquee /></div>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionTitle eyebrow="Signature Dishes" title="The plates people queue for" sub="Every kulcha is rolled, stuffed and slapped onto the tawa the moment you order." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {signature.map((item, i) => <FadeUp key={item.id} delay={i * 0.08}><DishCard item={item} /></FadeUp>)}
        </div>
        <div className="mt-10 text-center"><Link to="/menu" className="inline-flex rounded-full bg-charcoal px-7 py-3.5 font-semibold text-charcoal-foreground hover:bg-secondary">See the full menu</Link></div>
      </section>

      <section ref={parRef} className="relative overflow-hidden bg-charcoal py-24">
        <motion.img style={{ y: y2 }} src={makingImg} alt="" loading="lazy" className="food-grade absolute inset-0 h-[130%] w-full object-cover opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle light eyebrow="Why People Love Us" title="Made the old way, every day" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.1} className="rounded-3xl border border-charcoal-foreground/10 bg-charcoal/60 p-7 text-charcoal-foreground backdrop-blur">
                <div className="grid size-14 place-items-center rounded-2xl bg-fire shadow-warm"><f.icon className="size-7 text-primary-foreground" /></div>
                <h3 className="mt-5 text-2xl">{f.title}</h3>
                <p className="mt-2 text-sm text-charcoal-foreground/70">{f.text}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-fire py-16 text-primary-foreground">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 text-center sm:grid-cols-3">
          <div><p className="font-display text-6xl"><Counter to={3} /></p><p className="mt-1 font-medium uppercase tracking-widest">Branches</p></div>
          <div><p className="font-display text-6xl"><Counter to={brand.stats.customers} suffix="+" /></p><p className="mt-1 font-medium uppercase tracking-widest">Happy Customers</p></div>
          <div><p className="font-display text-6xl"><Counter to={brand.stats.years} /></p><p className="mt-1 font-medium uppercase tracking-widest">Years of Taste</p></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionTitle eyebrow="Our Branches" title="Three tawas, one city" />
        <div className="grid gap-6 md:grid-cols-3">
          {branches.map((b, i) => <FadeUp key={b.slug} delay={i * 0.1}><BranchPreview b={b} /></FadeUp>)}
        </div>
      </section>

      <section className="bg-charcoal py-24">
        <div className="px-4 sm:px-6">
          <SectionTitle light eyebrow="Reviews" title="Straight from happy plates" />
          <ReviewCarousel reviews={reviews} />
          <div className="mt-8 text-center"><Link to="/reviews" className="font-semibold text-accent underline-offset-4 hover:underline">Read all reviews →</Link></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <FadeUp className="relative overflow-hidden rounded-[2rem] bg-fire px-6 py-16 text-center text-primary-foreground shadow-warm sm:px-16">
          <img src={heroImg} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-20 mix-blend-multiply" />
          <div className="relative">
            <h2 className="text-4xl sm:text-6xl">Hungry? Visit your nearest branch today.</h2>
            <p className="mx-auto mt-4 max-w-lg text-primary-foreground/90">Hot kulche are waiting on the tawa at Kammanahalli, VV Puram and Bharathiya City.</p>
            <Link to="/locations" className="mt-8 inline-flex rounded-full bg-charcoal px-8 py-4 font-semibold text-charcoal-foreground transition-transform hover:scale-105">Find a Branch</Link>
          </div>
        </FadeUp>
      </section>

      <section className="px-4 pb-20 sm:px-6">
        <FadeUp className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 rounded-[2rem] border border-primary/20 bg-card p-7 text-center shadow-soft sm:flex-row sm:text-left">
          <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Franchise Enquiry</p><h2 className="mt-1 text-3xl">Bring Sharma's Kulche to your neighbourhood.</h2></div>
          <Link to="/franchise" className="shrink-0 rounded-full bg-fire px-7 py-3.5 font-semibold text-primary-foreground shadow-warm">Own a Sharma's Kulche →</Link>
        </FadeUp>
      </section>
    </>
  );
}
