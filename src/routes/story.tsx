import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram, Facebook } from "lucide-react";
import { z } from "zod";
import making from "@/assets/making-kulcha.jpg";
import hero from "@/assets/hero-kulcha.jpg";
import chole from "@/assets/chole-kulche.jpg";
import interior from "@/assets/branch-interior.jpg";
import { branches, brand, whatsappUrl } from "@/data/branches";
import { pageHead } from "@/components/site/seo";
import { PageHero } from "@/components/site/PageHero";
import { FadeUp, SectionTitle } from "@/components/site/FadeUp";
import { WhatsAppIcon } from "@/components/site/FloatingActions";

export const Route = createFileRoute("/story")({
  head: () => pageHead("Our Story & Contact", "The family recipe behind Sharma's Kulche, and how to reach us for orders, catering and bulk enquiries in Bengaluru."),
  component: Story,
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(60),
  phone: z.string().trim().regex(/^[0-9+\s-]{10,15}$/, "Enter a valid phone number"),
  branch: z.string().min(1, "Pick a branch"),
  type: z.enum(["General", "Catering / Bulk order"]),
  message: z.string().trim().min(5, "Add a short message").max(800),
});

function Story() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const p = contactSchema.safeParse(Object.fromEntries(fd));
    if (!p.success) { setErrors(Object.fromEntries(p.error.issues.map((i) => [String(i.path[0]), i.message]))); return; }
    setErrors({});
    const d = p.data;
    const text = `Hi Sharma's Kulche!\nEnquiry: ${d.type}\nName: ${d.name}\nPhone: ${d.phone}\nBranch: ${d.branch}\n\n${d.message}`;
    window.open(whatsappUrl(text), "_blank", "noopener");
  };
  const field = "mt-1.5 w-full rounded-2xl border border-input bg-card px-4 py-3 focus:border-primary focus:outline-hidden";
  return (
    <>
      <PageHero title="Our Story" sub="From a Delhi gali to Bengaluru's busiest food streets." image={making} />
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <FadeUp>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Since [YEAR]</p>
          <h2 className="mt-2 text-4xl sm:text-5xl">A family recipe, one tawa at a time</h2>
          {/* Edit this story copy to match your real history */}
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>It started in our grandmother's kitchen in old Delhi, where Sunday mornings meant the smell of ghee, ajwain and fresh dough slapping onto a hot iron tawa. Her kulche were soft enough to fold, crisp enough to crackle, and always served with a bowl of dark, tangy chole.</p>
            <p>When the Sharma family moved to Bengaluru, we missed that taste so much we decided to bring it here. The first stall was tiny — one tawa, one recipe, and a lot of butter. Word spread fast.</p>
            <p>Today, across three branches, we still knead our dough fresh every morning, grind our own chole masala, and make every kulcha only when you order it. Because some things should never be rushed.</p>
          </div>
        </FadeUp>
        <FadeUp delay={0.15} className="relative">
          <img src={hero} alt="Fresh kulche with butter" loading="lazy" className="food-grade aspect-[4/5] w-full rounded-[2rem] object-cover shadow-warm" />
          <div className="absolute -bottom-6 -left-4 rounded-3xl bg-fire px-6 py-4 text-primary-foreground shadow-warm"><p className="font-display text-3xl">100%</p><p className="text-sm">fresh, every order</p></div>
        </FadeUp>
      </section>

      <section className="bg-charcoal py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle light eyebrow="Meet the Kitchen" title="Where the magic happens" sub="Our cooks shape, stuff and bake hundreds of kulche every day." />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {[{ s: making, a: "Cook pressing kulcha onto the tawa", c: "md:row-span-2" }, { s: chole, a: "Chole bubbling, ready to serve", c: "" }, { s: interior, a: "Our branch kitchen counter", c: "" }, { s: hero, a: "Kulche finished with butter", c: "col-span-2" }].map((x) => (
              <div key={x.a} className={`group overflow-hidden rounded-3xl ${x.c}`}>
                <img src={x.s} alt={x.a} loading="lazy" className="food-grade size-full min-h-44 object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <FadeUp>
          <h2 className="text-4xl sm:text-5xl">Get in touch</h2>
          <p className="mt-3 text-muted-foreground">Questions, feedback, or planning a party? Catering and bulk orders for offices, weddings and events are welcome.</p>
          <a href={whatsappUrl("Hi Sharma's Kulche! I'd like to enquire about catering / a bulk order.")} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-veg px-6 py-4 font-semibold text-primary-foreground shadow-warm"><WhatsAppIcon className="size-5" /> Chat on WhatsApp</a>
          <div className="mt-8 flex gap-3">
            <a href={brand.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full bg-charcoal p-3 text-charcoal-foreground hover:bg-primary"><Instagram /></a>
            <a href={brand.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-full bg-charcoal p-3 text-charcoal-foreground hover:bg-primary"><Facebook /></a>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="rounded-[2rem] bg-card p-6 shadow-warm sm:p-8">
            <label className="block text-sm font-medium">Name<input name="name" maxLength={60} className={field} /></label>
            {errors["name"] && <p className="mt-1 text-sm text-destructive">{errors["name"]}</p>}
            <label className="mt-4 block text-sm font-medium">Phone<input name="phone" type="tel" maxLength={15} className={field} /></label>
            {errors["phone"] && <p className="mt-1 text-sm text-destructive">{errors["phone"]}</p>}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium">Branch
                <select name="branch" defaultValue="" className={field}>
                  <option value="" disabled>Choose</option>
                  {branches.map((b) => <option key={b.slug}>{b.name}</option>)}
                </select>
              </label>
              <label className="block text-sm font-medium">Enquiry type
                <select name="type" defaultValue="General" className={field}><option>General</option><option>Catering / Bulk order</option></select>
              </label>
            </div>
            {errors["branch"] && <p className="mt-1 text-sm text-destructive">{errors["branch"]}</p>}
            <label className="mt-4 block text-sm font-medium">Message<textarea name="message" rows={4} maxLength={800} className={field} /></label>
            {errors["message"] && <p className="mt-1 text-sm text-destructive">{errors["message"]}</p>}
            <button className="mt-6 w-full rounded-full bg-fire py-4 font-semibold text-primary-foreground shadow-warm">Send via WhatsApp</button>
          </form>
        </FadeUp>
      </section>
    </>
  );
}
