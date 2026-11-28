import { queryOptions } from "@tanstack/react-query";
import { getAdminLeads } from "./leads.functions";

export type LeadFilters = { leadType: "all" | "catering" | "franchise"; status: "all" | "new" | "contacted" };

export const adminLeadsQuery = (filters: LeadFilters) => queryOptions({
  queryKey: ["admin-leads", filters],
  queryFn: () => getAdminLeads({ data: filters }),
});
