import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { adminLeadsQuery } from "@/lib/admin-leads";
import { markLeadContacted } from "@/lib/leads.functions";
import { pageHead } from "@/components/site/seo";
import { WhatsAppIcon } from "@/components/site/BrandIcons";

 type LeadSearch = { type?: "catering" | "franchise"; status?: "new" | "contacted" };

export const Route = createFileRoute("/_authenticated/admin/leads")({
  validateSearch: (search: Record<string, unknown>): LeadSearch => ({
    ...(search.type === "catering" || search.type === "franchise" ? { type: search.type } : {}),
    ...(search.status === "new" || search.status === "contacted" ? { status: search.status } : {}),
  }),
  loader: ({ context, search }) => context.queryClient.ensureQueryData(adminLeadsQuery({ leadType: search.type ?? "all", status: search.status ?? "all" })),
  head: () => ({ ...pageHead("Manage Leads", "Private Sharma's Kulche catering and franchise lead management."), meta: [...pageHead("Manage Leads", "Private Sharma's Kulche catering and franchise lead management.").meta, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminLeads,
  errorComponent: ({ error }) => <div className="mx-auto max-w-2xl px-4 py-32 text-center"><h1 className="text-4xl">Leads unavailable</h1><p className="mt-4 text-muted-foreground">{error.message}</p></div>,
});

function AdminLeads() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const filters = { leadType: search.type ?? "all", status: search.status ?? "all" } as const;
  const { data: leads } = useSuspenseQuery(adminLeadsQuery(filters));
  const mutation = useMutation({
    mutationFn: (id: string) => markLeadContacted({ data: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-leads"] }),
  });

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    await navigate({ to: "/auth", replace: true, search: { redirect: "/admin/leads" } });
  };
  const select = "rounded-full border border-input bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none";

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-28 sm:px-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Private Admin</p><h1 className="mt-2 text-4xl sm:text-5xl">Catering &amp; Franchise Leads</h1><p className="mt-2 text-sm text-muted-foreground">{leads.length} lead{leads.length === 1 ? "" : "s"} shown</p></div>
        <button onClick={signOut} className="inline-flex items-center justify-center gap-2 rounded-full border border-input bg-card px-5 py-3 text-sm font-semibold"><LogOut className="size-4" />Sign out</button>
      </div>
      <div className="mt-8 flex flex-wrap gap-3 rounded-3xl bg-card p-4 shadow-soft">
        <label className="text-sm font-medium">Lead type <span className="sr-only">filter</span>
          <select aria-label="Filter by lead type" className={`${select} ml-2`} value={filters.leadType} onChange={(event) => {
            const value = event.target.value;
            navigate({ to: "/admin/leads", search: { ...(value === "all" ? {} : { type: value as "catering" | "franchise" }), ...(search.status ? { status: search.status } : {}) } });
          }}><option value="all">All</option><option value="catering">Catering</option><option value="franchise">Franchise</option></select>
        </label>
        <label className="text-sm font-medium">Status
          <select aria-label="Filter by status" className={`${select} ml-2`} value={filters.status} onChange={(event) => {
            const value = event.target.value;
            navigate({ to: "/admin/leads", search: { ...(search.type ? { type: search.type } : {}), ...(value === "all" ? {} : { status: value as "new" | "contacted" }) } });
          }}><option value="all">All</option><option value="new">New</option><option value="contacted">Contacted</option></select>
        </label>
      </div>
      {mutation.isError && <p role="alert" className="mt-4 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">The lead could not be updated. Please try again.</p>}
      <div className="mt-6 overflow-x-auto rounded-[2rem] bg-card shadow-warm">
        <table className="w-full min-w-[1050px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-input text-xs uppercase tracking-wider text-muted-foreground"><th className="p-4">Received</th><th className="p-4">Type</th><th className="p-4">Customer</th><th className="p-4">Enquiry details</th><th className="p-4">Source</th><th className="p-4">Status</th><th className="p-4">Action</th></tr></thead>
          <tbody>{leads.map((lead) => <tr key={lead.id} className="border-b border-input/60 align-top last:border-0">
            <td className="p-4 whitespace-nowrap">{new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(new Date(lead.created_at))}</td>
            <td className="p-4 capitalize"><span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">{lead.lead_type}</span></td>
            <td className="p-4"><p className="font-semibold">{lead.name}</p><a className="mt-1 block text-secondary" href={`tel:+91${lead.phone}`}>+91 {lead.phone}</a>{lead.email && <a className="block text-xs text-muted-foreground" href={`mailto:${lead.email}`}>{lead.email}</a>}<a className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-veg" href={`https://wa.me/91${lead.phone}`} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="size-4" />WhatsApp</a></td>
            <td className="max-w-sm p-4 text-xs leading-6 text-muted-foreground">
              {lead.event_type && <p><strong className="text-foreground">Event:</strong> {lead.event_type} · {lead.guests} guests</p>}
              {lead.event_date && <p><strong className="text-foreground">Date:</strong> {lead.event_date}</p>}
              {lead.branch && <p><strong className="text-foreground">Branch:</strong> {lead.branch}</p>}
              {lead.city && <p><strong className="text-foreground">City:</strong> {lead.city}</p>}
              {lead.budget && <p><strong className="text-foreground">Budget:</strong> {lead.budget}</p>}
              {lead.has_property !== null && <p><strong className="text-foreground">Owns property:</strong> {lead.has_property ? "Yes" : "No"}</p>}
              {lead.experience && <p><strong className="text-foreground">Experience:</strong> {lead.experience}</p>}
              {lead.message && <p className="mt-1 whitespace-pre-wrap"><strong className="text-foreground">Message:</strong> {lead.message}</p>}
            </td>
            <td className="p-4 text-xs text-muted-foreground">{lead.source_page}</td>
            <td className="p-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${lead.status === "new" ? "bg-accent/20 text-foreground" : "bg-veg/10 text-veg"}`}>{lead.status}</span></td>
            <td className="p-4">{lead.status === "new" ? <button disabled={mutation.isPending} onClick={() => mutation.mutate(lead.id)} className="rounded-full bg-charcoal px-4 py-2 text-xs font-semibold text-charcoal-foreground disabled:opacity-50">Mark contacted</button> : <span className="text-xs text-muted-foreground">Done</span>}</td>
          </tr>)}</tbody>
        </table>
        {leads.length === 0 && <p className="p-12 text-center text-muted-foreground">No leads match these filters yet.</p>}
      </div>
    </section>
  );
}
