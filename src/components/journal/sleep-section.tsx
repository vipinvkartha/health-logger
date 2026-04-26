"use client";

import { SleepQuality } from "@/lib/types";

interface SleepSectionProps {
  sleepFrom: string;
  sleepTo: string;
  quality: SleepQuality | null;
  onFromChange: (val: string) => void;
  onToChange: (val: string) => void;
  onQualityChange: (val: SleepQuality) => void;
}

export default function SleepSection({
  sleepFrom,
  sleepTo,
  quality,
  onFromChange,
  onToChange,
  onQualityChange,
}: SleepSectionProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6">
      {/* Sleep Duration: From - To */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-brown-light mb-2">
          Sleep Duration
        </label>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-xs text-brown-muted mb-1">From</label>
            <input
              type="time"
              value={sleepFrom}
              onChange={(e) => onFromChange(e.target.value)}
              className="w-full px-3 py-2 bg-cream/50 border border-rule rounded-lg text-sm text-brown"
            />
          </div>
          <span className="text-brown-muted mt-5">—</span>
          <div className="flex-1">
            <label className="block text-xs text-brown-muted mb-1">To</label>
            <input
              type="time"
              value={sleepTo}
              onChange={(e) => onToChange(e.target.value)}
              className="w-full px-3 py-2 bg-cream/50 border border-rule rounded-lg text-sm text-brown"
            />
          </div>
        </div>
      </div>

      {/* Quality */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-brown-light mb-2">
          Quality
        </label>
        <div className="flex gap-2">
          {(["poor", "fair", "good"] as const).map((q) => {
            const colors = {
              poor: "bg-terracotta/20 text-terracotta-dark border-terracotta/30",
              fair: "bg-terracotta-light/20 text-brown border-terracotta-light/40",
              good: "bg-sage/20 text-sage-dark border-sage/30",
            };
            return (
              <button
                key={q}
                type="button"
                onClick={() => onQualityChange(q)}
                className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                  quality === q
                    ? colors[q]
                    : "bg-transparent border-rule text-brown-muted hover:bg-cream-dark/50"
                }`}
              >
                {q.charAt(0).toUpperCase() + q.slice(1)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
