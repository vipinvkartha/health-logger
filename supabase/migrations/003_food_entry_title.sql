-- Add title column to food_entries
ALTER TABLE food_entries ADD COLUMN IF NOT EXISTS title TEXT NOT NULL DEFAULT '';
