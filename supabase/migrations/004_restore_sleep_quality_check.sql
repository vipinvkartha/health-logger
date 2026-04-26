-- Restore sleep_quality CHECK constraint for poor/fair/good values
-- First clear any values that don't match
UPDATE journal_entries SET sleep_quality = NULL WHERE sleep_quality NOT IN ('poor', 'fair', 'good');

-- Add the constraint back
ALTER TABLE journal_entries ADD CONSTRAINT journal_entries_sleep_quality_check CHECK (sleep_quality IN ('poor', 'fair', 'good'));
