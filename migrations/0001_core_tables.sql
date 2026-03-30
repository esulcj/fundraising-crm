-- 0001_core_tables.sql
-- Core entity tables: investors, contacts, interactions, actions, materials, dd_items

CREATE TABLE IF NOT EXISTS investors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  firm TEXT,
  tier TEXT,
  hq TEXT,
  fund_size TEXT,
  stage TEXT DEFAULT 'lead',
  thesis TEXT,
  portfolio TEXT,
  contact_name TEXT,
  contact_title TEXT,
  contact_email TEXT,
  contact_context TEXT,
  why_good_fit TEXT,
  email_subject TEXT,
  email_body TEXT,
  intro_source TEXT,
  intro_person TEXT,
  snooze_until TEXT,
  stale_threshold_days INTEGER,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL REFERENCES investors(id),
  name TEXT NOT NULL,
  title TEXT,
  email TEXT,
  phone TEXT,
  role TEXT DEFAULT 'other' CHECK(role IN ('decision_maker','champion','analyst','other')),
  is_primary INTEGER DEFAULT 0,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS interactions (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL REFERENCES investors(id),
  type TEXT,
  summary TEXT,
  transcript_raw TEXT,
  transcript_extracted TEXT,
  sentiment TEXT CHECK(sentiment IN ('excited','neutral','cautious','skeptical')),
  follow_up_date TEXT,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS actions (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL REFERENCES investors(id),
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending','in_progress','done')),
  source TEXT DEFAULT 'manual' CHECK(source IN ('manual','transcript','email','system')),
  scheduled_date TEXT,
  due_date TEXT,
  completed_at TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS materials (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL REFERENCES investors(id),
  type TEXT NOT NULL,
  name TEXT,
  version TEXT,
  deck_version TEXT,
  date_shared TEXT,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS dd_items (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL REFERENCES investors(id),
  question TEXT NOT NULL,
  answer TEXT,
  status TEXT DEFAULT 'asked' CHECK(status IN ('asked','in_progress','answered','shared')),
  extracted_from_interaction_id TEXT REFERENCES interactions(id),
  created_at TEXT DEFAULT (datetime('now'))
);
