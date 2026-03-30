-- 0004_indexes.sql
-- Indexes on foreign keys, status fields, and frequently queried columns

-- contacts
CREATE INDEX IF NOT EXISTS idx_contacts_investor_id ON contacts(investor_id);

-- interactions
CREATE INDEX IF NOT EXISTS idx_interactions_investor_id ON interactions(investor_id);
CREATE INDEX IF NOT EXISTS idx_interactions_created_at ON interactions(created_at);

-- actions
CREATE INDEX IF NOT EXISTS idx_actions_investor_id ON actions(investor_id);
CREATE INDEX IF NOT EXISTS idx_actions_status ON actions(status);
CREATE INDEX IF NOT EXISTS idx_actions_due_date ON actions(due_date);

-- materials
CREATE INDEX IF NOT EXISTS idx_materials_investor_id ON materials(investor_id);

-- dd_items
CREATE INDEX IF NOT EXISTS idx_dd_items_investor_id ON dd_items(investor_id);
CREATE INDEX IF NOT EXISTS idx_dd_items_status ON dd_items(status);

-- agent_configs
CREATE INDEX IF NOT EXISTS idx_agent_configs_agent_type ON agent_configs(agent_type);

-- agent_corrections
CREATE INDEX IF NOT EXISTS idx_agent_corrections_agent_type ON agent_corrections(agent_type);

-- agent_examples
CREATE INDEX IF NOT EXISTS idx_agent_examples_agent_type ON agent_examples(agent_type);
CREATE INDEX IF NOT EXISTS idx_agent_examples_active ON agent_examples(active);

-- email_threads
CREATE INDEX IF NOT EXISTS idx_email_threads_investor_id ON email_threads(investor_id);
CREATE INDEX IF NOT EXISTS idx_email_threads_last_message_at ON email_threads(last_message_at);

-- emails
CREATE INDEX IF NOT EXISTS idx_emails_thread_id ON emails(thread_id);
CREATE INDEX IF NOT EXISTS idx_emails_investor_id ON emails(investor_id);
CREATE INDEX IF NOT EXISTS idx_emails_date ON emails(date);

-- follow_ups
CREATE INDEX IF NOT EXISTS idx_follow_ups_investor_id ON follow_ups(investor_id);
CREATE INDEX IF NOT EXISTS idx_follow_ups_status ON follow_ups(status);
CREATE INDEX IF NOT EXISTS idx_follow_ups_due_date ON follow_ups(due_date);

-- briefings
CREATE INDEX IF NOT EXISTS idx_briefings_type ON briefings(type);
CREATE INDEX IF NOT EXISTS idx_briefings_investor_id ON briefings(investor_id);

-- transcripts
CREATE INDEX IF NOT EXISTS idx_transcripts_investor_id ON transcripts(investor_id);
CREATE INDEX IF NOT EXISTS idx_transcripts_interaction_id ON transcripts(interaction_id);

-- investors (frequently queried fields)
CREATE INDEX IF NOT EXISTS idx_investors_stage ON investors(stage);
CREATE INDEX IF NOT EXISTS idx_investors_tier ON investors(tier);
CREATE INDEX IF NOT EXISTS idx_investors_snooze_until ON investors(snooze_until);
CREATE INDEX IF NOT EXISTS idx_investors_updated_at ON investors(updated_at);
