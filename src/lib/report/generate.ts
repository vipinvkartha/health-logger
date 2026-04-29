import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { dailyEntryMarkup, DailyEntryData } from "./templates/daily-entry";
import { weeklyReportMarkup, WeeklyDaySummary } from "./templates/weekly-report";

const WIDTH = 1200;
const DAILY_HEIGHT = 1600;
const WEEKLY_HEIGHT = 1400;

async function loadFont(): Promise<ArrayBuffer> {
  // Use Google Fonts API to load a font
  const res = await fetch(
    "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@400;600&display=swap"
  );
  const css = await res.text();

  // Extract the first font URL from the CSS
  const fontUrl = css.match(/src: url\(([^)]+)\)/)?.[1];
  if (!fontUrl) {
    // Fallback: fetch a known working font URL directly
    const fallback = await fetch(
      "https://cdn.jsdelivr.net/fontsource/fonts/source-sans-3@latest/latin-400-normal.woff"
    );
    return fallback.arrayBuffer();
  }

  const fontRes = await fetch(fontUrl);
  return fontRes.arrayBuffer();
}

let fontCache: ArrayBuffer | null = null;

async function getFont(): Promise<ArrayBuffer> {
  if (!fontCache) {
    fontCache = await loadFont();
  }
  return fontCache;
}

async function renderToImage(
  markup: React.ReactNode,
  width: number,
  height: number
): Promise<Buffer> {
  const fontData = await getFont();

  const svg = await satori(markup as React.ReactElement, {
    width,
    height,
    fonts: [
      {
        name: "sans",
        data: fontData,
        weight: 400,
        style: "normal",
      },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
  });
  const pngData = resvg.render();
  return Buffer.from(pngData.asPng());
}

export async function generateDailyImage(
  data: DailyEntryData,
  userName: string
): Promise<Buffer> {
  const markup = dailyEntryMarkup(data, userName);
  return renderToImage(markup, WIDTH, DAILY_HEIGHT);
}

export async function generateWeeklyImage(
  data: WeeklyDaySummary[],
  fromDate: string,
  toDate: string,
  userName: string
): Promise<Buffer> {
  const markup = weeklyReportMarkup(data, fromDate, toDate, userName);
  return renderToImage(markup, WIDTH, WEEKLY_HEIGHT);
}
