import React from "react";
import { format, parseISO } from "date-fns";
import { to12Hour } from "@/lib/utils";

export interface FoodEntryData {
  title: string;
  entry_time: string;
  description: string;
  hunger_level: string;
}

export interface DailyEntryData {
  entry_date: string;
  weight: number | null;
  water_intake: number | null;
  alcohol_juices: string | null;
  sugar: string | null;
  sleep_from: string | null;
  sleep_to: string | null;
  sleep_quality: string | null;
  activity: string | null;
  stressors: string | null;
  stress_reduction: string | null;
  quick_notes: string | null;
  wake_up_time: string | null;
  bed_time: string | null;
  food_entries: FoodEntryData[];
}

const c = {
  cream: "#FDF6EC",
  white: "#FFFFFF",
  brown: "#3D2B1F",
  brownLight: "#6B5344",
  brownMuted: "#8C7A6B",
  sage: "#A3B18A",
  sageDark: "#6B7D55",
  rule: "#D9CCBC",
};

function journalTitle(userName: string): string {
  return userName ? `${userName}'s Daily Journal` : "Daily Journal";
}

export function dailyEntryMarkup(data: DailyEntryData, userName: string): React.ReactNode {
  const dateFormatted = format(parseISO(data.entry_date), "EEEE, MMMM d, yyyy");

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", backgroundColor: c.cream, padding: 52, fontFamily: "sans", color: c.brown }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 44, fontWeight: 700, color: c.brown, letterSpacing: -0.5 }}>{journalTitle(userName)}</span>
          <span style={{ fontSize: 22, color: c.brownMuted, marginTop: 6 }}>{dateFormatted}</span>
        </div>
        {data.weight && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span style={{ fontSize: 15, color: c.brownMuted, fontWeight: 600 }}>Weight</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: c.brown }}>{data.weight} kg</span>
          </div>
        )}
      </div>

      {/* Food Journal */}
      <div style={{ display: "flex", flexDirection: "column", backgroundColor: c.white, borderRadius: 14, border: `1.5px solid ${c.rule}`, padding: 24, marginBottom: 18 }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: c.brown, marginBottom: 14, paddingBottom: 10, borderBottom: `1.5px solid ${c.rule}` }}>Food & Lifestyle Journal</span>
        {/* Table header */}
        <div style={{ display: "flex", paddingBottom: 8, marginBottom: 6, borderBottom: `2.5px solid ${c.sage}` }}>
          <span style={{ width: 140, fontSize: 13, fontWeight: 700, color: c.sageDark, textTransform: "uppercase", letterSpacing: 0.5 }}>Title / Time</span>
          <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: c.sageDark, textTransform: "uppercase", letterSpacing: 0.5 }}>Description</span>
          <span style={{ width: 110, fontSize: 13, fontWeight: 700, color: c.sageDark, textTransform: "uppercase", letterSpacing: 0.5 }}>Hunger</span>
        </div>
        {/* Rows */}
        {data.food_entries.map((entry, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", paddingTop: 10, paddingBottom: 10, borderBottom: `1px solid ${c.rule}` }}>
            <div style={{ display: "flex", flexDirection: "column", width: 140 }}>
              {entry.title && <span style={{ fontSize: 13, fontWeight: 700, color: c.brownMuted }}>{entry.title}</span>}
              <span style={{ fontSize: 16, color: c.brownLight, fontWeight: 600 }}>{to12Hour(entry.entry_time)}</span>
            </div>
            <span style={{ flex: 1, fontSize: 17, color: c.brown }}>{entry.description || "-"}</span>
            <span style={{ width: 110, fontSize: 16, color: c.brownLight }}>{entry.hunger_level || "-"}</span>
          </div>
        ))}
      </div>

      {/* Intake */}
      <div style={{ display: "flex", flexDirection: "column", backgroundColor: c.white, borderRadius: 14, border: `1.5px solid ${c.rule}`, padding: 24, marginBottom: 18 }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: c.brown, marginBottom: 14, paddingBottom: 10, borderBottom: `1.5px solid ${c.rule}` }}>Daily Intake</span>
        <div style={{ display: "flex", gap: 36 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <span style={{ fontSize: 14, color: c.brownMuted, marginBottom: 4, fontWeight: 600 }}>Water</span>
            <span style={{ fontSize: 20, color: c.brown, fontWeight: 600 }}>{data.water_intake ?? "-"} L</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <span style={{ fontSize: 14, color: c.brownMuted, marginBottom: 4, fontWeight: 600 }}>Alcohol / Juices</span>
            <span style={{ fontSize: 20, color: c.brown }}>{data.alcohol_juices || "-"}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <span style={{ fontSize: 14, color: c.brownMuted, marginBottom: 4, fontWeight: 600 }}>Sugar</span>
            <span style={{ fontSize: 20, color: c.brown }}>{data.sugar || "-"}</span>
          </div>
        </div>
      </div>

      {/* Sleep */}
      <div style={{ display: "flex", flexDirection: "column", backgroundColor: c.white, borderRadius: 14, border: `1.5px solid ${c.rule}`, padding: 24, marginBottom: 18 }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: c.brown, marginBottom: 14, paddingBottom: 10, borderBottom: `1.5px solid ${c.rule}` }}>Sleep</span>
        <div style={{ display: "flex", gap: 36 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <span style={{ fontSize: 14, color: c.brownMuted, marginBottom: 4, fontWeight: 600 }}>Sleep Duration</span>
            <span style={{ fontSize: 20, color: c.brown, fontWeight: 600 }}>{to12Hour(data.sleep_from)} — {to12Hour(data.sleep_to)}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <span style={{ fontSize: 14, color: c.brownMuted, marginBottom: 4, fontWeight: 600 }}>Quality</span>
            <span style={{ fontSize: 20, color: c.brown, fontWeight: 600, textTransform: "capitalize" }}>{data.sleep_quality || "-"}</span>
          </div>
        </div>
      </div>

      {/* Activity + Stress row */}
      <div style={{ display: "flex", gap: 18, marginBottom: 18 }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, backgroundColor: c.white, borderRadius: 14, border: `1.5px solid ${c.rule}`, padding: 24 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: c.brown, marginBottom: 14, paddingBottom: 10, borderBottom: `1.5px solid ${c.rule}` }}>Activity / Exercises</span>
          <span style={{ fontSize: 17, color: c.brown }}>{data.activity || "-"}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1, backgroundColor: c.white, borderRadius: 14, border: `1.5px solid ${c.rule}`, padding: 24 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: c.brown, marginBottom: 14, paddingBottom: 10, borderBottom: `1.5px solid ${c.rule}` }}>Stress</span>
          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <span style={{ fontSize: 14, color: c.brownMuted, marginBottom: 4, fontWeight: 600 }}>Stressors</span>
              <span style={{ fontSize: 17, color: c.brown }}>{data.stressors || "-"}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <span style={{ fontSize: 14, color: c.brownMuted, marginBottom: 4, fontWeight: 600 }}>Reduction</span>
              <span style={{ fontSize: 17, color: c.brown }}>{data.stress_reduction || "-"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Notes */}
      {data.quick_notes && (
        <div style={{ display: "flex", flexDirection: "column", backgroundColor: c.white, borderRadius: 14, border: `1.5px solid ${c.rule}`, padding: 24, marginBottom: 18 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: c.brown, marginBottom: 14, paddingBottom: 10, borderBottom: `1.5px solid ${c.rule}` }}>Quick Notes</span>
          <span style={{ fontSize: 17, color: c.brown }}>{data.quick_notes}</span>
        </div>
      )}

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "auto", paddingTop: 18, borderTop: `1px solid ${c.rule}` }}>
        <span style={{ fontSize: 13, color: c.brownMuted, fontWeight: 600 }}>Daily Journal — Generated on {format(new Date(), "MMM d, yyyy")}</span>
      </div>
    </div>
  );
}
