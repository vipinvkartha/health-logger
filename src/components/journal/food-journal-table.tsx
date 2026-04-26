"use client";

import { FoodEntry } from "@/lib/types";
import FoodEntryRow from "./food-entry-row";

interface FoodJournalTableProps {
  entries: FoodEntry[];
  onChange: (entries: FoodEntry[]) => void;
}

export default function FoodJournalTable({ entries, onChange }: FoodJournalTableProps) {
  function handleEntryChange(index: number, field: keyof FoodEntry, value: string) {
    const updated = [...entries];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  }

  function handleRemove(index: number) {
    const updated = entries.filter((_, i) => i !== index);
    // Re-index sort_order
    updated.forEach((e, i) => (e.sort_order = i));
    onChange(updated);
  }

  function handleAdd() {
    onChange([
      ...entries,
      { title: "", entry_time: "", description: "", sort_order: entries.length },
    ]);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 px-2 pb-2 mb-1 border-b-2 border-sage/30">
        <span className="w-28 shrink-0 text-xs font-semibold text-sage-dark uppercase tracking-wider">
          Time
        </span>
        <div className="w-px h-4 bg-sage/30" />
        <span className="flex-1 text-xs font-semibold text-sage-dark uppercase tracking-wider">
          Food & Lifestyle Journal
        </span>
      </div>

      {/* Rows */}
      <div className="divide-y-0">
        {entries.map((entry, index) => (
          <FoodEntryRow
            key={index}
            entry={entry}
            index={index}
            onChange={handleEntryChange}
            onRemove={handleRemove}
            canRemove={entries.length > 1}
          />
        ))}
      </div>

      {/* Add row button */}
      <button
        type="button"
        onClick={handleAdd}
        className="mt-2 flex items-center gap-1.5 px-3 py-1.5 text-sm text-sage-dark hover:text-sage hover:bg-sage/10 rounded-lg transition-colors cursor-pointer"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M7 2v10M2 7h10" />
        </svg>
        Add entry
      </button>
    </div>
  );
}
