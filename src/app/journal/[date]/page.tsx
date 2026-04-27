import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { isValidDateString, stripSeconds } from "@/lib/utils";
import { emptyJournalEntry, JournalEntry } from "@/lib/types";
import AppShell from "@/components/ui/app-shell";
import JournalForm from "@/components/journal/journal-form";

export default async function JournalPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;

  if (!isValidDateString(date)) {
    redirect("/");
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch existing entry
  const { data: entry } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", user.id)
    .eq("entry_date", date)
    .single();

  let initialData: JournalEntry;

  if (entry) {
    const { data: foodEntries } = await supabase
      .from("food_entries")
      .select("*")
      .eq("journal_entry_id", entry.id)
      .order("sort_order", { ascending: true });

    initialData = {
      id: entry.id,
      user_id: entry.user_id,
      entry_date: entry.entry_date,
      weight: entry.weight,
      water_intake: entry.water_intake,
      alcohol_juices: entry.alcohol_juices || "",
      sugar: entry.sugar || "",
      sleep_from: stripSeconds(entry.sleep_from),
      sleep_to: stripSeconds(entry.sleep_to),
      sleep_quality: entry.sleep_quality || null,
      activity: entry.activity || "",
      stressors: entry.stressors || "",
      stress_reduction: entry.stress_reduction || "",
      quick_notes: entry.quick_notes || "",
      wake_up_time: stripSeconds(entry.wake_up_time),
      bed_time: stripSeconds(entry.bed_time),
      food_entries:
        foodEntries && foodEntries.length > 0
          ? foodEntries.map((fe) => ({
              id: fe.id,
              journal_entry_id: fe.journal_entry_id,
              title: fe.title || "",
              entry_time: stripSeconds(fe.entry_time),
              description: fe.description || "",
              hunger_level: fe.hunger_level || "",
              sort_order: fe.sort_order,
            }))
          : [{ title: "", entry_time: "", description: "", hunger_level: "", sort_order: 0 }],
    };
  } else {
    initialData = emptyJournalEntry(date);
  }

  const userName = user.user_metadata?.full_name || "";

  return (
    <AppShell>
      <JournalForm initialData={initialData} date={date} userName={userName} />
    </AppShell>
  );
}
