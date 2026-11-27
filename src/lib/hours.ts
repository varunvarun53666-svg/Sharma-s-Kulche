import type { DayHours } from "@/data/branches";

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
};

/** Is the branch open at `now`? Handles closing after midnight (e.g. 18:00–01:00). */
export function isOpenAt(hours: DayHours[], now: Date): boolean {
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const today = hours[day];
  if (today) {
    const o = toMin(today.open), c = toMin(today.close);
    if (c > o ? mins >= o && mins < c : mins >= o) return true;
  }
  const yest = hours[(day + 6) % 7];
  if (yest) {
    const o = toMin(yest.open), c = toMin(yest.close);
    if (c <= o && mins < c) return true;
  }
  return false;
}

/** Current time in Bengaluru (IST) regardless of visitor's timezone. */
export function nowInIST(): Date {
  const s = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  return new Date(s);
}
