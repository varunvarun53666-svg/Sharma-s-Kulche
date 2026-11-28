import { createFileRoute } from "@tanstack/react-router";
import { Award, Store, GraduationCap, MapPinned, MessageSquareText, Handshake, Map, Settings, Rocket } from "lucide-react";
import hero from "@/assets/making-kulcha.jpg";
import { pageHead } from "@/components/site/seo";
import { PageHero } from "@/components/site/PageHero";
import { FadeUp, SectionTitle } from "@/components/site/FadeUp";
import { FranchiseForm } from "@/components/site/FranchiseForm";

export const Route = createFileRoute("/franchise")({
  head: () => pageHead("Franchise", "Own a Sharma's Kulche. Enquire about bringing our Delhi-style kulche to your city with training and support from an established Bengaluru brand."),
  component: Franchise,
});

const benefits = [
  { icon: Award, title: "Proven street-food brand", text: "A focused, much-loved product with an authentic Delhi-style identity." },
  { icon: Store, title: "Low-cost compact outlet", text: "A simple format designed around a focused menu and efficient service." },
  { icon: GraduationCap, title: "Training & support", text: "Guidance on recipes, kitchen processes, service and your opening." },
  { icon: MapPinned, title: "3 successful branches", text: "Learn from our experience across Kammanahalli, VV Puram and Bharathiya City." },
];
const steps = [
  { icon: MessageSquareText, title: "Enquire", text: "Tell us about yourself and your preferred location." },
  { icon: Handshake, title: "Discussion", text: "We discuss the brand, expectations and whether we're a good fit." },
  { icon: Map, title: "Site selection", text: "We review your proposed area and outlet location together." },
  { icon: Settings, title: "Setup & training", text: "Your outlet, team and kitchen processes are prepared for launch." },
  { icon: Rocket, title: "Launch", text: "Open your Sharma's Kulche with support from our team." },
];

function Franchise() {
  return (
    <>
      <PageHero title="Own a Sharma's Kulche" sub="Bring Bengaluru's buttery Delhi-style kulche to your neighbourhood." image={hero} />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTitle eyebrow="Why Partner With Us" title="A small tawa with big potential" sub="Build on a focused menu, an authentic recipe and hands-on guidance from our team." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, index) => <FadeUp key={item.title} delay={index * 0.08} className="rounded-3xl bg-card p-7 shadow-soft">
            <span className="grid size-14 place-items-center rounded-2xl bg-fire text-primary-foreground"><item.icon className="size-7" /></span>
            <h3 className="mt-5 text-2xl">{item.title}</h3><p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
          </FadeUp>)}
        </div>
        <div className="mt-8 grid gap-4 rounded-3xl border-2 border-dashed border-primary/40 bg-primary/5 p-6 sm:grid-cols-2">
          <div><p className="text-sm font-semibold uppercase tracking-widest text-primary">Investment</p><p className="mt-2 font-display text-2xl">[INVESTMENT DETAILS]</p><p className="mt-1 text-sm text-muted-foreground">Add the real investment range here.</p></div>
          <div><p className="text-sm font-semibold uppercase tracking-widest text-primary">Area needed</p><p className="mt-2 font-display text-2xl">[AREA REQUIRED]</p><p className="mt-1 text-sm text-muted-foreground">Add the real outlet area requirement here.</p></div>
        </div>
      </section>

      <section className="bg-charcoal py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle light eyebrow="How It Works" title="From enquiry to opening day" />
          <ol className="relative mt-12 grid gap-8 md:grid-cols-5">
            <div className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-charcoal-foreground/20 md:block" />
            {steps.map((step, index) => <li key={step.title} className="relative flex gap-4 md:flex-col md:text-center">
              <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full bg-fire text-primary-foreground shadow-warm md:mx-auto"><step.icon className="size-6" /></span>
              <div><p className="text-xs font-semibold uppercase tracking-widest text-accent">Step {index + 1}</p><h3 className="mt-1 text-2xl text-charcoal-foreground">{step.title}</h3><p className="mt-2 text-sm text-charcoal-foreground/65">{step.text}</p></div>
            </li>)}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <FadeUp><p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Start the Conversation</p><h2 className="mt-2 text-4xl sm:text-5xl">Franchise Enquiry</h2><p className="mt-4 text-muted-foreground">Share a few details and our team will contact you to discuss your location, goals and the partnership process.</p></FadeUp>
        <FadeUp delay={0.1}><FranchiseForm /></FadeUp>
      </section>
    </>
  );
}
