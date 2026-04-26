-- Daily journal entries (one per user per day)
CREATE TABLE journal_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  entry_date DATE NOT NULL,
  weight DECIMAL(5,2),
  water_intake DECIMAL(4,2),
  alcohol_juices TEXT,
  sugar TEXT,
  sleep_from TIME,
  sleep_to TIME,
  sleep_quality TEXT,
  activity TEXT,
  stressors TEXT,
  stress_reduction TEXT,
  quick_notes TEXT,
  wake_up_time TIME,
  bed_time TIME,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, entry_date)
);

-- Food journal entries (multiple per journal entry, ordered by time)
CREATE TABLE food_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  journal_entry_id UUID REFERENCES journal_entries(id) ON DELETE CASCADE NOT NULL,
  entry_time TIME NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_journal_entries_user_date ON journal_entries(user_id, entry_date);
CREATE INDEX idx_food_entries_journal ON food_entries(journal_entry_id);

-- Row Level Security
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD their own journal entries"
  ON journal_entries FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can CRUD food entries for their journals"
  ON food_entries FOR ALL
  USING (
    journal_entry_id IN (
      SELECT id FROM journal_entries WHERE user_id = auth.uid()
    )
  );

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER journal_entries_updated_at
  BEFORE UPDATE ON journal_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
