"use client";

import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { format, addDays, subDays, parseISO } from "date-fns";

interface JournalHeaderProps {
  date: string;
  weight: number | null;
  onWeightChange: (weight: number | null) => void;
}

export default function JournalHeader({ date, weight, onWeightChange }: JournalHeaderProps) {
  const prevDate = format(subDays(parseISO(date), 1), "yyyy-MM-dd");
  const nextDate = format(addDays(parseISO(date), 1), "yyyy-MM-dd");
  const isToday = date === format(new Date(), "yyyy-MM-dd");

  return (
    <div className="animate-section flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Link
            href={`/journal/${prevDate}`}
            className="p-1 text-brown-muted hover:text-brown transition-colors"
            title="Previous day"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4l-5 5 5 5"/>
            </svg>
          </Link>
          <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-brown">
            {formatDate(date)}
          </h1>
          <Link
            href={`/journal/${nextDate}`}
            className="p-1 text-brown-muted hover:text-brown transition-colors"
            title="Next day"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 4l5 5-5 5"/>
            </svg>
          </Link>
        </div>
        {isToday && (
          <span className="inline-block text-xs font-medium text-sage-dark bg-sage/15 px-2 py-0.5 rounded-full">
            Today
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-brown-muted font-medium">Weight</label>
        <div className="relative">
          <input
            type="number"
            step="0.1"
            min="0"
            max="300"
            value={weight ?? ""}
            onChange={(e) =>
              onWeightChange(e.target.value ? parseFloat(e.target.value) : null)
            }
            placeholder="--"
            className="w-24 px-3 py-1.5 bg-white/50 border border-rule rounded-lg text-sm text-brown text-right pr-8 placeholder:text-brown-muted/40"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-brown-muted">
            kg
          </span>
        </div>
      </div>
    </div>
  );
}
