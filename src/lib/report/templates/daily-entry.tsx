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
  brown: "#5C4033",
  brownLight: "#8B6F5E",
  brownMuted: "#A89282",
  sage: "#A3B18A",
  sageDark: "#7D8B6A",
  terracotta: "#C68B59",
  rule: "#E2D5C3",
};

function journalTitle(userName: string): string {
  return userName ? `${userName}'s Daily Journal` : "Daily Journal";
}

export function dailyEntryMarkup(data: DailyEntryData, userName: string): React.ReactNode {
  const dateFormatted = format(parseISO(data.entry_date), "EEEE, MMMM d, yyyy");

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", backgroundColor: c.cream, padding: 48, fontFamily: "sans", color: c.brown }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 40, fontWeight: 700, color: c.brown }}>{journalTitle(userName)}</span>
          <span style={{ fontSize: 18, color: c.brownMuted, marginTop: 4 }}>{dateFormatted}</span>
        </div>
        {data.weight && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span style={{ fontSize: 13, color: c.brownMuted }}>Weight</span>
            <span style={{ fontSize: 22, fontWeight: 600, color: c.brown }}>{data.weight} kg</span>
          </div>
        )}
      </div>

      {/* Food Journal */}
      <div style={{ display: "flex", flexDirection: "column", backgroundColor: c.white, borderRadius: 12, border: `1px solid ${c.rule}`, padding: 20, marginBottom: 16 }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: c.brown, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${c.rule}` }}>Food & Lifestyle Journal</span>
        {/* Table header */}
        <div style={{ display: "flex", paddingBottom: 6, marginBottom: 4, borderBottom: `2px solid ${c.sage}` }}>
          <span style={{ width: 120, fontSize: 11, fontWeight: 700, color: c.sageDark, textTransform: "uppercase" }}>Title / Time</span>
          <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: c.sageDark, textTransform: "uppercase" }}>Description</span>
          <span style={{ width: 100, fontSize: 11, fontWeight: 700, color: c.sageDark, textTransform: "uppercase" }}>Hunger</span>
        </div>
        {/* Rows */}
        {data.food_entries.map((entry, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", paddingTop: 8, paddingBottom: 8, borderBottom: `0.5px solid ${c.rule}` }}>
            <div style={{ display: "flex", flexDirection: "column", width: 120 }}>
              {entry.title && <span style={{ fontSize: 11, fontWeight: 700, color: c.brownMuted }}>{entry.title}</span>}
              <span style={{ fontSize: 13, color: c.brownLight }}>{to12Hour(entry.entry_time)}</span>
            </div>
            <span style={{ flex: 1, fontSize: 14, color: c.brown }}>{entry.description || "-"}</span>
            <span style={{ width: 100, fontSize: 13, color: c.brownLight }}>{entry.hunger_level || "-"}</span>
          </div>
        ))}
      </div>

      {/* Intake */}
      <div style={{ display: "flex", flexDirection: "column", backgroundColor: c.white, borderRadius: 12, border: `1px solid ${c.rule}`, padding: 20, marginBottom: 16 }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: c.brown, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${c.rule}` }}>Daily Intake</span>
        <div style={{ display: "flex", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <span style={{ fontSize: 12, color: c.brownMuted, marginBottom: 2 }}>Water</span>
            <span style={{ fontSize: 16, color: c.brown }}>{data.water_intake ?? "-"} L</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <span style={{ fontSize: 12, color: c.brownMuted, marginBottom: 2 }}>Alcohol / Juices</span>
            <span style={{ fontSize: 16, color: c.brown }}>{data.alcohol_juices || "-"}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <span style={{ fontSize: 12, color: c.brownMuted, marginBottom: 2 }}>Sugar</span>
            <span style={{ fontSize: 16, color: c.brown }}>{data.sugar || "-"}</span>
          </div>
        </div>
      </div>

      {/* Sleep */}
      <div style={{ display: "flex", flexDirection: "column", backgroundColor: c.white, borderRadius: 12, border: `1px solid ${c.rule}`, padding: 20, marginBottom: 16 }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: c.brown, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${c.rule}` }}>Sleep</span>
        <div style={{ display: "flex", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <span style={{ fontSize: 12, color: c.brownMuted, marginBottom: 2 }}>Sleep Duration</span>
            <span style={{ fontSize: 16, color: c.brown }}>{to12Hour(data.sleep_from)} — {to12Hour(data.sleep_to)}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <span style={{ fontSize: 12, color: c.brownMuted, marginBottom: 2 }}>Quality</span>
            <span style={{ fontSize: 16, color: c.brown, textTransform: "capitalize" }}>{data.sleep_quality || "-"}</span>
          </div>
        </div>
      </div>

      {/* Activity + Stress row */}
      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        {/* Activity */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, backgroundColor: c.white, borderRadius: 12, border: `1px solid ${c.rule}`, padding: 20 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: c.brown, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${c.rule}` }}>Activity / Exercises</span>
          <span style={{ fontSize: 14, color: c.brown }}>{data.activity || "-"}</span>
        </div>

        {/* Stress */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, backgroundColor: c.white, borderRadius: 12, border: `1px solid ${c.rule}`, padding: 20 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: c.brown, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${c.rule}` }}>Stress</span>
          <div style={{ display: "flex", gap: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <span style={{ fontSize: 12, color: c.brownMuted, marginBottom: 2 }}>Stressors</span>
              <span style={{ fontSize: 14, color: c.brown }}>{data.stressors || "-"}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <span style={{ fontSize: 12, color: c.brownMuted, marginBottom: 2 }}>Reduction</span>
              <span style={{ fontSize: 14, color: c.brown }}>{data.stress_reduction || "-"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Notes */}
      {data.quick_notes && (
        <div style={{ display: "flex", flexDirection: "column", backgroundColor: c.white, borderRadius: 12, border: `1px solid ${c.rule}`, padding: 20, marginBottom: 16 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: c.brown, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${c.rule}` }}>Quick Notes</span>
          <span style={{ fontSize: 14, color: c.brown }}>{data.quick_notes}</span>
        </div>
      )}

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "auto", paddingTop: 16, borderTop: `0.5px solid ${c.rule}` }}>
        <span style={{ fontSize: 11, color: c.brownMuted }}>Daily Journal — Generated on {format(new Date(), "MMM d, yyyy")}</span>
      </div>
    </div>
  );
}
