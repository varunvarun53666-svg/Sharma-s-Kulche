import { useEffect, useState } from "react";
import type { DayHours } from "@/data/branches";
import { isOpenAt, nowInIST } from "@/lib/hours";

export function OpenBadge({ hours }: { hours: DayHours[] }) {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const tick = () => setOpen(isOpenAt(hours, nowInIST()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [hours]);
  if (open === null) return <span className="inline-block h-6 w-20 rounded-full bg-muted" />;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${open ? "bg-veg text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
      <span className={`size-2 rounded-full bg-primary-foreground ${open ? "animate-pulse" : ""}`} />
      {open ? "Open now" : "Closed"}
    </span>
  );
}
