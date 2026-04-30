import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { dailyEntryMarkup, DailyEntryData } from "./templates/daily-entry";
import { weeklyReportMarkup, WeeklyDaySummary } from "./templates/weekly-report";

const WIDTH = 1200;
const DAILY_HEIGHT = 1600;
const WEEKLY_HEIGHT = 1400;
const SCALE = 3; // 3x for ultra-crisp output on all screens and WhatsApp

interface FontDef {
  name: string;
  url: string;
  weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  style: "normal";
}

const FONT_DEFS: FontDef[] = [
  {
    name: "sans",
    url: "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.woff",
    weight: 400,
    style: "normal",
  },
  {
    name: "sans",
    url: "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-600-normal.woff",
    weight: 600,
    style: "normal",
  },
  {
    name: "sans",
    url: "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.woff",
    weight: 700,
    style: "normal",
  },
];

let fontsCache: { name: string; data: ArrayBuffer; weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900; style: "normal" }[] | null = null;

async function getFonts() {
  if (!fontsCache) {
    fontsCache = await Promise.all(
      FONT_DEFS.map(async (def) => {
        const res = await fetch(def.url);
        const data = await res.arrayBuffer();
        return { name: def.name, data, weight: def.weight, style: def.style };
      })
    );
  }
  return fontsCache;
}

async function renderToImage(
  markup: React.ReactNode,
  width: number,
  height: number
): Promise<Buffer> {
  const fonts = await getFonts();

  const svg = await satori(markup as React.ReactElement, {
    width,
    height,
    fonts,
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width * SCALE },
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
