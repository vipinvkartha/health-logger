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
  const waterVal = water ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Water intake */}
      <div>
        <label className="block text-sm font-medium text-brown-light mb-2">
          Water
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onWaterChange(Math.max(0, waterVal - 0.25))}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-rule text-brown-muted hover:bg-sage/10 hover:text-sage-dark transition-colors cursor-pointer"
          >
            -
          </button>
          <div className="flex-1 text-center">
            <span className="text-lg font-medium text-brown">{waterVal.toFixed(2)}</span>
            <span className="text-xs text-brown-muted ml-1">L</span>
          </div>
          <button
            type="button"
            onClick={() => onWaterChange(waterVal + 0.25)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-rule text-brown-muted hover:bg-sage/10 hover:text-sage-dark transition-colors cursor-pointer"
          >
            +
          </button>
        </div>
        {/* Visual indicator */}
        <div className="mt-2 h-1.5 bg-cream-dark rounded-full overflow-hidden">
          <div
            className="h-full bg-sage/60 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (waterVal / 3) * 100)}%` }}
          />
        </div>
        <p className="text-xs text-brown-muted mt-1 text-center">Goal: 3L</p>
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
