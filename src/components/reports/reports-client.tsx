"use client";

import { useState } from "react";
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import SectionCard from "@/components/ui/section-card";

interface ReportsClientProps {
  availableDates: string[];
}

type ReportType = "daily" | "weekly";

export default function ReportsClient({ availableDates }: ReportsClientProps) {
  const today = format(new Date(), "yyyy-MM-dd");
  const [reportType, setReportType] = useState<ReportType>("daily");
  const [dailyDate, setDailyDate] = useState(today);
  const [fromDate, setFromDate] = useState(format(startOfWeek(new Date()), "yyyy-MM-dd"));
  const [toDate, setToDate] = useState(format(endOfWeek(new Date()), "yyyy-MM-dd"));
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    setDownloading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ type: reportType });
      if (reportType === "daily") {
        params.set("from", dailyDate);
      } else {
        params.set("from", fromDate);
        params.set("to", toDate);
      }

      const res = await fetch(`/api/pdf?${params.toString()}`);

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to generate PDF");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = res.headers.get("Content-Disposition")?.split("filename=")[1]?.replace(/"/g, "") || "report.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate PDF");
    } finally {
      setDownloading(false);
    }
  }

  function setQuickRange(type: "this-week" | "last-week" | "this-month" | "last-month") {
    const now = new Date();
    switch (type) {
      case "this-week":
        setFromDate(format(startOfWeek(now), "yyyy-MM-dd"));
        setToDate(format(endOfWeek(now), "yyyy-MM-dd"));
        break;
      case "last-week":
        const lastWeek = subDays(startOfWeek(now), 1);
        setFromDate(format(startOfWeek(lastWeek), "yyyy-MM-dd"));
        setToDate(format(endOfWeek(lastWeek), "yyyy-MM-dd"));
        break;
      case "this-month":
        setFromDate(format(startOfMonth(now), "yyyy-MM-dd"));
        setToDate(format(endOfMonth(now), "yyyy-MM-dd"));
        break;
      case "last-month":
        const lastMonth = subDays(startOfMonth(now), 1);
        setFromDate(format(startOfMonth(lastMonth), "yyyy-MM-dd"));
        setToDate(format(endOfMonth(lastMonth), "yyyy-MM-dd"));
        break;
    }
    setReportType("weekly");
  }

  return (
    <div className="space-y-5">
      {/* Report type selection */}
      <SectionCard title="Report Type">
        <div className="flex gap-3">
          <button
            onClick={() => setReportType("daily")}
            className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
              reportType === "daily"
                ? "bg-sage/15 border-sage/30 text-sage-dark"
                : "border-rule text-brown-muted hover:bg-cream-dark/50"
            }`}
          >
            <div className="text-base mb-0.5">Daily Entry</div>
            <div className="text-xs opacity-70">Single day journal as PDF</div>
          </button>
          <button
            onClick={() => setReportType("weekly")}
            className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
              reportType === "weekly"
                ? "bg-sage/15 border-sage/30 text-sage-dark"
                : "border-rule text-brown-muted hover:bg-cream-dark/50"
            }`}
          >
            <div className="text-base mb-0.5">Summary Report</div>
            <div className="text-xs opacity-70">Weekly or monthly overview</div>
          </button>
        </div>
      </SectionCard>

      {/* Date selection */}
      <SectionCard title="Date Range" delay={100}>
        {reportType === "daily" ? (
          <div>
            <label className="block text-sm font-medium text-brown-light mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={dailyDate}
              onChange={(e) => setDailyDate(e.target.value)}
              className="px-3 py-2 bg-cream/50 border border-rule rounded-lg text-sm text-brown"
            />
            {availableDates.length > 0 && (
              <p className="text-xs text-brown-muted mt-2">
                You have {availableDates.length} journal entries recorded.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Quick ranges */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "This Week", key: "this-week" as const },
                { label: "Last Week", key: "last-week" as const },
                { label: "This Month", key: "this-month" as const },
                { label: "Last Month", key: "last-month" as const },
              ].map((range) => (
                <button
                  key={range.key}
                  onClick={() => setQuickRange(range.key)}
                  className="px-3 py-1.5 text-xs border border-rule rounded-lg text-brown-muted hover:bg-sage/10 hover:text-sage-dark hover:border-sage/30 transition-colors cursor-pointer"
                >
                  {range.label}
                </button>
              ))}
            </div>

            {/* Custom range */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-brown-light mb-1.5">
                  From
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full px-3 py-2 bg-cream/50 border border-rule rounded-lg text-sm text-brown"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-brown-light mb-1.5">
                  To
                </label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full px-3 py-2 bg-cream/50 border border-rule rounded-lg text-sm text-brown"
                />
              </div>
            </div>
          </div>
        )}
      </SectionCard>

      {/* Download */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="px-6 py-2.5 bg-sage text-white rounded-lg font-medium hover:bg-sage-dark transition-colors disabled:opacity-50 cursor-pointer shadow-sm flex items-center gap-2"
        >
          {downloading ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="8" cy="8" r="6" strokeDasharray="30" strokeDashoffset="10"/>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 2v8M5 7l3 3 3-3M3 12h10"/>
              </svg>
              Download PDF
            </>
          )}
        </button>
        {error && <span className="text-sm text-terracotta-dark">{error}</span>}
      </div>
    </div>
  );
}
