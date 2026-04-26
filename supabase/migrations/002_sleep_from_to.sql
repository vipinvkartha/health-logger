-- Replace sleep_hours with sleep_from/sleep_to time range
ALTER TABLE journal_entries DROP COLUMN IF EXISTS sleep_hours;
ALTER TABLE journal_entries ADD COLUMN IF NOT EXISTS sleep_from TIME;
ALTER TABLE journal_entries ADD COLUMN IF NOT EXISTS sleep_to TIME;

-- Remove the CHECK constraint on sleep_quality to allow free text
ALTER TABLE journal_entries DROP CONSTRAINT IF EXISTS journal_entries_sleep_quality_check;
