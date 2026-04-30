import React from "react";
import { format, parseISO } from "date-fns";
import { to12Hour } from "@/lib/utils";

export interface WeeklyDaySummary {
  entry_date: string;
  weight: number | null;
  water_intake: number | null;
  sleep_from: string | null;
  sleep_to: string | null;
  sleep_quality: string | null;
  activity: string | null;
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

function avg(values: (number | null)[]): string {
  const valid = values.filter((v): v is number => v !== null);
  if (valid.length === 0) return "-";
  return (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(1);
}

function reportTitle(userName: string): string {
  return userName ? `${userName}'s Weekly Report` : "Weekly Report";
}

export function weeklyReportMarkup(
  data: WeeklyDaySummary[],
  fromDate: string,
  toDate: string,
  userName: string
): React.ReactNode {
  const from = format(parseISO(fromDate), "MMM d");
  const to = format(parseISO(toDate), "MMM d, yyyy");

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", backgroundColor: c.cream, padding: 52, fontFamily: "sans", color: c.brown }}>
      {/* Header */}
      <span style={{ fontSize: 44, fontWeight: 700, color: c.brown, letterSpacing: -0.5 }}>{reportTitle(userName)}</span>
      <span style={{ fontSize: 22, color: c.brownMuted, marginTop: 6, marginBottom: 32 }}>{from} — {to}</span>

      {/* Summary cards */}
      <div style={{ display: "flex", gap: 18, marginBottom: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, backgroundColor: c.white, borderRadius: 14, border: `1.5px solid ${c.rule}`, padding: 24 }}>
          <span style={{ fontSize: 42, fontWeight: 700, color: c.sage }}>{data.length}</span>
          <span style={{ fontSize: 15, color: c.brownMuted, fontWeight: 600 }}>Days Tracked</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, backgroundColor: c.white, borderRadius: 14, border: `1.5px solid ${c.rule}`, padding: 24 }}>
          <span style={{ fontSize: 42, fontWeight: 700, color: c.sage }}>{avg(data.map((d) => d.weight))}</span>
          <span style={{ fontSize: 15, color: c.brownMuted, fontWeight: 600 }}>Avg Weight (kg)</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, backgroundColor: c.white, borderRadius: 14, border: `1.5px solid ${c.rule}`, padding: 24 }}>
          <span style={{ fontSize: 42, fontWeight: 700, color: c.sage }}>{avg(data.map((d) => d.water_intake))}</span>
          <span style={{ fontSize: 15, color: c.brownMuted, fontWeight: 600 }}>Avg Water (L)</span>
        </div>
      </div>

      {/* Daily breakdown table */}
      <div style={{ display: "flex", flexDirection: "column", backgroundColor: c.white, borderRadius: 14, border: `1.5px solid ${c.rule}`, padding: 24 }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: c.brown, marginBottom: 14, paddingBottom: 10, borderBottom: `1.5px solid ${c.rule}` }}>Daily Breakdown</span>

        {/* Table header */}
        <div style={{ display: "flex", paddingBottom: 10, marginBottom: 6, borderBottom: `2.5px solid ${c.sage}` }}>
          <span style={{ width: 150, fontSize: 13, fontWeight: 700, color: c.sageDark, textTransform: "uppercase", letterSpacing: 0.5 }}>Date</span>
          <span style={{ width: 90, fontSize: 13, fontWeight: 700, color: c.sageDark, textTransform: "uppercase", letterSpacing: 0.5 }}>Weight</span>
          <span style={{ width: 90, fontSize: 13, fontWeight: 700, color: c.sageDark, textTransform: "uppercase", letterSpacing: 0.5 }}>Water</span>
          <span style={{ width: 160, fontSize: 13, fontWeight: 700, color: c.sageDark, textTransform: "uppercase", letterSpacing: 0.5 }}>Sleep</span>
          <span style={{ width: 90, fontSize: 13, fontWeight: 700, color: c.sageDark, textTransform: "uppercase", letterSpacing: 0.5 }}>Quality</span>
          <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: c.sageDark, textTransform: "uppercase", letterSpacing: 0.5 }}>Activity</span>
        </div>

        {/* Rows */}
        {data.map((day, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", paddingTop: 12, paddingBottom: 12, borderBottom: `1px solid ${c.rule}` }}>
            <span style={{ width: 150, fontSize: 16, color: c.brownLight, fontWeight: 600 }}>
              {format(parseISO(day.entry_date), "EEE, MMM d")}
            </span>
            <span style={{ width: 90, fontSize: 17, color: c.brown, fontWeight: 600 }}>{day.weight ?? "-"}</span>
            <span style={{ width: 90, fontSize: 17, color: c.brown }}>{day.water_intake ?? "-"}L</span>
            <span style={{ width: 160, fontSize: 15, color: c.brown }}>
              {day.sleep_from && day.sleep_to ? `${to12Hour(day.sleep_from)}–${to12Hour(day.sleep_to)}` : "-"}
            </span>
            <span style={{ width: 90, fontSize: 15, color: c.brownLight, textTransform: "capitalize", fontWeight: 600 }}>
              {day.sleep_quality || "-"}
            </span>
            <span style={{ flex: 1, fontSize: 15, color: c.brownLight }}>
              {day.activity || "-"}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "auto", paddingTop: 18, borderTop: `1px solid ${c.rule}` }}>
        <span style={{ fontSize: 13, color: c.brownMuted, fontWeight: 600 }}>Weekly Report — Generated on {format(new Date(), "MMM d, yyyy")}</span>
      </div>
    </div>
  );
}
