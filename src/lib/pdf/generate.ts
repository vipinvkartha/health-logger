import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import DailyEntryPDF from "./templates/daily-entry";
import WeeklyReportPDF from "./templates/weekly-report";

export async function generateDailyPDF(data: Parameters<typeof DailyEntryPDF>[0]["data"]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return renderToBuffer(React.createElement(DailyEntryPDF, { data }) as any);
}

export async function generateWeeklyPDF(
  data: Parameters<typeof WeeklyReportPDF>[0]["data"],
  fromDate: string,
  toDate: string
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return renderToBuffer(React.createElement(WeeklyReportPDF, { data, fromDate, toDate }) as any);
}
