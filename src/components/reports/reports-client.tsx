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
  const [sharing, setSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function buildParams() {
    const params = new URLSearchParams({ type: reportType });
    if (reportType === "daily") {
      params.set("from", dailyDate);
    } else {
      params.set("from", fromDate);
      params.set("to", toDate);
    }
    return params;
  }

  function getFilename(res: Response) {
    return res.headers.get("Content-Disposition")?.split("filename=")[1]?.replace(/"/g, "") || "health-journal-report.png";
  }

  async function fetchPDF() {
    const res = await fetch(`/api/pdf?${buildParams().toString()}`);
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error || "Failed to generate report");
    }
    const blob = await res.blob();
    const filename = getFilename(res);
    return { blob, filename };
  }

  async function handleDownload() {
    setDownloading(true);
    setError(null);
    try {
      const { blob, filename } = await fetchPDF();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate report");
    } finally {
      setDownloading(false);
    }
  }

  async function handleShareWhatsApp() {
    setSharing(true);
    setError(null);
    try {
      const { blob, filename } = await fetchPDF();
      const file = new File([blob], filename, { type: "image/png" });

      // Use Web Share API if available (works on mobile with WhatsApp)
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "Daily Journal Report",
          text: "Here's my daily journal report",
          files: [file],
        });
      } else {
        // Fallback: download the file and open WhatsApp web
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Open WhatsApp with a message (user attaches the downloaded file manually)
        window.open(
          `https://wa.me/?text=${encodeURIComponent("Here's my health journal report")}`,
          "_blank"
        );
      }
    } catch (err) {
      // User cancelled share is not an error
      if (err instanceof Error && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Failed to share");
    } finally {
      setSharing(false);
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
            className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all cursor-pointer ${reportType === "daily"
                ? "bg-sage/15 border-sage/30 text-sage-dark"
                : "border-rule text-brown-muted hover:bg-cream-dark/50"
              }`}
          >
            <div className="text-base mb-0.5">Daily Entry</div>
            <div className="text-xs opacity-70">Single day journal as image</div>
          </button>
          <button
            onClick={() => setReportType("weekly")}
            className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all cursor-pointer ${reportType === "weekly"
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

      {/* Download & Share */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleDownload}
          disabled={downloading || sharing}
          className="px-6 py-2.5 bg-sage text-white rounded-lg font-medium hover:bg-sage-dark transition-colors disabled:opacity-50 cursor-pointer shadow-sm flex items-center gap-2"
        >
          {downloading ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="8" cy="8" r="6" strokeDasharray="30" strokeDashoffset="10" />
              </svg>
              Generating...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 2v8M5 7l3 3 3-3M3 12h10" />
              </svg>
              Download Image
            </>
          )}
        </button>

        <button
          onClick={handleShareWhatsApp}
          disabled={downloading || sharing}
          className="px-5 py-2.5 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#1DA851] transition-colors disabled:opacity-50 cursor-pointer shadow-sm flex items-center gap-2"
        >
          {sharing ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="8" cy="8" r="6" strokeDasharray="30" strokeDashoffset="10" />
              </svg>
              Sharing...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8.05 1.5C4.41 1.5 1.44 4.44 1.44 8.05c0 1.15.31 2.27.88 3.26L1.5 14.5l3.28-.86a6.56 6.56 0 003.27.87c3.63 0 6.58-2.95 6.58-6.56S11.68 1.5 8.05 1.5zm3.83 9.1c-.16.46-.96.88-1.33.94-.35.05-.8.08-1.29-.08a11.83 11.83 0 01-1.85-.68c-2.17-1.07-3.5-3.3-3.6-3.45-.1-.15-.87-1.16-.87-2.22s.55-1.57.74-1.79c.2-.21.43-.27.57-.27h.41c.13 0 .31-.05.49.37.18.43.62 1.51.67 1.62.05.1.09.23.02.37-.07.14-.1.23-.2.35-.11.13-.22.28-.32.38-.1.1-.22.22-.09.43.12.21.55.91 1.19 1.47.82.72 1.5.95 1.72 1.05.21.1.34.09.46-.05.13-.15.54-.63.68-.84.15-.22.29-.18.49-.11.2.07 1.26.6 1.48.7.21.11.36.16.41.25.05.09.05.53-.12.99z" />
              </svg>
              Share via WhatsApp
            </>
          )}
        </button>

        {error && <span className="text-sm text-terracotta-dark">{error}</span>}
      </div>
    </div>
  );
}
