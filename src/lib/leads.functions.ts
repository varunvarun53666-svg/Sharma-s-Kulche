import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import { leadSubmissionSchema } from "./leads";
import type { TablesInsert } from "@/integrations/supabase/types";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function rateLimitKey(ip: string, salt: string) {
  const bytes = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSubmissionSchema.parse(input))
  .handler(async ({ data }) => {
    // Honeypot submissions receive a neutral success response but are never stored.
    if (data.website) return { ok: true as const };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const serviceKey = process.env["SUPABASE_SERVICE_ROLE_KEY"]!;
    const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
    const keyHash = await rateLimitKey(ip, serviceKey);
    const { data: allowed, error: rateError } = await supabaseAdmin.rpc("consume_lead_rate_limit", {
      p_key_hash: keyHash,
      p_limit: 5,
      p_window_seconds: 600,
    });
    if (rateError) {
      console.error("[leads] Rate-limit check failed", rateError.message);
      throw new Error("We couldn't save your enquiry right now. Please try again shortly.");
    }
    if (!allowed) throw new Error("Too many enquiries from this connection. Please wait 10 minutes and try again.");

    const row: TablesInsert<"leads"> = {
      lead_type: data.leadType,
      name: data.name,
      phone: data.phone,
      email: data.leadType === "franchise" ? data.email : null,
      event_type: data.leadType === "catering" ? data.eventType : null,
      guests: data.leadType === "catering" ? data.guests : null,
      event_date: data.leadType === "catering" && data.eventDate ? data.eventDate : null,
      branch: data.leadType === "catering" ? data.branch : null,
      city: data.leadType === "franchise" ? data.city : null,
      budget: data.leadType === "franchise" ? data.budget : null,
      has_property: data.leadType === "franchise" ? data.hasProperty === "yes" : null,
      experience: data.leadType === "franchise" ? data.experience || null : null,
      message: data.message || null,
      source_page: data.sourcePage,
      status: "new",
    };
    const { data: saved, error } = await supabaseAdmin.from("leads").insert(row).select("id,created_at").single();
    if (error) {
      console.error("[leads] Insert failed", error.message);
      throw new Error("We couldn't save your enquiry. Please try again or contact us on WhatsApp.");
    }

    try {
      const { sendLeadNotification } = await import("./lead-email.server");
      await sendLeadNotification({
        apiKey: process.env["RESEND_API_KEY"],
        from: process.env["RESEND_FROM_EMAIL"] || "Sharma's Kulche <onboarding@resend.dev>",
        lead: data,
        leadId: saved.id,
        createdAt: saved.created_at,
      });
    } catch (emailError) {
      // The lead is already safe in the database; mail failures never block the visitor.
      console.error(`[lead-email] Lead ${saved.id} saved, but notification failed`, emailError);
    }
    return { ok: true as const };
  });

const filterSchema = z.object({
  leadType: z.enum(["all", "catering", "franchise"]).default("all"),
  status: z.enum(["all", "new", "contacted"]).default("all"),
});

export const getAdminLeads = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => filterSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (roleError || !isAdmin) throw new Error("This account does not have admin access.");

    let query = context.supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (data.leadType !== "all") query = query.eq("lead_type", data.leadType);
    if (data.status !== "all") query = query.eq("status", data.status);
    const { data: leads, error } = await query;
    if (error) throw new Error("Leads could not be loaded. Please try again.");
    return leads;
  });

export const markLeadContacted = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (roleError || !isAdmin) throw new Error("This account does not have admin access.");
    const { error } = await context.supabase.from("leads").update({ status: "contacted" }).eq("id", data.id);
    if (error) throw new Error("The lead could not be updated. Please try again.");
    return { ok: true as const };
  });
