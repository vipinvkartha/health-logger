"use client";

interface ActivitySectionProps {
  value: string;
  onChange: (val: string) => void;
}

export default function ActivitySection({ value, onChange }: ActivitySectionProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-brown-light mb-2">
        Activity / Exercises
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., 30 min walk, yoga, gym session..."
        rows={2}
        className="w-full px-3 py-2 bg-cream/50 border border-rule rounded-lg text-sm text-brown placeholder:text-brown-muted/40 resize-none"
      />
    </div>
  );
}
