"use client";

import { FoodEntry } from "@/lib/types";

interface FoodEntryRowProps {
  entry: FoodEntry;
  index: number;
  onChange: (index: number, field: keyof FoodEntry, value: string) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

export default function FoodEntryRow({
  entry,
  index,
  onChange,
  onRemove,
  canRemove,
}: FoodEntryRowProps) {
  return (
    <div className="lined-row group flex items-center gap-3 py-2.5 px-2">
      {/* Title */}
      <div className="w-28 shrink-0">
        <input
          type="text"
          value={entry.title}
          onChange={(e) => onChange(index, "title", e.target.value)}
          placeholder="e.g., Breakfast"
          className="w-full bg-transparent border-none text-xs font-medium text-brown-muted uppercase tracking-wider p-0 focus:ring-0 focus:shadow-none placeholder:text-brown-muted/30 placeholder:normal-case placeholder:tracking-normal placeholder:font-normal"
        />
        <input
          type="time"
          value={entry.entry_time}
          onChange={(e) => onChange(index, "entry_time", e.target.value)}
          className="w-full bg-transparent border-none text-sm text-brown placeholder:text-brown-muted/40 p-0 mt-0.5 focus:ring-0 focus:shadow-none"
        />
      </div>

      {/* Vertical divider */}
      <div className="w-px h-10 bg-rule self-center" />

      {/* Description */}
      <input
        type="text"
        value={entry.description}
        onChange={(e) => onChange(index, "description", e.target.value)}
        placeholder="What did you eat or drink?"
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
