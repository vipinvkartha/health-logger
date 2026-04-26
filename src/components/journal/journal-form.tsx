"use client";

import { useState, useCallback } from "react";
import { JournalEntry, FoodEntry } from "@/lib/types";
import SectionCard from "@/components/ui/section-card";
import JournalHeader from "./journal-header";
import FoodJournalTable from "./food-journal-table";
import IntakeSection from "./intake-section";
import SleepSection from "./sleep-section";
import ActivitySection from "./activity-section";
import StressSection from "./stress-section";
import QuickNotesSection from "./quick-notes-section";

interface JournalFormProps {
  initialData: JournalEntry;
  date: string;
}

export default function JournalForm({ initialData, date }: JournalFormProps) {
  const [data, setData] = useState<JournalEntry>(initialData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(
    <K extends keyof JournalEntry>(field: K, value: JournalEntry[K]) => {
      setData((prev) => ({ ...prev, [field]: value }));
      setSaved(false);
    },
    []
  );

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/journal/${date}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to save");
      }
      const saved = await res.json();
      setData((prev) => ({ ...prev, id: saved.id }));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <JournalHeader
        date={date}
        weight={data.weight}
        onWeightChange={(v) => update("weight", v)}
      />

      <div className="space-y-5">
        {/* Food & Lifestyle Journal */}
        <SectionCard title="Food & Lifestyle Journal" delay={50}>
          <FoodJournalTable
            entries={data.food_entries}
            onChange={(entries: FoodEntry[]) => update("food_entries", entries)}
          />
        </SectionCard>

        {/* Intake */}
        <SectionCard title="Daily Intake" delay={100}>
          <IntakeSection
            water={data.water_intake}
            alcohol={data.alcohol_juices}
            sugar={data.sugar}
            onWaterChange={(v) => update("water_intake", v)}
            onAlcoholChange={(v) => update("alcohol_juices", v)}
            onSugarChange={(v) => update("sugar", v)}
          />
        </SectionCard>

        {/* Sleep */}
        <SectionCard title="Sleep" delay={150}>
          <SleepSection
            sleepFrom={data.sleep_from}
            sleepTo={data.sleep_to}
            quality={data.sleep_quality}
            onFromChange={(v) => update("sleep_from", v)}
            onToChange={(v) => update("sleep_to", v)}
            onQualityChange={(v) => update("sleep_quality", v)}
          />
        </SectionCard>

        {/* Activity */}
        <SectionCard title="Activity / Exercises" delay={200}>
          <ActivitySection
            value={data.activity}
            onChange={(v) => update("activity", v)}
          />
        </SectionCard>

        {/* Stress */}
        <SectionCard title="Stress" delay={250}>
          <StressSection
            stressors={data.stressors}
            reduction={data.stress_reduction}
            onStressorsChange={(v) => update("stressors", v)}
            onReductionChange={(v) => update("stress_reduction", v)}
          />
        </SectionCard>

        {/* Quick Notes */}
        <SectionCard title="Quick Notes" delay={300}>
          <QuickNotesSection
            value={data.quick_notes}
            onChange={(v) => update("quick_notes", v)}
          />
        </SectionCard>
      </div>

      {/* Save bar */}
      <div className="sticky bottom-0 mt-6 py-4 bg-cream/80 backdrop-blur-md border-t border-rule -mx-4 px-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="text-sm">
            {error && <span className="text-terracotta-dark">{error}</span>}
            {saved && (
              <span className="text-sage-dark flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8l3.5 3.5L13 5"/>
                </svg>
                Saved
              </span>
            )}
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-sage text-white rounded-lg font-medium hover:bg-sage-dark transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
          >
            {saving ? "Saving..." : "Save Entry"}
          </button>
        </div>
      </div>
    </div>
  );
}
