import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export type Review = { id: string; name: string; branch: string; rating: number; comment: string; created_at: string };

export const reviewsQuery = queryOptions({
  queryKey: ["reviews", "approved"],
  queryFn: async (): Promise<Review[]> => {
    const { data, error } = await supabase
      .from("reviews")
      .select("id,name,branch,rating,comment,created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(60);
    if (error) throw new Error(error.message);
    return data ?? [];
  },
});

export const reviewSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(60),
  branch: z.enum(["kammanahalli", "vv-puram", "bharathiya-city"], { message: "Pick a branch" }),
  rating: z.number().int().min(1, "Tap a star to rate").max(5),
  comment: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(600),
});

/** Spam guard: honeypot must be empty and the form must have been open at least 3 seconds. */
export function looksLikeSpam(honeypot: string, openedAt: number, now = Date.now()) {
  return honeypot.trim() !== "" || now - openedAt < 3000;
}
