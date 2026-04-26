import { format, parseISO } from "date-fns";

export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), "EEEE, MMMM d, yyyy");
}

export function formatDateShort(dateStr: string): string {
  return format(parseISO(dateStr), "MMM d, yyyy");
}

export function todayString(): string {
  return format(new Date(), "yyyy-MM-dd");
}

export function isValidDateString(str: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(str) && !isNaN(Date.parse(str));
}

/** Strip seconds from "HH:mm:ss" → "HH:mm". No-op if already "HH:mm". */
export function stripSeconds(time: string | null | undefined): string {
  if (!time) return "";
  return time.replace(/^(\d{2}:\d{2}):\d{2}$/, "$1");
}

/** Convert "HH:mm" or "HH:mm:ss" (24h) to "h:mm AM/PM" (12h) */
export function to12Hour(time: string | null | undefined): string {
  if (!time) return "-";
  const clean = stripSeconds(time);
  const parts = clean.split(":");
  if (parts.length < 2) return clean;
  let h = parseInt(parts[0], 10);
  const m = parts[1];
  if (isNaN(h)) return clean;
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}
