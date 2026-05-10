"use client";

import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format, addDays, subDays, parseISO } from "date-fns";

interface JournalHeaderProps {
  date: string;
  weight: number | null;
  onWeightChange: (weight: number | null) => void;
  userName?: string;
}

export default function JournalHeader({ date, weight, onWeightChange, userName }: JournalHeaderProps) {
  const prevDate = format(subDays(parseISO(date), 1), "yyyy-MM-dd");
  const nextDate = format(addDays(parseISO(date), 1), "yyyy-MM-dd");
  const isToday = date === format(new Date(), "yyyy-MM-dd");
  const router = useRouter();

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.value;
    if (selected && selected !== date) {
      router.push(`/journal/${selected}`);
    }
  }

  return (
    <div className="animate-section mb-6">
      {/* Welcome greeting */}
      {userName && (
        <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-brown mb-4">
          Welcome, <span className="text-sage-dark">{userName}</span>
        </h1>
      )}

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href={`/journal/${prevDate}`}
              className="p-1.5 text-brown-muted hover:text-brown transition-colors"
              title="Previous day"
            >
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4l-5 5 5 5"/>
              </svg>
            </Link>

            {/* Date with overlaid native date input for reliable mobile support */}
            <label className="relative cursor-pointer group">
              <span className="font-[family-name:var(--font-display)] text-xl sm:text-2xl text-brown group-hover:text-sage-dark transition-colors">
                {formatDate(date)}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block ml-2 mb-0.5 text-brown-muted opacity-50 group-hover:opacity-100 transition-opacity"
              >
                <rect x="2" y="3" width="12" height="11" rx="1.5"/>
                <path d="M5 1v3M11 1v3M2 7h12"/>
              </svg>
              {/* Native date input stretched over the label — invisible but tappable */}
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                style={{ fontSize: "16px" }}
              />
            </label>

            <Link
              href={`/journal/${nextDate}`}
              className="p-1.5 text-brown-muted hover:text-brown transition-colors"
              title="Next day"
            >
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    </div>
  );
}
