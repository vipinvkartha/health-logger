import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateDailyImage, generateWeeklyImage } from "@/lib/report/generate";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userName: string = user.user_metadata?.full_name || "";
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type") || "daily";
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from) {
    return NextResponse.json({ error: "Missing 'from' parameter" }, { status: 400 });
  }

  if (type === "daily") {
    const { data: entry } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", user.id)
      .eq("entry_date", from)
      .single();

    if (!entry) {
      return NextResponse.json({ error: "No entry found for this date" }, { status: 404 });
    }

    const { data: foodEntries } = await supabase
      .from("food_entries")
      .select("*")
      .eq("journal_entry_id", entry.id)
      .order("sort_order", { ascending: true });

    const reportData = {
      ...entry,
      food_entries: (foodEntries || []).map((fe) => ({
        title: fe.title || "",
        entry_time: fe.entry_time || "",
        description: fe.description || "",
        hunger_level: fe.hunger_level || "",
      })),
    };

    const buffer = await generateDailyImage(reportData, userName);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="health-journal-${from}.png"`,
      },
    });
  }

  if (type === "weekly") {
    if (!to) {
      return NextResponse.json({ error: "Missing 'to' parameter" }, { status: 400 });
    }

    const { data: entries } = await supabase
      .from("journal_entries")
      .select("entry_date, weight, water_intake, sleep_from, sleep_to, sleep_quality, activity")
      .eq("user_id", user.id)
      .gte("entry_date", from)
      .lte("entry_date", to)
      .order("entry_date", { ascending: true });

    if (!entries || entries.length === 0) {
      return NextResponse.json({ error: "No entries found in this date range" }, { status: 404 });
    }

    const buffer = await generateWeeklyImage(entries, from, to, userName);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="health-journal-weekly-${from}-to-${to}.png"`,
      },
    });
  }

  return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 });
}
