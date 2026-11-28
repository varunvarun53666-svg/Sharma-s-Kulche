import { z } from "zod";
import type { Tables } from "@/integrations/supabase/types";

export const EVENT_TYPES = ["Office / Corporate", "Wedding", "Birthday / Party", "Other Event"] as const;
export const BRANCH_OPTIONS = ["Kammanahalli", "VV Puram", "Bharathiya City", "Not sure"] as const;
// Replace these marked ranges with the owner's real investment bands.
export const BUDGET_OPTIONS = ["[BUDGET RANGE 1]", "[BUDGET RANGE 2]", "[BUDGET RANGE 3]", "Not sure yet"] as const;

const phone = z.string().trim().regex(/^[0-9]{10}$/, "Enter a valid 10-digit phone number");
const optionalText = (max: number) => z.string().trim().max(max).optional();
const common = {
  name: z.string().trim().min(2, "Please enter your name").max(60, "Name must be under 60 characters"),
  phone,
  message: optionalText(1200),
  sourcePage: z.string().trim().min(1).max(200),
  website: z.string().max(200).optional(),
};

export const cateringLeadSchema = z.object({
  leadType: z.literal("catering"),
  ...common,
  eventType: z.enum(EVENT_TYPES, { message: "Choose an event type" }),
  guests: z.coerce.number({ message: "Enter the approximate number of guests" }).int().min(1, "Enter at least 1 guest").max(100000, "Please contact us directly for very large events"),
  eventDate: z.string().trim().max(10).optional().refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), "Choose a valid event date"),
  branch: z.enum(BRANCH_OPTIONS, { message: "Choose a preferred branch" }),
});

export const franchiseLeadSchema = z.object({
  leadType: z.literal("franchise"),
  ...common,
  email: z.string().trim().email("Enter a valid email address").max(255),
  city: z.string().trim().min(2, "Enter your city or preferred location").max(120),
  budget: z.enum(BUDGET_OPTIONS, { message: "Choose an investment budget" }),
  hasProperty: z.enum(["yes", "no"], { message: "Tell us whether you own a property" }),
  experience: optionalText(1000),
});

export const leadSubmissionSchema = z.discriminatedUnion("leadType", [cateringLeadSchema, franchiseLeadSchema]);
export type CateringLeadInput = z.infer<typeof cateringLeadSchema>;
export type FranchiseLeadInput = z.infer<typeof franchiseLeadSchema>;
export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;
export type Lead = Tables<"leads">;

export function validationMessages(error: z.ZodError) {
  return Object.fromEntries(error.issues.map((issue) => [String(issue.path[0]), issue.message]));
}
