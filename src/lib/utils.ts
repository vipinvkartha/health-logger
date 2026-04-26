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
