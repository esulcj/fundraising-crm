-- 0002_agent_tables.sql
-- Agent configuration tables: agent_configs, agent_corrections, agent_examples

CREATE TABLE IF NOT EXISTS agent_configs (
  id TEXT PRIMARY KEY,
  agent_type TEXT NOT NULL CHECK(agent_type IN ('pipeline','briefing','email','transcript')),
  system_prompt TEXT,
  config_json TEXT,
  version INTEGER DEFAULT 1,
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS agent_corrections (
  id TEXT PRIMARY KEY,
  agent_type TEXT NOT NULL,
  input_context TEXT,
  original_output TEXT,
  corrected_output TEXT,
  pinned INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS agent_examples (
  id TEXT PRIMARY KEY,
  agent_type TEXT NOT NULL,
  input TEXT,
  output TEXT,
  active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);
