"use client";

import { FoodEntry } from "@/lib/types";

interface FoodEntryRowProps {
  entry: FoodEntry;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onChange: (index: number, field: keyof FoodEntry, value: string) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

export default function FoodEntryRow({
  entry,
  index,
  isFirst,
  isLast,
  onChange,
  onRemove,
  canRemove,
}: FoodEntryRowProps) {
  return (
    <div className="lined-row group flex items-center gap-3 py-2.5 px-2">
      {/* Time label or input */}
      <div className="w-24 shrink-0">
        {isFirst ? (
          <span className="text-xs font-medium text-brown-muted uppercase tracking-wider">
            Wake up
          </span>
        ) : isLast ? (
          <span className="text-xs font-medium text-brown-muted uppercase tracking-wider">
            Bed time
          </span>
        ) : null}
        <input
          type="time"
          value={entry.entry_time}
          onChange={(e) => onChange(index, "entry_time", e.target.value)}
          className="w-full bg-transparent border-none text-sm text-brown placeholder:text-brown-muted/40 p-0 focus:ring-0 focus:shadow-none"
        />
      </div>

      {/* Vertical divider */}
      <div className="w-px h-8 bg-rule self-center" />

      {/* Description */}
      <input
        type="text"
        value={entry.description}
        onChange={(e) => onChange(index, "description", e.target.value)}
        placeholder={isFirst ? "Morning routine, breakfast..." : isLast ? "Evening routine, dinner..." : "What did you eat or drink?"}
        className="flex-1 bg-transparent border-none text-sm text-brown placeholder:text-brown-muted/40 p-0 focus:ring-0 focus:shadow-none"
      />

      {/* Remove button */}
      {canRemove && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="opacity-0 group-hover:opacity-100 p-1 text-brown-muted hover:text-terracotta transition-all cursor-pointer"
          title="Remove row"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3 3l8 8M11 3l-8 8"/>
          </svg>
        </button>
      )}
    </div>
  );
}
