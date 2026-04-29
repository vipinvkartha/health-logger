import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AppShell from "@/components/ui/app-shell";
import ReportsClient from "@/components/reports/reports-client";

export default async function ReportsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get date range of available entries
  const { data: entries } = await supabase
    .from("journal_entries")
    .select("entry_date")
    .eq("user_id", user.id)
    .order("entry_date", { ascending: true });

  const dates = (entries || []).map((e) => e.entry_date);

  return (
    <AppShell>
      <div className="animate-section">
        <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-brown mb-2">
          Reports
        </h1>
        <p className="text-brown-muted text-sm mb-6">
          Generate and download image reports from your journal data.
        </p>
        <ReportsClient availableDates={dates} />
      </div>
    </AppShell>
  );
}
