import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { pageHead } from "@/components/site/seo";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => typeof search.redirect === "string" ? { redirect: search.redirect } : {},
  head: () => ({ ...pageHead("Admin Sign In", "Secure sign-in for Sharma's Kulche lead management."), meta: [...pageHead("Admin Sign In", "Secure sign-in for Sharma's Kulche lead management.").meta, { name: "robots", content: "noindex,nofollow" }] }),
  component: Auth,
});

const signInSchema = z.object({ email: z.string().trim().email("Enter a valid email"), password: z.string().min(1, "Enter your password") });

function Auth() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    const form = new FormData(event.currentTarget);
    const parsed = signInSchema.safeParse({ email: form.get("email"), password: form.get("password") });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Check your sign-in details"); return; }
    setPending(true); setError("");
    const { error: signInError } = await supabase.auth.signInWithPassword(parsed.data);
    if (signInError) { setError("Email or password is incorrect. Please try again."); setPending(false); return; }
    const destination = search.redirect?.startsWith("/") && !search.redirect.startsWith("//") ? search.redirect : "/admin/leads";
    await navigate({ to: destination, replace: true });
  };

  const field = "mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";
  return (
    <section className="mx-auto flex min-h-[75svh] max-w-md items-center px-4 py-28 sm:px-6">
      <form onSubmit={onSubmit} noValidate aria-busy={pending} className="w-full rounded-[2rem] bg-card p-7 shadow-warm sm:p-9">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Team Access</p>
        <h1 className="mt-2 text-4xl">Admin sign in</h1>
        <p className="mt-3 text-sm text-muted-foreground">Sign in with the approved admin account to manage catering and franchise leads.</p>
        <label className="mt-6 block text-sm font-medium">Email<input name="email" type="email" autoComplete="email" className={field} /></label>
        <label className="mt-4 block text-sm font-medium">Password<input name="password" type="password" autoComplete="current-password" className={field} /></label>
        {error && <p role="alert" className="mt-4 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
        <button disabled={pending} className="mt-6 w-full rounded-full bg-fire py-4 font-semibold text-primary-foreground shadow-warm disabled:opacity-60">{pending ? "Signing in…" : "Sign in"}</button>
      </form>
    </section>
  );
}
