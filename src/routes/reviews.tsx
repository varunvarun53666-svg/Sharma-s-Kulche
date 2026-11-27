import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import hero from "@/assets/stuffed-kulcha.jpg";
import { supabase } from "@/integrations/supabase/client";
import { reviewsQuery, reviewSchema, looksLikeSpam } from "@/lib/reviews";
import { branches, brand } from "@/data/branches";
import { pageHead } from "@/components/site/seo";
import { PageHero } from "@/components/site/PageHero";
import { FadeUp, SectionTitle } from "@/components/site/FadeUp";
import { Stars } from "@/components/site/Stars";

export const Route = createFileRoute("/reviews")({
  loader: ({ context }) => context.queryClient.ensureQueryData(reviewsQuery),
  head: () => pageHead("Reviews", "Read what Bengaluru says about Sharma's Kulche, and share your own review of our kulche and chole."),
  component: Reviews,
  errorComponent: () => <p className="p-20 text-center">Reviews couldn't load right now. Please try again.</p>,
  notFoundComponent: () => <p className="p-20 text-center">Not found.</p>,
});

function Reviews() {
  const { data } = useSuspenseQuery(reviewsQuery);
  const avg = data.length ? data.reduce((s, r) => s + r.rating, 0) / data.length : 0;
  return (
    <>
      <PageHero title="Reviews" sub="Real words from real (and very full) customers." image={hero}>
        <div className="mt-8 inline-flex items-center gap-5 rounded-3xl bg-charcoal/60 px-6 py-4 text-charcoal-foreground backdrop-blur">
          <span className="font-display text-5xl text-accent">{avg.toFixed(1)}</span>
          <div><Stars value={avg} className="size-5" /><p className="mt-1 text-sm text-charcoal-foreground/75">from {data.length} reviews</p></div>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTitle eyebrow="Testimonials" title="Love from the tawa table" />
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {data.map((r, i) => (
            <FadeUp key={r.id} delay={(i % 6) * 0.05} className="mb-5 break-inside-avoid rounded-3xl bg-card p-6 shadow-soft">
              <Stars value={r.rating} />
              <p className="mt-3 text-foreground/90">“{r.comment}”</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-fire font-bold text-primary-foreground">{r.name.charAt(0)}</span>
                <div><p className="font-semibold">{r.name}</p><p className="text-xs text-muted-foreground">{branches.find((b) => b.slug === r.branch)?.name} branch</p></div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="bg-charcoal py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <ReviewForm />
          <GoogleReviews />
        </div>
      </section>
    </>
  );
}

function ReviewForm() {
  const qc = useQueryClient();
  const [openedAt] = useState(() => Date.now());
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const m = useMutation({
    mutationFn: async (v: { name: string; branch: string; rating: number; comment: string }) => {
      const { error } = await supabase.from("reviews").insert({ ...v, approved: false });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast.success("Thank you! Your review will appear once our team approves it.");
      qc.invalidateQueries({ queryKey: reviewsQuery.queryKey });
    },
    onError: () => toast.error("Couldn't send your review. Please try again."),
  });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (looksLikeSpam(String(fd.get("website") ?? ""), openedAt)) { toast.error("Please take a moment before submitting."); return; }
    const parsed = reviewSchema.safeParse({ name: fd.get("name"), branch: fd.get("branch"), rating, comment: fd.get("comment") });
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    m.mutate(parsed.data, { onSuccess: () => { (e.target as HTMLFormElement).reset(); setRating(0); } });
  };
  const field = "mt-1.5 w-full rounded-2xl border border-charcoal-foreground/15 bg-charcoal-foreground/5 px-4 py-3 text-charcoal-foreground placeholder:text-charcoal-foreground/40 focus:border-primary focus:outline-hidden";
  return (
    <form onSubmit={onSubmit} className="rounded-[2rem] border border-charcoal-foreground/10 p-6 text-charcoal-foreground sm:p-8" noValidate>
      <h2 className="text-4xl">Write a Review</h2>
      <p className="mt-2 text-sm text-charcoal-foreground/65">Reviews are checked by our team before they appear.</p>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="mt-6 block text-sm font-medium">Your name<input name="name" maxLength={60} className={field} placeholder="e.g. Priya" /></label>
      {errors["name"] && <p className="mt-1 text-sm text-accent">{errors["name"]}</p>}
      <label className="mt-4 block text-sm font-medium">Branch
        <select name="branch" defaultValue="" className={field}>
          <option value="" disabled>Choose a branch</option>
          {branches.map((b) => <option key={b.slug} value={b.slug} className="text-foreground">{b.name}</option>)}
        </select>
      </label>
      {errors["branch"] && <p className="mt-1 text-sm text-accent">{errors["branch"]}</p>}
      <fieldset className="mt-4">
        <legend className="text-sm font-medium">Rating</legend>
        <div className="mt-2 flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button type="button" key={n} aria-label={`${n} star${n > 1 ? "s" : ""}`} aria-pressed={rating === n} onMouseEnter={() => setHover(n)} onClick={() => setRating(n)} className="p-1 transition-transform hover:scale-110">
              <Star className={`size-8 ${(hover || rating) >= n ? "fill-accent text-accent" : "text-charcoal-foreground/30"}`} />
            </button>
          ))}
        </div>
      </fieldset>
      {errors["rating"] && <p className="mt-1 text-sm text-accent">{errors["rating"]}</p>}
      <label className="mt-4 block text-sm font-medium">Your review<textarea name="comment" rows={4} maxLength={600} className={field} placeholder="What did you love?" /></label>
      {errors["comment"] && <p className="mt-1 text-sm text-accent">{errors["comment"]}</p>}
      <button disabled={m.isPending} className="mt-6 w-full rounded-full bg-fire py-4 font-semibold text-primary-foreground shadow-warm disabled:opacity-60">{m.isPending ? "Sending…" : "Submit review"}</button>
    </form>
  );
}

/* ============================================================
 * GOOGLE REVIEWS — placeholder
 * To connect live Google reviews later, either:
 *  1. Add a server function that calls Google Places API (New) place details
 *     with the `reviews` field for each branch's place ID, and render them here; or
 *  2. Paste a third-party review widget embed inside this component.
 * ============================================================ */
function GoogleReviews() {
  return (
    <div className="flex flex-col justify-center rounded-[2rem] bg-charcoal-foreground/5 p-6 text-charcoal-foreground sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Google Reviews</p>
      <h2 className="mt-2 text-4xl">Loved us? Tell Google too.</h2>
      <p className="mt-3 text-charcoal-foreground/70">Your Google review helps more kulche lovers find us. Live Google reviews will show up here soon.</p>
      <div className="mt-6 grid gap-3">
        {[0, 1].map((i) => <div key={i} className="h-20 animate-pulse rounded-2xl bg-charcoal-foreground/10" />)}
      </div>
      <a href={brand.googleReviewLink} target="_blank" rel="noreferrer" className="mt-6 inline-flex justify-center rounded-full bg-charcoal-foreground px-6 py-4 font-semibold text-charcoal">★ Review us on Google</a>
    </div>
  );
}
