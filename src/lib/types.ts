export type SleepQuality = "poor" | "fair" | "good";

export interface FoodEntry {
  id?: string;
  journal_entry_id?: string;
  title: string;
  entry_time: string; // HH:mm format
  description: string;
  hunger_level: string;
  sort_order: number;
}

export interface JournalEntry {
  id?: string;
  user_id?: string;
  entry_date: string; // YYYY-MM-DD format
  weight: number | null;
  water_intake: number | null; // litres
  alcohol_juices: string;
  sugar: string;
  sleep_from: string; // HH:mm format
  sleep_to: string; // HH:mm format
  sleep_quality: SleepQuality | null;
  activity: string;
  stressors: string;
  stress_reduction: string;
  quick_notes: string;
  wake_up_time: string; // HH:mm format
  bed_time: string; // HH:mm format
  food_entries: FoodEntry[];
}

export interface JournalEntryDB {
  id: string;
  user_id: string;
  entry_date: string;
  weight: number | null;
  water_intake: number | null;
  alcohol_juices: string | null;
  sugar: string | null;
  sleep_from: string | null;
  sleep_to: string | null;
  sleep_quality: SleepQuality | null;
  activity: string | null;
  stressors: string | null;
  stress_reduction: string | null;
  quick_notes: string | null;
  wake_up_time: string | null;
  bed_time: string | null;
  created_at: string;
  updated_at: string;
}

export interface FoodEntryDB {
  id: string;
  journal_entry_id: string;
  title: string;
  entry_time: string;
  description: string;
  hunger_level: string;
  sort_order: number;
  created_at: string;
}

export function emptyJournalEntry(date: string): JournalEntry {
  return {
    entry_date: date,
    weight: null,
    water_intake: null,
    alcohol_juices: "",
    sugar: "",
    sleep_from: "",
    sleep_to: "",
    sleep_quality: null,
    activity: "",
    stressors: "",
    stress_reduction: "",
    quick_notes: "",
    wake_up_time: "",
    bed_time: "",
    food_entries: [
      { title: "", entry_time: "", description: "", hunger_level: "", sort_order: 0 },
    ],
  };
}
