"use client";

interface StressSectionProps {
  stressors: string;
  reduction: string;
  onStressorsChange: (val: string) => void;
  onReductionChange: (val: string) => void;
}

export default function StressSection({
  stressors,
  reduction,
  onStressorsChange,
  onReductionChange,
}: StressSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-brown-light mb-2">
          Stressors
        </label>
        <textarea
          value={stressors}
          onChange={(e) => onStressorsChange(e.target.value)}
          placeholder="What caused stress today?"
          rows={2}
          className="w-full px-3 py-2 bg-cream/50 border border-rule rounded-lg text-sm text-brown placeholder:text-brown-muted/40 resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-brown-light mb-2">
          Stress Reduction Practices
        </label>
        <textarea
          value={reduction}
          onChange={(e) => onReductionChange(e.target.value)}
          placeholder="Meditation, deep breathing, walk..."
          rows={2}
          className="w-full px-3 py-2 bg-cream/50 border border-rule rounded-lg text-sm text-brown placeholder:text-brown-muted/40 resize-none"
        />
      </div>
    </div>
  );
}
