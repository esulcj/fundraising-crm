-- 0003_comms_tables.sql
-- Communication tables: email_threads, emails, follow_ups, briefings, transcripts

CREATE TABLE IF NOT EXISTS email_threads (
  id TEXT PRIMARY KEY,
  investor_id TEXT REFERENCES investors(id),
  subject TEXT,
  last_message_at TEXT,
  thread_json TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS emails (
  id TEXT PRIMARY KEY,
  thread_id TEXT REFERENCES email_threads(id),
  investor_id TEXT REFERENCES investors(id),
  direction TEXT CHECK(direction IN ('inbound','outbound')),
  from_addr TEXT,
  to_addr TEXT,
  subject TEXT,
  body TEXT,
  date TEXT,
  message_id TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS follow_ups (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL REFERENCES investors(id),
  description TEXT NOT NULL,
  due_date TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending','done','overdue')),
  created_from TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS briefings (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK(type IN ('daily','call_prep')),
  investor_id TEXT REFERENCES investors(id),
  content TEXT,
  generated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS transcripts (
  id TEXT PRIMARY KEY,
  investor_id TEXT REFERENCES investors(id),
  interaction_id TEXT REFERENCES interactions(id),
  raw_text TEXT,
  extracted_json TEXT,
  processed_at TEXT
);
