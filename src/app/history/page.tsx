import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AppShell from "@/components/ui/app-shell";
import CalendarView from "@/components/history/calendar-view";

export default async function HistoryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch all entry dates for the user
  const { data: entries } = await supabase
    .from("journal_entries")
    .select("entry_date, weight, sleep_quality, water_intake")
    .eq("user_id", user.id)
    .order("entry_date", { ascending: false });

  return (
    <AppShell>
      <div className="animate-section">
        <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-brown mb-6">
          Journal History
        </h1>
        <CalendarView entries={entries || []} />
      </div>
    </AppShell>
  );
}
