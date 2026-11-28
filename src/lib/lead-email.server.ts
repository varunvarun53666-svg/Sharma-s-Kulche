import type { LeadSubmission } from "./leads";

const OWNER_EMAIL = "varunvarun53666@gmail.com";

function escapeHtml(value: unknown) {
  return String(value ?? "—").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
  })[character] ?? character);
}

function row(label: string, value: unknown) {
  return `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${value ?? "—"}</td></tr>`;
}

export async function sendLeadNotification({
  apiKey,
  from,
  lead,
  leadId,
  createdAt,
}: {
  apiKey?: string;
  from: string;
  lead: LeadSubmission;
  leadId: string;
  createdAt: string;
}) {
  if (!apiKey) {
    console.warn(`[lead-email] RESEND_API_KEY is not configured; lead ${leadId} was saved without an email notification.`);
    return;
  }

  const label = lead.leadType === "catering" ? "Catering" : "Franchise";
  const phoneDigits = lead.phone;
  const whatsapp = `https://wa.me/91${phoneDigits}`;
  const received = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(new Date(createdAt));
  const catering = lead.leadType === "catering" ? lead : null;
  const franchise = lead.leadType === "franchise" ? lead : null;
  const html = `<!doctype html><html><body style="margin:0;background:#fff6e5;font-family:Arial,sans-serif;color:#1c1410"><div style="max-width:640px;margin:24px auto;background:#fff;border-radius:16px;overflow:hidden"><div style="background:#e8710a;padding:24px;color:#fff"><h1 style="margin:0;font-size:24px">New ${label} Lead</h1></div><table style="width:100%;border-collapse:collapse;font-size:14px">${[
    row("Lead type", escapeHtml(label)),
    row("Name", escapeHtml(lead.name)),
    row("Phone", `<a href="tel:+91${phoneDigits}">+91 ${phoneDigits}</a>`),
    row("Email", franchise ? `<a href="mailto:${escapeHtml(franchise.email)}">${escapeHtml(franchise.email)}</a>` : "—"),
    row("Event type", escapeHtml(catering?.eventType)),
    row("Guests", escapeHtml(catering?.guests)),
    row("Event date", escapeHtml(catering?.eventDate)),
    row("Preferred branch", escapeHtml(catering?.branch)),
    row("City / location", escapeHtml(franchise?.city)),
    row("Budget", escapeHtml(franchise?.budget)),
    row("Owns property", franchise ? (franchise.hasProperty === "yes" ? "Yes" : "No") : "—"),
    row("Experience", escapeHtml(franchise?.experience)),
    row("Message", escapeHtml(lead.message)),
    row("Source page", escapeHtml(lead.sourcePage)),
    row("Received", `${escapeHtml(received)} IST`),
  ].join("")}</table><div style="padding:20px"><a href="${whatsapp}" style="display:inline-block;background:#25d366;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:bold">Reply on WhatsApp</a></div></div></body></html>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [OWNER_EMAIL],
      subject: `New ${label} Lead: ${lead.name}`,
      html,
    }),
    redirect: "manual",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend notification failed [${response.status}]: ${body}`);
  }
}
