import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  const { date } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch journal entry
  const { data: entry } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", user.id)
    .eq("entry_date", date)
    .single();

  if (!entry) {
    return NextResponse.json(null);
  }

  // Fetch food entries
  const { data: foodEntries } = await supabase
    .from("food_entries")
    .select("*")
    .eq("journal_entry_id", entry.id)
    .order("sort_order", { ascending: true });

  return NextResponse.json({
    ...entry,
    food_entries: foodEntries || [],
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  const { date } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { food_entries, id, user_id, created_at, updated_at, ...journalData } = body;

  // Upsert journal entry
  const { data: entry, error: entryError } = await supabase
    .from("journal_entries")
    .upsert(
      {
        ...journalData,
        user_id: user.id,
        entry_date: date,
        // Convert empty strings to null for time fields
        wake_up_time: journalData.wake_up_time || null,
        bed_time: journalData.bed_time || null,
        sleep_from: journalData.sleep_from || null,
        sleep_to: journalData.sleep_to || null,
        sleep_quality: journalData.sleep_quality || null,
      },
      { onConflict: "user_id,entry_date" }
    )
    .select()
    .single();

  if (entryError) {
    return NextResponse.json({ error: entryError.message }, { status: 500 });
  }

  // Delete existing food entries and re-insert
  await supabase
    .from("food_entries")
    .delete()
    .eq("journal_entry_id", entry.id);

  // Insert new food entries (filter out empty ones)
  const validFoodEntries = (food_entries || []).filter(
    (fe: { entry_time: string; description: string }) =>
      fe.entry_time || fe.description
  );

  if (validFoodEntries.length > 0) {
    const { error: foodError } = await supabase.from("food_entries").insert(
      validFoodEntries.map(
        (fe: { entry_time: string; description: string; sort_order: number }, i: number) => ({
          journal_entry_id: entry.id,
          entry_time: fe.entry_time || "00:00",
          description: fe.description || "",
          sort_order: fe.sort_order ?? i,
        })
      )
    );

    if (foodError) {
      return NextResponse.json({ error: foodError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ id: entry.id });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  const { date } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase
    .from("journal_entries")
    .delete()
    .eq("user_id", user.id)
    .eq("entry_date", date);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
