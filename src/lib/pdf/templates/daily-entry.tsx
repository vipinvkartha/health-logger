import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { styles, colors } from "../styles";
import { format, parseISO } from "date-fns";

interface FoodEntryData {
  title: string;
  entry_time: string;
  description: string;
}

interface DailyEntryData {
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

function journalTitle(userName: string): string {
  if (!userName) return "Health Journal";
  return `${userName}'s Health Journal`;
}

export default function DailyEntryPDF({ data, userName = "" }: { data: DailyEntryData; userName?: string }) {
  const dateFormatted = format(parseISO(data.entry_date), "EEEE, MMMM d, yyyy");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>{journalTitle(userName)}</Text>
            <Text style={styles.subtitle}>{dateFormatted}</Text>
          </View>
          {data.weight && (
            <View style={{ alignItems: "flex-end" as const }}>
              <Text style={styles.label}>Weight</Text>
              <Text style={styles.value}>{data.weight} kg</Text>
            </View>
          )}
        </View>

        {/* Food Journal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Food & Lifestyle Journal</Text>
          {/* Table header */}
          <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: colors.sage }]}>
            <Text style={[styles.timeCell, { width: 80, fontFamily: "Helvetica-Bold", fontSize: 8, color: colors.sageDark }]}>TITLE / TIME</Text>
            <Text style={[styles.foodCell, { fontFamily: "Helvetica-Bold", fontSize: 8, color: colors.sageDark }]}>DESCRIPTION</Text>
          </View>
          {/* Food entries */}
          {data.food_entries.map((entry, i) => (
            <View key={i} style={styles.row}>
              <View style={{ width: 80 }}>
                {entry.title && <Text style={{ fontSize: 8, color: colors.brownMuted, fontFamily: "Helvetica-Bold" }}>{entry.title}</Text>}
                <Text style={styles.timeCell}>{entry.entry_time || "--:--"}</Text>
              </View>
              <Text style={styles.foodCell}>{entry.description || "-"}</Text>
            </View>
          ))}
        </View>

        {/* Intake */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Intake</Text>
          <View style={styles.inlineRow}>
            <View style={styles.inlineItem}>
              <Text style={styles.label}>Water</Text>
              <Text style={styles.value}>{data.water_intake ?? "-"} L</Text>
            </View>
            <View style={styles.inlineItem}>
              <Text style={styles.label}>Alcohol / Juices</Text>
              <Text style={styles.value}>{data.alcohol_juices || "-"}</Text>
            </View>
            <View style={styles.inlineItem}>
              <Text style={styles.label}>Sugar</Text>
              <Text style={styles.value}>{data.sugar || "-"}</Text>
            </View>
          </View>
        </View>

        {/* Sleep */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sleep</Text>
          <View style={styles.inlineRow}>
            <View style={styles.inlineItem}>
              <Text style={styles.label}>Sleep Duration</Text>
              <Text style={styles.value}>{data.sleep_from || "-"} — {data.sleep_to || "-"}</Text>
            </View>
            <View style={styles.inlineItem}>
              <Text style={styles.label}>Quality</Text>
              <Text style={styles.value}>{data.sleep_quality || "-"}</Text>
            </View>
          </View>
        </View>

        {/* Activity */}
        {data.activity && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Activity / Exercises</Text>
            <Text style={styles.value}>{data.activity}</Text>
          </View>
        )}

        {/* Stress */}
        {(data.stressors || data.stress_reduction) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Stress</Text>
            <View style={styles.inlineRow}>
              {data.stressors && (
                <View style={styles.inlineItem}>
                  <Text style={styles.label}>Stressors</Text>
                  <Text style={styles.value}>{data.stressors}</Text>
                </View>
              )}
              {data.stress_reduction && (
                <View style={styles.inlineItem}>
                  <Text style={styles.label}>Reduction Practices</Text>
                  <Text style={styles.value}>{data.stress_reduction}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Quick Notes */}
        {data.quick_notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Notes</Text>
            <Text style={styles.value}>{data.quick_notes}</Text>
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>
          Health Journal — Generated on {format(new Date(), "MMM d, yyyy")}
        </Text>
      </Page>
    </Document>
  );
}
