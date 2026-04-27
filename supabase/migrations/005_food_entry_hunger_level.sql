-- Add hunger_level column to food_entries
ALTER TABLE food_entries ADD COLUMN IF NOT EXISTS hunger_level TEXT NOT NULL DEFAULT '';
