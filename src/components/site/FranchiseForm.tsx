import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { BUDGET_OPTIONS, franchiseLeadSchema, validationMessages } from "@/lib/leads";
import { submitLead } from "@/lib/leads.functions";

const field = "mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";

export function FranchiseForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    const form = new FormData(event.currentTarget);
    const parsed = franchiseLeadSchema.safeParse({
      leadType: "franchise", name: form.get("name"), phone: form.get("phone"), email: form.get("email"),
      city: form.get("city"), budget: form.get("budget"), hasProperty: form.get("hasProperty"),
      experience: form.get("experience"), message: form.get("message"), website: form.get("website"),
      sourcePage: window.location.pathname,
    });
    if (!parsed.success) { setErrors(validationMessages(parsed.error)); return; }
    setErrors({}); setGeneralError(""); setPending(true);
    try {
      await submitLead({ data: parsed.data });
      setSuccess(true);
    } catch (error) {
      setGeneralError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally { setPending(false); }
  };

  if (success) return (
    <div className="flex min-h-96 flex-col items-center justify-center rounded-[2rem] bg-card p-8 text-center shadow-warm" role="status">
      <span className="grid size-16 place-items-center rounded-full bg-veg text-primary-foreground"><Check className="size-8" /></span>
      <h2 className="mt-6 text-4xl">Thank you!</h2>
      <p className="mt-3 max-w-md text-muted-foreground">Your franchise enquiry is with our team. We'll be in touch to discuss the next steps.</p>
    </div>
  );

  const errorFor = (name: string) => errors[name] ? <p className="mt-1 text-xs text-destructive">{errors[name]}</p> : null;
  return (
    <form onSubmit={onSubmit} noValidate aria-busy={pending} className="rounded-[2rem] bg-card p-6 shadow-warm sm:p-8">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] size-px opacity-0" />
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className="text-sm font-medium">Full name<input name="name" autoComplete="name" maxLength={60} className={field} /></label>{errorFor("name")}</div>
        <div><label className="text-sm font-medium">Phone<input name="phone" type="tel" inputMode="numeric" autoComplete="tel" maxLength={10} placeholder="10-digit number" className={field} /></label>{errorFor("phone")}</div>
        <div><label className="text-sm font-medium">Email<input name="email" type="email" autoComplete="email" maxLength={255} className={field} /></label>{errorFor("email")}</div>
        <div><label className="text-sm font-medium">City / preferred location<input name="city" maxLength={120} className={field} /></label>{errorFor("city")}</div>
        <div><label className="text-sm font-medium">Investment budget
          <select name="budget" defaultValue="" className={field}><option value="" disabled>Choose a range</option>{BUDGET_OPTIONS.map((budget) => <option key={budget}>{budget}</option>)}</select>
        </label>{errorFor("budget")}</div>
        <fieldset><legend className="text-sm font-medium">Do you own a property?</legend><div className="mt-2 flex gap-3">
          <label className="flex flex-1 items-center gap-2 rounded-2xl border border-input bg-background px-4 py-3"><input type="radio" name="hasProperty" value="yes" className="accent-primary" />Yes</label>
          <label className="flex flex-1 items-center gap-2 rounded-2xl border border-input bg-background px-4 py-3"><input type="radio" name="hasProperty" value="no" className="accent-primary" />No</label>
        </div>{errorFor("hasProperty")}</fieldset>
      </div>
      <div className="mt-5"><label className="text-sm font-medium">Previous business experience <span className="font-normal text-muted-foreground">(optional)</span><textarea name="experience" rows={3} maxLength={1000} className={field} /></label></div>
      <div className="mt-5"><label className="text-sm font-medium">Message <span className="font-normal text-muted-foreground">(optional)</span><textarea name="message" rows={4} maxLength={1200} className={field} /></label></div>
      {generalError && <p role="alert" className="mt-4 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">{generalError}</p>}
      <button disabled={pending} className="mt-6 w-full rounded-full bg-fire py-4 font-semibold text-primary-foreground shadow-warm disabled:cursor-not-allowed disabled:opacity-60">{pending ? "Sending enquiry…" : "Submit Franchise Enquiry"}</button>
    </form>
  );
}
