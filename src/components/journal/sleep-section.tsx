"use client";

interface SleepSectionProps {
  sleepFrom: string;
  sleepTo: string;
  quality: string;
  onFromChange: (val: string) => void;
  onToChange: (val: string) => void;
  onQualityChange: (val: string) => void;
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
        <input
          type="text"
          value={quality}
          onChange={(e) => onQualityChange(e.target.value)}
          placeholder="e.g., Deep sleep, restless, woke up twice..."
          className="w-full px-3 py-2 bg-cream/50 border border-rule rounded-lg text-sm text-brown placeholder:text-brown-muted/40"
        />
      </div>
    </div>
  );
}
