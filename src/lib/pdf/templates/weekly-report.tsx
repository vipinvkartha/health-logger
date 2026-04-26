import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { styles, colors } from "../styles";
import { format, parseISO } from "date-fns";

interface DaySummary {
  entry_date: string;
  weight: number | null;
  water_intake: number | null;
  sleep_from: string | null;
  sleep_to: string | null;
  sleep_quality: string | null;
  activity: string | null;
  food_count: number;
}

interface WeeklyReportProps {
  data: DaySummary[];
  fromDate: string;
  toDate: string;
}

function avg(values: (number | null)[]): string {
  const valid = values.filter((v): v is number => v !== null);
  if (valid.length === 0) return "-";
  return (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(1);
}

function journalTitle(userName: string): string {
  if (!userName) return "Weekly Report";
  return `${userName}'s Weekly Report`;
}

export default function WeeklyReportPDF({ data, fromDate, toDate, userName = "" }: WeeklyReportProps & { userName?: string }) {
  const from = format(parseISO(fromDate), "MMM d");
  const to = format(parseISO(toDate), "MMM d, yyyy");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.title}>{journalTitle(userName)}</Text>
        <Text style={styles.subtitle}>{from} — {to}</Text>

        {/* Summary cards */}
        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{data.length}</Text>
            <Text style={styles.summaryLabel}>Days Tracked</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{avg(data.map((d) => d.weight))}</Text>
            <Text style={styles.summaryLabel}>Avg Weight (kg)</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{avg(data.map((d) => d.water_intake))}</Text>
            <Text style={styles.summaryLabel}>Avg Water (L)</Text>
          </View>
        </View>

        {/* Daily breakdown table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Breakdown</Text>
          {/* Header */}
          <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: colors.sage }]}>
            <Text style={[styles.timeCell, { width: 80, fontFamily: "Helvetica-Bold", fontSize: 8, color: colors.sageDark }]}>DATE</Text>
            <Text style={[{ width: 50, fontFamily: "Helvetica-Bold", fontSize: 8, color: colors.sageDark }]}>WEIGHT</Text>
            <Text style={[{ width: 50, fontFamily: "Helvetica-Bold", fontSize: 8, color: colors.sageDark }]}>WATER</Text>
            <Text style={[{ width: 80, fontFamily: "Helvetica-Bold", fontSize: 8, color: colors.sageDark }]}>SLEEP</Text>
            <Text style={[{ width: 60, fontFamily: "Helvetica-Bold", fontSize: 8, color: colors.sageDark }]}>QUALITY</Text>
            <Text style={[{ flex: 1, fontFamily: "Helvetica-Bold", fontSize: 8, color: colors.sageDark }]}>ACTIVITY</Text>
          </View>
          {/* Rows */}
          {data.map((day, i) => (
            <View key={i} style={styles.row}>
              <Text style={[styles.timeCell, { width: 80 }]}>
                {format(parseISO(day.entry_date), "EEE, MMM d")}
              </Text>
              <Text style={{ width: 50, fontSize: 10 }}>{day.weight ?? "-"}</Text>
              <Text style={{ width: 50, fontSize: 10 }}>{day.water_intake ?? "-"}L</Text>
              <Text style={{ width: 80, fontSize: 9 }}>
                {day.sleep_from && day.sleep_to ? `${day.sleep_from}–${day.sleep_to}` : "-"}
              </Text>
              <Text style={{ width: 60, fontSize: 9, color: colors.brownLight }}>
                {day.sleep_quality || "-"}
              </Text>
              <Text style={{ flex: 1, fontSize: 9, color: colors.brownLight }}>
                {day.activity || "-"}
              </Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Health Journal — Weekly Report — Generated on {format(new Date(), "MMM d, yyyy")}
        </Text>
      </Page>
    </Document>
  );
}
