"use client";

interface IntakeSectionProps {
  water: number | null;
  alcohol: string;
  sugar: string;
  onWaterChange: (val: number | null) => void;
  onAlcoholChange: (val: string) => void;
  onSugarChange: (val: string) => void;
}

export default function IntakeSection({
  water,
  alcohol,
  sugar,
  onWaterChange,
  onAlcoholChange,
  onSugarChange,
}: IntakeSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Water intake */}
      <div>
        <label className="block text-sm font-medium text-brown-light mb-2">
          Water
        </label>
        <div className="relative">
          <input
            type="number"
            step="0.25"
            min="0"
            value={water ?? ""}
            onChange={(e) =>
              onWaterChange(e.target.value ? parseFloat(e.target.value) : null)
            }
            placeholder="--"
            className="w-full px-3 py-2 bg-cream/50 border border-rule rounded-lg text-sm text-brown pr-8 placeholder:text-brown-muted/40"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-brown-muted">
            L
          </span>
        </div>
      </div>

      {/* Alcohol / Juices */}
      <div>
        <label className="block text-sm font-medium text-brown-light mb-2">
          Alcohol / Juices
        </label>
        <input
          type="text"
          value={alcohol}
          onChange={(e) => onAlcoholChange(e.target.value)}
          placeholder="e.g., 1 glass wine, orange juice"
          className="w-full px-3 py-2 bg-cream/50 border border-rule rounded-lg text-sm text-brown placeholder:text-brown-muted/40"
        />
      </div>

      {/* Sugar */}
      <div>
        <label className="block text-sm font-medium text-brown-light mb-2">
          Sugar
        </label>
        <input
          type="text"
          value={sugar}
          onChange={(e) => onSugarChange(e.target.value)}
          placeholder="e.g., 2 tsp in tea, dessert"
          className="w-full px-3 py-2 bg-cream/50 border border-rule rounded-lg text-sm text-brown placeholder:text-brown-muted/40"
        />
      </div>
    </div>
  );
}
