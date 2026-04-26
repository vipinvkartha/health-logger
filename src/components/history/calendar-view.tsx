"use client";

import { useState } from "react";
import Link from "next/link";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addMonths,
  subMonths,
  parseISO,
  isToday,
} from "date-fns";

interface EntryData {
  entry_date: string;
  weight: number | null;
  sleep_quality: string | null;
  water_intake: number | null;
}

interface CalendarViewProps {
  entries: EntryData[];
}

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


export default function CalendarView({ entries }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPadding = getDay(monthStart);

  const entryMap = new Map(
    entries.map((e) => [e.entry_date, e])
  );

  return (
    <div className="paper-texture bg-white/50 rounded-xl border border-rule p-5 sm:p-6">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 text-brown-muted hover:text-brown transition-colors cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4l-6 6 6 6"/>
          </svg>
        </button>
        <h2 className="font-[family-name:var(--font-display)] text-xl text-brown">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 text-brown-muted hover:text-brown transition-colors cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 4l6 6-6 6"/>
          </svg>
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayLabels.map((label) => (
          <div
            key={label}
            className="text-center text-xs font-medium text-brown-muted uppercase tracking-wider py-1"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Padding for start of month */}
        {Array.from({ length: startPadding }).map((_, i) => (
          <div key={`pad-${i}`} className="aspect-square" />
        ))}

        {/* Days */}
        {days.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const entry = entryMap.get(dateStr);
          const hasEntry = !!entry;
          const today = isToday(day);

          return (
            <Link
              key={dateStr}
              href={`/journal/${dateStr}`}
              className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all relative group ${
                hasEntry
                  ? "bg-sage/20 hover:scale-105"
                  : "hover:bg-cream-dark/50"
              } ${today ? "ring-2 ring-sage/40" : ""}`}
            >
              <span
                className={`${
                  today
                    ? "font-bold text-sage-dark"
                    : hasEntry
                    ? "font-medium text-brown"
                    : "text-brown-muted"
                }`}
              >
                {format(day, "d")}
              </span>
              {hasEntry && (
                <div className="flex gap-0.5 mt-0.5">
                  <div className="w-1 h-1 rounded-full bg-sage" />
                </div>
              )}

              {/* Tooltip on hover */}
              {hasEntry && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-brown text-cream text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                  {entry.weight && <span>{entry.weight}kg</span>}
                  {entry.water_intake && <span> | {entry.water_intake}L</span>}
                  {entry.sleep_quality && <span> | {entry.sleep_quality}</span>}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-rule flex flex-wrap gap-4 text-xs text-brown-muted">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-sage/20" />
          <span>Has entry</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded ring-2 ring-sage/40" />
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}
