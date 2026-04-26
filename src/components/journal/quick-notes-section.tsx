"use client";

interface QuickNotesSectionProps {
  value: string;
  onChange: (val: string) => void;
}

export default function QuickNotesSection({ value, onChange }: QuickNotesSectionProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-brown-light mb-2">
        Quick Notes
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Any other notes for the day..."
        rows={3}
        className="w-full px-3 py-2 bg-cream/50 border border-rule rounded-lg text-sm text-brown placeholder:text-brown-muted/40 resize-none"
      />
    </div>
  );
}
