#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'seed-data', 'firms_v1.json');
const outputPath = path.join(__dirname, 'seed-data', 'seed.sql');

const firms = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

function escapeSQL(val) {
  if (val == null) return 'NULL';
  return "'" + String(val).replace(/'/g, "''") + "'";
}

const lines = [];
lines.push('-- Seed data: ' + firms.length + ' investor firms from firms_v1.json');
lines.push('-- Generated: ' + new Date().toISOString());
lines.push('-- Source: scripts/seed-data/firms_v1.json');
lines.push('-- Apply with: wrangler d1 execute fundraising-crm --file=scripts/seed-data/seed.sql --remote');
lines.push('');

for (const f of firms) {
  const portfolio = f.portfolio ? JSON.stringify(f.portfolio) : null;

  const sql = `INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES (${escapeSQL(f.id)}, ${escapeSQL(f.firm)}, ${escapeSQL(f.firm)}, ${escapeSQL(f.tier)}, ${escapeSQL(f.hq)}, ${escapeSQL(f.fundSize)}, 'lead', ${escapeSQL(f.thesis)}, ${escapeSQL(portfolio)}, ${escapeSQL(f.contact)}, ${escapeSQL(f.contactTitle)}, ${escapeSQL(f.email)}, ${escapeSQL(f.contactContext)}, ${escapeSQL(f.why)}, ${escapeSQL(f.emailSubject)}, ${escapeSQL(f.emailBody)});`;

  lines.push(sql);
}

lines.push('');

fs.writeFileSync(outputPath, lines.join('\n'), 'utf8');
console.log('Generated ' + outputPath);
console.log(firms.length + ' INSERT statements written.');
