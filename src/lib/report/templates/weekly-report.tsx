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
  brown: "#5C4033",
  brownLight: "#8B6F5E",
  brownMuted: "#A89282",
  sage: "#A3B18A",
  sageDark: "#7D8B6A",
  sageLight: "#C5D1AF",
  rule: "#E2D5C3",
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
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", backgroundColor: c.cream, padding: 48, fontFamily: "sans", color: c.brown }}>
      {/* Header */}
      <span style={{ fontSize: 40, fontWeight: 700, color: c.brown }}>{reportTitle(userName)}</span>
      <span style={{ fontSize: 18, color: c.brownMuted, marginTop: 4, marginBottom: 28 }}>{from} — {to}</span>

      {/* Summary cards */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, backgroundColor: c.white, borderRadius: 12, border: `1px solid ${c.rule}`, padding: 20 }}>
          <span style={{ fontSize: 36, fontWeight: 700, color: c.sage }}>{data.length}</span>
          <span style={{ fontSize: 13, color: c.brownMuted }}>Days Tracked</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, backgroundColor: c.white, borderRadius: 12, border: `1px solid ${c.rule}`, padding: 20 }}>
          <span style={{ fontSize: 36, fontWeight: 700, color: c.sage }}>{avg(data.map((d) => d.weight))}</span>
          <span style={{ fontSize: 13, color: c.brownMuted }}>Avg Weight (kg)</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, backgroundColor: c.white, borderRadius: 12, border: `1px solid ${c.rule}`, padding: 20 }}>
          <span style={{ fontSize: 36, fontWeight: 700, color: c.sage }}>{avg(data.map((d) => d.water_intake))}</span>
          <span style={{ fontSize: 13, color: c.brownMuted }}>Avg Water (L)</span>
        </div>
      </div>

      {/* Daily breakdown table */}
      <div style={{ display: "flex", flexDirection: "column", backgroundColor: c.white, borderRadius: 12, border: `1px solid ${c.rule}`, padding: 20 }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: c.brown, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${c.rule}` }}>Daily Breakdown</span>

        {/* Table header */}
        <div style={{ display: "flex", paddingBottom: 8, marginBottom: 4, borderBottom: `2px solid ${c.sage}` }}>
          <span style={{ width: 140, fontSize: 11, fontWeight: 700, color: c.sageDark, textTransform: "uppercase" }}>Date</span>
          <span style={{ width: 80, fontSize: 11, fontWeight: 700, color: c.sageDark, textTransform: "uppercase" }}>Weight</span>
          <span style={{ width: 80, fontSize: 11, fontWeight: 700, color: c.sageDark, textTransform: "uppercase" }}>Water</span>
          <span style={{ width: 140, fontSize: 11, fontWeight: 700, color: c.sageDark, textTransform: "uppercase" }}>Sleep</span>
          <span style={{ width: 80, fontSize: 11, fontWeight: 700, color: c.sageDark, textTransform: "uppercase" }}>Quality</span>
          <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: c.sageDark, textTransform: "uppercase" }}>Activity</span>
        </div>

        {/* Rows */}
        {data.map((day, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", paddingTop: 10, paddingBottom: 10, borderBottom: `0.5px solid ${c.rule}` }}>
            <span style={{ width: 140, fontSize: 14, color: c.brownLight }}>
              {format(parseISO(day.entry_date), "EEE, MMM d")}
            </span>
            <span style={{ width: 80, fontSize: 14, color: c.brown }}>{day.weight ?? "-"}</span>
            <span style={{ width: 80, fontSize: 14, color: c.brown }}>{day.water_intake ?? "-"}L</span>
            <span style={{ width: 140, fontSize: 13, color: c.brown }}>
              {day.sleep_from && day.sleep_to ? `${to12Hour(day.sleep_from)}–${to12Hour(day.sleep_to)}` : "-"}
            </span>
            <span style={{ width: 80, fontSize: 13, color: c.brownLight, textTransform: "capitalize" }}>
              {day.sleep_quality || "-"}
            </span>
            <span style={{ flex: 1, fontSize: 13, color: c.brownLight }}>
              {day.activity || "-"}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "auto", paddingTop: 16, borderTop: `0.5px solid ${c.rule}` }}>
        <span style={{ fontSize: 11, color: c.brownMuted }}>Weekly Report — Generated on {format(new Date(), "MMM d, yyyy")}</span>
      </div>
    </div>
  );
}
