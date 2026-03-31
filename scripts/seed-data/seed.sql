-- Seed data: 93 investor firms from firms_v1.json
-- Generated: 2026-03-31T03:26:09.725Z
-- Source: scripts/seed-data/firms_v1.json
-- Apply with: wrangler d1 execute fundraising-crm --file=scripts/seed-data/seed.sql --remote

INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('eclipse-ventures', 'Eclipse Ventures', 'Eclipse Ventures', 'A', 'Palo Alto, CA', '$1B+ (Fund III: $500M, 2021; reported growth fund)', 'lead', 'Physical industries transformation — manufacturing, industrial, energy', '["Bright Machines","Augury","VulcanForms","Forge Nano"]', 'Greg Reichow', 'Partner', 'greg@eclipse.capital', 'Former VP of Production at Tesla (manufacturing, supply chain, automation engineering); Deep manufacturing operations background — exact right person for CloudNC', 'Eclipse''s entire thesis IS the digitization of physical industries. Greg Reichow ran Tesla''s manufacturing. CloudNC''s AI-for-CNC story maps directly to their portfolio (Bright Machines, VulcanForms). Top priority target.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI manufacturing, 915 factories', 'Hi Greg,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Bright Machines and VulcanForms — we''re solving the software layer those factories need.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('construct-capital', 'Construct Capital', 'Construct Capital', 'A', 'Washington, DC', '$300M (Fund III, closed March 2025)', 'lead', 'Foundational Industries" — robotics, AI, automation reshaping supply chain, logistics, manufacturing, defense', '["Veho","Hadrian","Machina Labs"]', 'Dayna Grayson', 'Co-Founder & General Partner', 'dayna@constructcap.com', 'Former NEA partner who built industrial portfolio; pioneered VC investment in industrial sectors', 'Construct''s stated mission is transforming foundational industries with AI/robotics. They backed Hadrian and Machina Labs — direct manufacturing peers. Dayna Grayson was one of the first VCs to build a dedicated industrial portfolio. Perfect thesis alignment.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI manufacturing, 915 factories', 'Hi Dayna,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Hadrian and Machina Labs — we''re the AI brain that makes CNC manufacturing autonomous.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('dcvc-data-collective', 'DCVC (Data Collective)', 'DCVC (Data Collective)', 'A', 'San Francisco, CA', '$1.3B (DCVC V, 2022)', 'lead', 'Deep tech, computational approaches to physical world problems — AI, manufacturing, climate, biotech', '["Sight Machine","Paperless Parts","Instrumental"]', 'Matt Ocko', 'Co-Managing Partner', 'matt@dcvc.com', 'Co-founded DCVC, focuses on deep tech / applied AI', 'DCVC literally invested in Sight Machine, Paperless Parts, AND Instrumental — three of CloudNC''s closest comps. They understand the manufacturing software stack. DCVC Opportunity Fund ($500M+) writes growth checks. Very high conviction target.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI manufacturing, 915 factories', 'Hi Matt,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Sight Machine and Paperless Parts — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('lux-capital', 'Lux Capital', 'Lux Capital', 'A', 'New York, NY', '$1.1B (Fund VIII, 2023)', 'lead', 'Deep tech, frontier tech — science-based companies, advanced manufacturing, defense, AI', '["Desktop Metal","Markforged","Hadrian","Freeform","Anduril"]', 'Josh Wolfe', 'Co-Founder & Managing Partner', 'josh@luxcapital.com', 'Iconic deep-tech investor, coined "manufacturing renaissance" thesis', 'Lux backed Desktop Metal, Markforged, Hadrian, and Freeform — ALL advanced manufacturing companies. Josh Wolfe is perhaps the most vocal VC advocate for "atoms, not just bits." CloudNC''s AI-for-manufacturing thesis is squarely in their wheelhouse.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI manufacturing, 915 factories', 'Hi Josh,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Desktop Metal, Markforged, and Hadrian — we''re the software layer the manufacturing renaissance needs.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('general-catalyst', 'General Catalyst', 'General Catalyst', 'A', 'Cambridge, MA / San Francisco, CA', '$6B+ (multi-stage, latest fund $4.6B)', 'lead', 'Global resiliency and applied AI" — including manufacturing reindustrialization', '["Re:Build Manufacturing ($120M investment","Aug 2024)","Stripe","Snap","Airbnb"]', 'Deep Nishar', 'Managing Director', 'deep@gc.com', 'Leads enterprise and industrial investments; board observer Re:Build Manufacturing', 'GC invested $120M in Re:Build Manufacturing in 2024 — the largest signal of any top-tier VC investing directly in US manufacturing reindustrialization. They have active thesis here, capital deployed, and the fund size to lead. Also acquired La Famiglia (European VC) giving them UK/Europe coverage.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI manufacturing, 915 factories', 'Hi Deep,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your $120M bet on Re:Build Manufacturing signals where you''re headed — we''re the AI making that reindustrialization possible.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('harpoon-ventures', 'Harpoon Ventures', 'Harpoon Ventures', 'A', 'San Diego, CA', '$183M (Fund I)', 'lead', 'Defense technology, advanced manufacturing for defense, national security', '["MatX","Aalo Atomics","General Galactic; stealth defense manufacturing companies"]', 'Larsen Jensen', 'Founder & Managing Partner', 'larsen@harpoon.vc', 'Former special operations; built firm around defense-tech thesis', 'Harpoon invests in defense manufacturing tech, has direct DARPA and defense-buyer access. CloudNC''s Lockheed Martin relationship and defense applications (In-Q-Tel investor) make this a natural fit. Smaller fund may limit check size but very high thesis conviction.', 'CloudNC — AI for CNC machining, $5.4M ARR, In-Q-Tel + Lockheed backed', 'Hi Larsen,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your defense manufacturing thesis and DARPA access are exactly what CloudNC needs — In-Q-Tel and Lockheed Martin are already on our cap table.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('shield-capital', 'Shield Capital', 'Shield Capital', 'A', 'Burlingame, CA', '~$250M (Fund I, 2023)', 'lead', 'AI, autonomy, cybersecurity, space — technologies for national security', '["Various defense tech companies"]', 'Raj Shah', 'Managing Partner', 'raj@shieldcap.com', 'Former Director of the Defense Innovation Unit (Pentagon''s flagship innovation org); serial entrepreneur', 'Raj Shah literally ran DIU at the Pentagon. CloudNC''s In-Q-Tel connection and defense manufacturing applications (Lockheed partnership) align perfectly with Shield''s dual-use commercial + national security thesis.', 'CloudNC — AI for CNC machining, $5.4M ARR, In-Q-Tel + Lockheed backed', 'Hi Raj,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You ran DIU at the Pentagon — you know the CNC machining bottleneck in defense production firsthand. In-Q-Tel invested because this is a national security problem.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('ae-industrial-partners-ae-ventures', 'AE Industrial Partners (AE Ventures)', 'AE Industrial Partners (AE Ventures)', 'A', 'Boca Raton, FL', '$5B+ AUM (PE + VC); AEI HorizonX venture arm (originally Boeing''s CVC)', 'lead', 'Aerospace, defense, government services, specialty industrial', '["Applied Composites","G.S. Precision","FLYR"]', 'Kirk Konert', 'Partner (Ventures)', 'kkonert@aeroequity.com', 'Leads venture investments in aerospace/defense technology', 'AE''s HorizonX arm (ex-Boeing CVC) specifically targets defense manufacturing innovation. CloudNC''s CNC AI with Lockheed Martin application is a natural fit. They understand industrial technology commercialization.', 'CloudNC — AI for CNC machining, $5.4M ARR, In-Q-Tel + Lockheed backed', 'Hi Kirk,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Applied Composites and G.S. Precision — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('addition-lee-fixel', 'Addition (Lee Fixel)', 'Addition (Lee Fixel)', 'A', 'New York, NY', '$1.4B (Fund II)', 'lead', 'High-conviction technology investments, enterprise software, AI', '["Anthropic","Figma","various enterprise companies"]', 'Lee Fixel', 'Founder & Managing Partner (sole decision-maker)', 'lee@addition.com', 'Former Tiger Global partner; writes growth-stage enterprise checks; high-conviction, concentrated portfolio', 'Lee Fixel runs a concentrated portfolio and makes fast, high-conviction decisions. Former Tiger Global pedigree. CloudNC is the type of differentiated AI-for-industry story that Addition targets. Theo already has "Serta and Alexei" contacts for intro.', 'CloudNC — AI for CNC machining, $5.4M ARR, Lockheed + Autodesk backed', 'Hi Lee,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Anthropic and Figma — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('razor-s-edge-ventures', 'Razor''s Edge Ventures', 'Razor''s Edge Ventures', 'A', 'Arlington, VA', '~$400M+ (Fund III, 2023)', 'lead', 'National security, defense innovation, dual-use technology', '["SpaceX","Palantir","Anduril"]', 'Todd Stottlemyer', 'Managing Partner', 'info@razorsedgeventures.com', 'Former CEO of KEYW Holding (defense tech), deep national security network', 'Razor''s Edge was one of the earliest defense-tech VCs (backed SpaceX and Palantir). CloudNC''s In-Q-Tel connection and Lockheed partnership signal exactly the dual-use defense manufacturing tech they target.', 'CloudNC — AI for CNC machining, $5.4M ARR, In-Q-Tel + Lockheed backed', 'Hi Todd,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed SpaceX and Palantir — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('root-ventures', 'Root Ventures', 'Root Ventures', 'A', 'San Francisco, CA', '$150M (Fund IV)', 'lead', 'Hardware-adjacent software, manufacturing, robotics, physical technology', '["Formlabs","Instrumental","Hadrian"]', 'Avidan Ross', 'Founder & Managing Partner', 'avidan@root.vc', 'Engineer turned investor; personal fabrication workshop; deep manufacturing expertise', 'Root''s thesis is literally hardware + software integration. Backed Formlabs and Instrumental (manufacturing). Avidan Ross runs a personal fabrication shop. Smaller fund may limit check size for a lead, but very high conviction contact for co-lead or anchor follow.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI manufacturing, 915 factories', 'Hi Avidan,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You run a personal fabrication shop — you know the CNC programming bottleneck firsthand. We''ve built the AI that eliminates it.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('sequoia-capital', 'Sequoia Capital', 'Sequoia Capital', 'B', 'Menlo Park, CA', '$8B+ (multi-fund)', 'lead', 'Category-defining companies across all sectors; strong enterprise/B2B practice', '["Vanta","ServiceNow","Snowflake"]', 'Bogomil Balkansky', 'Partner', 'bogomil@sequoiacap.com', 'Enterprise / B2B focus; intuition-driven investor with hardware/analytics crossover interest', 'Sequoia is the gold standard. Their enterprise team under Pat Grady is very active. CloudNC''s AI + vertical SaaS + defense narrative would appeal. Fund size means they CAN write $15M without blinking.', 'CloudNC — AI for CNC machining, $5.4M ARR, $29B vertical, 915 factories', 'Hi Bogomil,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your enterprise team has an eye for category-defining companies — we''re defining AI for the $29B CNC machining market.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('coatue-management', 'Coatue Management', 'Coatue Management', 'B', 'New York, NY', '$8B+ (multi-strategy, includes venture)', 'lead', 'Technology-focused, data-driven investing; enterprise software, AI', '["Airtable","Databricks","Figma","various AI companies"]', 'Kris Patwardhan', 'General Partner', 'kris@coatue.com', 'Enterprise software specialist; led multiple B2B growth investments', 'Coatue is extremely active in AI/enterprise and has the fund size to move quickly. Data-driven approach means CloudNC''s strong metrics (ARR growth, retention) will resonate. They often lead growth rounds.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Kris,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your data-driven approach will love our metrics — $5.4M ARR, 2x YoY, 915 factories, with AI that scores 82% where LLMs score 0%.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('tiger-global-management', 'Tiger Global Management', 'Tiger Global Management', 'B', 'New York, NY', '$2.2B (PIP 16, 2025)', 'lead', 'Enterprise software, consumer internet, payments — high-growth technology', '["GitLab","Toast","Databricks","hundreds of SaaS companies"]', 'Chase Coleman', 'Founder & Managing Partner (final decision-maker)', 'Extremely private; best through intermediary', '', 'Tiger wrote the playbook for rapid B2B SaaS growth investing. Post-2023 reset, they''re being more selective but still deploying into high-conviction themes. CloudNC''s 2x ARR growth + AI narrative fits. Key risk: Tiger prefers faster-growing companies.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Chase,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

CloudNC''s 2x YoY ARR growth with strong retention in a $29B market fits the high-growth B2B thesis you pioneered.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('greenoaks-capital', 'Greenoaks Capital', 'Greenoaks Capital', 'B', 'San Francisco, CA', '~$4B AUM', 'lead', 'Concentrated, long-term bets on "generational businesses" — enterprise software, fintech', '["Anthropic","Coupang","various enterprise software"]', 'Neil Mehta', 'Founder & Managing Partner', 'Private; use intermediary if possible', 'Sole decision-maker; known for deep-dive diligence on business fundamentals', 'Greenoaks makes concentrated bets on companies with strong unit economics. CloudNC''s retention metrics and TAM story in manufacturing would appeal to their "generational business" thesis. Small team = fast decisions.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Neil,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Anthropic and Coupang — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('redpoint-ventures', 'Redpoint Ventures', 'Redpoint Ventures', 'B', 'Menlo Park, CA', '$900M+ (recent fund)', 'lead', 'Enterprise infrastructure, developer tools, B2B SaaS', '["Twilio","Snowflake","Netflix","Stripe"]', 'Tomasz Tunguz', 'Managing Director', 'tomasz@redpoint.com', 'Enterprise SaaS expert; writes extensively on SaaS metrics; AI-forward', 'Tomasz Tunguz is one of the sharpest B2B SaaS thinkers in VC. CloudNC''s SaaS metrics story + AI + vertical specialization would interest him. Redpoint does growth-stage B2B regularly.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, 2x YoY growth', 'Hi Tomasz,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your deep SaaS metrics expertise will appreciate our numbers — $5.4M ARR, 2x YoY, and a $29B market with no real software competition.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('menlo-ventures', 'Menlo Ventures', 'Menlo Ventures', 'B', 'Menlo Park, CA', '$900M (Fund XVI, 2024)', 'lead', 'All in on AI" — enterprise applications, infrastructure, healthcare', '["Uber","Roku","Siri","various AI companies"]', 'Matt Murphy', 'Partner', 'matt@menlovc.com', 'Enterprise and growth-stage specialist; operational investor', 'Menlo is "all in on AI" with a $900M fund. They invest in AI applications across enterprise. CloudNC''s applied AI for manufacturing is differentiated from generic AI software companies they see.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Matt,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You''re all-in on AI — we''re applying it to CNC machining, where LLMs score 0% and our system scores 82%.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('norwest-venture-partners', 'Norwest Venture Partners', 'Norwest Venture Partners', 'B', 'Menlo Park, CA', '$3B+ (NVP XVI, $3B, 2022)', 'lead', 'Cross-sector — enterprise software, healthcare, consumer; strong vertical SaaS practice', '["Calm","Plaid","Udemy; strong B2B SaaS portfolio"]', 'Scott Beechuk', 'Partner', 'scott@nvp.com', 'Enterprise/B2B specialist; former VP at Salesforce, operational background', '$3B fund, $1-30M check size is perfect for $15M lead. Strong vertical SaaS track record. Growth equity team specifically targets profitable founder-led companies. CloudNC''s path to profitability resonates.', 'CloudNC — AI for CNC machining, $5.4M ARR, $29B vertical, 915 factories', 'Hi Scott,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your $3B fund and vertical SaaS track record match perfectly — we''re CloudNC, AI for the $29B CNC machining market.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('canaan-partners', 'Canaan Partners', 'Canaan Partners', 'B', 'Menlo Park, CA / Westport, CT', '$800M (Fund XIII)', 'lead', 'Enterprise, fintech, frontier tech, health', '["Lending Club","Tomorrow.io","various enterprise"]', 'Maha Ibrahim', 'General Partner', 'maha@canaan.com', 'Enterprise software specialist; SaaS investor', 'Canaan has a "frontier tech" vertical that could encompass manufacturing AI. $800M fund can support $10M+ lead checks. Their enterprise team understands B2B SaaS metrics.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Maha,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your frontier tech vertical and $800M fund align with what we''re building — AI for CNC manufacturing.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('b-capital-group', 'B Capital Group', 'B Capital Group', 'B', 'Los Angeles, CA / New York, NY', '$8B AUM (latest fund $2.1B, 2024)', 'lead', 'Technology + operational transformation; strategic partnership with BCG', '["Various enterprise and industrial technology companies"]', 'Rashmi Gopinath', 'General Partner', 'rashmi@b.capital', 'Enterprise and AI investor; former Microsoft Corp VP', 'BCG partnership means B Capital understands enterprise/industrial transformation. $8B AUM and multi-stage approach means they can lead growth rounds. Their climate and "energy & resilience" vertical may capture manufacturing.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Rashmi,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your BCG partnership means you understand industrial transformation — we''re the AI making it happen in CNC machining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('altimeter-capital', 'Altimeter Capital', 'Altimeter Capital', 'B', 'Menlo Park, CA', '$3B+ AUM', 'lead', 'Technology, enterprise software, AI', '["Snowflake","Unity","various enterprise software"]', 'Brad Gerstner', 'Founder & CEO', 'brad@altimetercap.com', 'Enterprise/AI investor; public market crossover', 'Altimeter does growth-stage enterprise software. Brad Gerstner is vocal on AI. Crossover fund means they can be long-term holders. $15M is a small check for them — could be very efficient process.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, 2x YoY growth', 'Hi Brad,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your enterprise AI growth investing fits perfectly — $5.4M ARR, 2x YoY, in a $29B market with no real competition.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('emergence-capital', 'Emergence Capital', 'Emergence Capital', 'B', 'San Mateo, CA', '$1B+ (Fund V, 2021)', 'lead', 'Enterprise software and vertical SaaS — "the future of work', '["Salesforce","Zoom","Veeva","ServiceMax"]', 'Jason Green', 'General Partner & Founder', 'jason@emcap.com', 'Pioneer of enterprise cloud investing; backed Salesforce', 'Emergence literally invented the "vertical SaaS" investment category. They backed ServiceMax (field service management — similar "enterprise software for blue collar" positioning) and Veeva (vertical SaaS for pharma). CloudNC''s vertical SaaS for manufacturing is perfectly in their strike zone.', 'CloudNC — AI for CNC machining, $5.4M ARR, $29B vertical, 915 factories', 'Hi Jason,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You pioneered vertical SaaS investing with ServiceMax and Veeva — CAM Assist is vertical SaaS for the $29B machining market.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('ivp-institutional-venture-partners', 'IVP (Institutional Venture Partners)', 'IVP (Institutional Venture Partners)', 'B', 'Menlo Park, CA', '$2.2B (Fund XVIII, 2023)', 'lead', 'High-growth technology companies, enterprise and consumer', '["Slack","Dropbox","Datadog","CrowdStrike"]', 'Cack Wilhelm', 'General Partner', 'cack@ivp.com', 'B2B / enterprise software focus', 'IVP''s sweet spot is Series B/C growth rounds in enterprise software. $2.2B fund means $15M is comfortable. They look for category leaders with strong unit economics.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Cack,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Slack and Dropbox — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('meritech-capital', 'Meritech Capital', 'Meritech Capital', 'B', 'Palo Alto, CA', '$2.2B+ AUM', 'lead', 'Information technology, enterprise software, SaaS growth', '["Cloudflare","Datadog","UiPath"]', 'Rob Ward', 'Managing Director', 'rob@meritechcapital.com', 'Enterprise SaaS growth specialist', 'Meritech is a dedicated growth-stage enterprise software investor. They analyze SaaS metrics deeply. CloudNC''s NRR, ARR growth, and vertical TAM would get serious analysis. They prefer $10M+ ARR companies — CloudNC''s trajectory fits.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, 2x YoY growth', 'Hi Rob,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your deep SaaS metrics analysis will appreciate our numbers — $5.4M ARR, strong NRR, 2x growth in a massive TAM.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('scale-venture-partners', 'Scale Venture Partners', 'Scale Venture Partners', 'B', 'Foster City, CA', '$600M (Fund VII, 2020)', 'lead', 'Enterprise software, AI-enabled applications, SaaS for low-tech industries', '["DocuSign","HubSpot","Box","CircleCI"]', 'Ariel Tseitlin', 'Partner', 'ariel@scalevp.com', 'Enterprise / AI applications specialist; ex-Netflix (cloud solutions)', 'Scale explicitly targets "SaaS for industries that have traditionally been low-tech" — manufacturing is the textbook example. CloudNC''s $5.4M ARR is in their sweet spot.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Ariel,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on SaaS for low-tech industries describes us perfectly — CNC machining is a $29B market that still runs on manual programming.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('madrona-ventures', 'Madrona Ventures', 'Madrona Ventures', 'B', 'Seattle, WA', '$770M (Fund IX, 2022)', 'lead', 'AI, enterprise, infrastructure — Pacific Northwest focus but invest nationally', '["Amazon","Snowflake","UiPath","Smartsheet"]', 'S. Somasegar', 'Managing Director', 'soma@madrona.com', 'Former Microsoft Corp VP (21 years); enterprise software expert', 'Madrona has deep enterprise software expertise and is active in applied AI. Soma''s Microsoft background means he understands enterprise go-to-market. $770M fund supports $10M+ checks.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi S.,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your applied AI expertise and enterprise background make this a natural fit — AI for a $29B market.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('lightspeed-venture-partners', 'Lightspeed Venture Partners', 'Lightspeed Venture Partners', 'B', 'Menlo Park, CA', '$7.1B (multi-fund, 2022)', 'lead', 'Enterprise, consumer, health, crypto', '["Snap","Nutanix","AppDynamics","Rubrik"]', 'Gaurav Gupta', 'Partner', 'gaurav@lsvp.com', 'Enterprise / B2B specialist; led growth investments', 'Lightspeed has a massive enterprise practice and fund size to easily lead $15M. They attended Harpoon Ventures'' defense-tech events — signals interest in the space. Multi-stage means they can follow on.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Gaurav,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your enterprise practice and defense-tech interest align perfectly — we''re AI for CNC machining with Lockheed Martin and In-Q-Tel on the cap table.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('index-ventures', 'Index Ventures', 'Index Ventures', 'B', 'San Francisco, CA / London, UK', '$2.3B (Growth VI, 2023)', 'lead', 'Enterprise, fintech, gaming — strong European roots with US presence', '["Figma","Notion","Deliveroo","Roblox"]', 'Mark Goldberg', 'Partner', 'mark@indexventures.com', 'Enterprise / B2B SaaS; growth-stage focus', 'Index has European roots and invests actively in UK companies. London presence means they understand the UK ecosystem. CloudNC being London-HQ is an advantage here. Growth fund writes $15M+ checks.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Mark,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your London presence and track record with European enterprise companies make this a natural fit — we''re UK-HQ''d with US traction.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('thrive-capital', 'Thrive Capital', 'Thrive Capital', 'B', 'New York, NY', '$3B+ (multiple funds)', 'lead', 'Internet, software, applied AI', '["Figma","Instagram","Oscar Health","various AI companies"]', 'Josh Kushner', 'Founder & Managing Partner', 'Private — best through intermediary', '', 'Thrive is increasingly active in applied AI and vertical software. Large fund size. Fast-moving decision process. CloudNC''s AI narrative would resonate. Josh Kushner makes concentrated bets.', 'CloudNC — AI for CNC machining, $5.4M ARR, $29B vertical, 915 factories', 'Hi Josh,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your applied AI thesis and fast-moving process fit what we need — we''re the only company to crack autonomous CNC programming.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('alkeon-capital', 'Alkeon Capital', 'Alkeon Capital', 'B', 'New York, NY', '$19B+ AUM (crossover hedge fund / venture)', 'lead', 'Technology, healthcare — long-duration growth', '["Various technology companies","public and private"]', 'Panayotis Takis Sparaggis', 'Founder & CIO', 'Private — use intermediary', '', 'Alkeon does private growth rounds and can write large checks quickly. Less hands-on than pure VC but efficient process for companies with strong metrics.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Panayotis,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Various technology companies and public and private — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('dragoneer-investment-group', 'Dragoneer Investment Group', 'Dragoneer Investment Group', 'B', 'San Francisco, CA', '$3B+ AUM', 'lead', 'Technology, enterprise, durable growth companies', '["Slack","UiPath","Snowflake","Databricks"]', 'Marc Stad', 'Founder & Managing Partner', 'marc@dragoneer.com', '', 'Dragoneer specializes in growth-stage technology companies with strong unit economics. They backed UiPath (enterprise automation) — similar "AI augments human work" thesis to CloudNC. Efficient process.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, 2x YoY growth', 'Hi Marc,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed UiPath for enterprise automation — we''re bringing the same transformation to CNC manufacturing.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('d1-capital-partners', 'D1 Capital Partners', 'D1 Capital Partners', 'B', 'New York, NY', '$5B+ AUM (crossover)', 'lead', 'Technology, healthcare', '["SpaceX","various enterprise tech"]', 'Dan Sundheim', 'Founder & CIO', 'Private — use intermediary', 'Former Viking Global; concentrated high-conviction bets', 'D1 does selective private growth investments and can move quickly. They backed SpaceX — signals interest in "hard tech" companies. Less traditional VC but efficient capital.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Dan,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed SpaceX and various enterprise tech — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('craft-ventures', 'Craft Ventures', 'Craft Ventures', 'B', 'San Francisco, CA', '$2B+ AUM (multiple funds)', 'lead', 'Enterprise SaaS, fintech, marketplace — "compounding value" thesis', '["SpaceX","various B2B SaaS"]', 'David Sacks', 'General Partner & Co-Founder', 'david@craftventures.com', 'PayPal mafia; enterprise SaaS investor; defense/America-first thesis', 'David Sacks is increasingly vocal about American manufacturing and defense. His political connections (close to Trump administration) align with CloudNC''s defense narrative. Craft does growth-stage B2B.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, 2x YoY growth', 'Hi David,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your American manufacturing thesis aligns with what we''re building — AI that makes US CNC machining competitive again.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('greylock-partners', 'Greylock Partners', 'Greylock Partners', 'B', 'Menlo Park, CA', '$1B+ (Fund XVII)', 'lead', 'AI-first companies, enterprise, consumer', '[]', 'David Thacker', 'Partner', 'david@greylock.com', 'Enterprise / vertical SaaS; former Google/YouTube VP', 'Greylock focuses on earlier stage (80% first check) — probably too early for Series C lead. But David Thacker''s vertical SaaS focus could make an exception. Lower priority.', 'CloudNC — AI for CNC machining, $5.4M ARR, $29B vertical, 915 factories', 'Hi David,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your vertical SaaS focus under David Thacker could find CloudNC compelling — AI for the $29B CNC machining market.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('summit-partners', 'Summit Partners', 'Summit Partners', 'B', 'Boston, MA', '$4B+ (Growth Equity)', 'lead', 'Technology, healthcare, growth companies', '["Various B2B software companies"]', 'Peter Chung', 'Managing Director', 'pchung@summitpartners.com', 'Technology growth equity; enterprise software', 'Summit is a dedicated growth equity firm that writes $10-50M+ checks. They look for companies with $5M+ ARR growing 50%+. CloudNC''s metrics fit. Less VC-style board involvement, more capital partner.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, 2x YoY growth', 'Hi Peter,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your growth equity model is exactly what we''re looking for — $5.4M ARR, 2x growth, founder-led, with a clear path to profitability.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('jmi-equity', 'JMI Equity', 'JMI Equity', 'B', 'Baltimore, MD', '$3.5B (Fund X, 2022)', 'lead', 'Enterprise software, pure B2B SaaS growth investor', '["AppFolio","HealthEdge","Jama Software"]', 'Paul Barber', 'General Partner', 'pbarber@jmiequity.com', 'Enterprise software growth equity specialist', 'JMI is a pure-play B2B SaaS growth investor. They understand vertical software deeply. $3.5B fund means $15M is a comfortable check. They look for exactly CloudNC''s profile: vertical SaaS with domain expertise.', 'CloudNC — AI for CNC machining, $5.4M ARR, $29B vertical, 915 factories', 'Hi Paul,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You''re a pure-play B2B SaaS growth investor — CloudNC is vertical SaaS for the $29B CNC machining market with 11 years of technical moat.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('silversmith-capital-partners', 'Silversmith Capital Partners', 'Silversmith Capital Partners', 'B', 'Boston, MA', '$3.1B (multiple funds)', 'lead', 'Technology and healthcare growth companies', '["PartsBase","Appfire","ActiveCampaign"]', 'Jim Quagliaroli', 'Managing Partner', 'jquagliaroli@silversmith.com', 'Technology growth equity; B2B software', 'Silversmith backed PartsBase — an aerospace parts marketplace. They understand industrial B2B software. Growth equity approach means less dilutive control. Strong fit for Series C lead.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, 2x YoY growth', 'Hi Jim,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed PartsBase in aerospace — we''re the AI layer making CNC manufacturing autonomous, with Lockheed Martin as a strategic partner.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('spectrum-equity', 'Spectrum Equity', 'Spectrum Equity', 'B', 'Boston, MA / San Francisco, CA', '$2.5B (Fund XI, 2021)', 'lead', 'B2B software, internet, information services', '["Ancestry.com","Barkbox","various B2B SaaS"]', 'Pete Jensen', 'Managing Director', 'pjensen@spectrumequity.com', 'B2B SaaS growth equity specialist', 'Spectrum does growth equity in B2B software. $2.5B fund, established track record. CloudNC''s ARR growth and vertical positioning would interest them.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, 2x YoY growth', 'Hi Pete,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Ancestry.com and Barkbox — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('susquehanna-growth-equity-sge', 'Susquehanna Growth Equity (SGE)', 'Susquehanna Growth Equity (SGE)', 'B', 'Bala Cynwyd, PA', '$1.5B+', 'lead', 'Technology, internet, software', '["Various B2B SaaS companies"]', 'Martin Angert', 'Managing Director', 'mangert@sgep.com', 'Enterprise software growth investments', 'SGE is a dedicated growth equity firm backed by Susquehanna International Group. They write growth checks in enterprise software. Less well-known but very active.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, 2x YoY growth', 'Hi Martin,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Various B2B SaaS companies — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('georgian-partners', 'Georgian Partners', 'Georgian Partners', 'B', 'Toronto, Canada (invests in US)', '$1B+ (Fund IV, 2021)', 'lead', 'Applied AI, B2B software, machine learning-powered companies', '["Vidyard","Klipfolio","various AI-powered B2B companies"]', 'Justin LaFayette', 'Managing Partner', 'justin@georgian.io', 'Applied AI / B2B software growth', 'Georgian''s entire thesis is "AI-powered B2B software." They literally built an AI research lab to help portfolio companies. CloudNC''s AI-for-manufacturing story is exactly their investment thesis. Active in US despite Canadian HQ.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Justin,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your entire thesis is AI-powered B2B software — CloudNC is AI for the $29B CNC machining market, and the technology moat is 11 years deep.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('pelion-venture-partners', 'Pelion Venture Partners', 'Pelion Venture Partners', 'B', 'Salt Lake City, UT', '$160M (Fund VII)', 'lead', 'Enterprise software, deep tech, AI', '["Various enterprise and deep tech companies"]', 'Blake Modersitzki', 'Managing Director', 'blake@pelionvp.com', 'Enterprise technology; deep tech background', 'Pelion invests in deep-tech enterprise companies. Smaller fund but active Series B/C investor. Salt Lake City base means less competitive deal flow access.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Blake,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Various enterprise and deep tech companies — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('initialized-capital', 'Initialized Capital', 'Initialized Capital', 'B', 'San Francisco, CA', '$700M+ (Fund V)', 'lead', 'Technical founders, deep tech, AI', '["Coinbase","Instacart","Flexport"]', 'Garry Tan', 'Managing Partner (also Y Combinator President)', 'garry@initialized.com', 'Technical founder investor; hardware/manufacturing interest', 'Garry Tan (now also YC President) has expressed interest in manufacturing/hard-tech. Initialized backed Flexport (logistics infrastructure). May be more early-stage than Series C though.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Garry,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Coinbase and Instacart — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('vista-equity-partners', 'Vista Equity Partners', 'Vista Equity Partners', 'B', 'Austin, TX', '$100B+ AUM (PE, mostly)', 'lead', 'Enterprise software, pure-play software PE', '["Citrix","Jamf","Ping Identity","hundreds of enterprise software companies"]', 'David Breach', 'Senior Managing Director (Growth Equity)', 'dbreach@vistaequitypartners.com', 'Leads Vista''s growth equity arm which writes smaller checks', 'Vista''s growth equity arm does minority investments in enterprise software. They understand B2B SaaS deeply (own 80+ software companies). $15M is tiny for them. Worth exploring but may want more control than a typical VC.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, 2x YoY growth', 'Hi David,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Citrix and Jamf — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('thoma-bravo', 'Thoma Bravo', 'Thoma Bravo', 'B', 'San Francisco, CA / Chicago, IL', '$130B+ AUM (PE, mostly)', 'lead', 'Enterprise software, cybersecurity, fintech', '["SailPoint","Proofpoint","Dynatrace"]', 'Robert (Chip) Virnig', 'Partner (Growth)', 'cvirnig@thomabravo.com', 'Leads growth equity investments', 'Thoma Bravo''s growth arm does minority investments in B2B software. Like Vista, $15M is small for them. But they have deep enterprise SaaS expertise.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Robert,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed SailPoint and Proofpoint — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('tribe-capital', 'Tribe Capital', 'Tribe Capital', 'B', 'San Francisco, CA', '$1.6B+ (Fund III)', 'lead', 'Data-driven investing, enterprise, crypto', '["Slack","Carta","Relativity Space"]', 'Arjun Sethi', 'Co-Founder & Partner', 'arjun@tribecap.co', 'Data-driven investor; enterprise focus', 'Tribe backed Relativity Space (advanced manufacturing). They''re data-driven and would dig into CloudNC''s metrics. Arjun Sethi understands deep tech.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Arjun,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Relativity Space — you understand manufacturing innovation. We''re bringing AI to the $29B CNC machining market.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('kleiner-perkins', 'Kleiner Perkins', 'Kleiner Perkins', 'B', 'Menlo Park, CA', '$1.8B+ (Fund XXI)', 'lead', 'Enterprise, consumer, health, hard tech', '["Google","Amazon","Genentech","Figma","various AI companies"]', 'Bucky Moore', 'Partner', 'bucky@kleinerperkins.com', 'Enterprise SaaS, AI, developer tools', 'Kleiner has a legendary brand and active enterprise practice. Bucky Moore focuses on enterprise SaaS and AI. They have the fund size and stage focus for a $15M lead.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Bucky,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your enterprise AI practice is exactly where we sit — AI for a $29B market where the incumbents haven''t innovated in 30 years.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('gv-google-ventures', 'GV (Google Ventures)', 'GV (Google Ventures)', 'B', 'Mountain View, CA', '$5B+ AUM (evergreen CVC)', 'lead', 'Technology broadly — AI, enterprise, life sciences', '["Uber","Slack","Stripe","various industrial/manufacturing"]', 'Dave Munichiello', 'General Partner', 'munichiello@gv.com', 'Enterprise and frontier tech; leads GV''s growth investments', 'GV backed Formlabs and is active in manufacturing-adjacent tech. Google connection means access to AI/ML resources. Evergreen fund = patient capital. They write growth-stage checks.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, 2x YoY growth', 'Hi Dave,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Uber and Slack — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('crv-charles-river-ventures', 'CRV (Charles River Ventures)', 'CRV (Charles River Ventures)', 'B', 'Cambridge, MA / San Francisco, CA', '$2B+ (Fund XIX, 2022)', 'lead', 'Enterprise, consumer, infrastructure', '["DoorDash","HubSpot","Airtable"]', 'Izhar Armony', 'General Partner', 'izhar@crv.com', 'Enterprise software; 25+ years experience', 'CRV is a classic enterprise VC with $2B fund. Izhar Armony''s deep enterprise experience and Boston base (manufacturing heritage region) could be compelling.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Izhar,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed DoorDash and HubSpot — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('energize-capital', 'Energize Capital', 'Energize Capital', 'B', 'Chicago, IL', '$800M (Fund III, 2024)', 'lead', 'Industrial decarbonization, energy transition, manufacturing efficiency', '["SparkCognition","Turntide Technologies","Arcadia"]', 'John Tough', 'Co-Founder & Managing Partner', 'john@energizecap.com', 'Industrial technology and energy investments', 'Energize specifically invests in industrial efficiency technology. Manufacturing CNC optimization reduces waste and energy consumption. SparkCognition (industrial AI) is a comp. Strong thesis match with sustainability angle.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi John,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed SparkCognition for industrial AI — we''re bringing the same transformation to CNC machining, the backbone of manufacturing.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('fifth-wall', 'Fifth Wall', 'Fifth Wall', 'B', 'Los Angeles, CA', '$3.2B AUM', 'lead', 'Built world" technology — real estate, construction, infrastructure, manufacturing', '["Various construction tech and industrial companies"]', 'Brendan Wallace', 'Co-Founder & Managing Partner', 'brendan@fifthwall.com', 'Built environment technology; industrial applications', 'Fifth Wall''s "built world" thesis extends to manufacturing. Construction and manufacturing share supply chain infrastructure. Unique LP base of industrial corporations.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Brendan,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your built-world thesis extends naturally to manufacturing — we''re the AI making CNC machining autonomous.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('bowery-capital', 'Bowery Capital', 'Bowery Capital', 'B', 'New York, NY', '$175M (Fund IV)', 'lead', 'Vertical SaaS, B2B software for traditional industries', '["Various vertical B2B SaaS companies targeting construction","logistics","industrial"]', 'Mike Brown', 'General Partner', 'mike@bowerycap.com', 'Vertical SaaS for traditional industries — exact CloudNC thesis', 'Bowery''s ENTIRE thesis is "vertical B2B software for traditional industries." Manufacturing is a core vertical. Smaller fund may limit lead capacity but very high conviction.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Mike,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your entire thesis is vertical B2B software for traditional industries — CNC machining is about as traditional as it gets.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('tola-capital', 'Tola Capital', 'Tola Capital', 'B', 'Seattle, WA', '$400M+ (Fund III)', 'lead', 'Enterprise software, B2B SaaS, cloud infrastructure', '["Various enterprise software companies"]', 'Sheila Gulati', 'Managing Partner', 'sheila@tolacapital.com', 'Enterprise software, B2B SaaS specialist; ex-Microsoft', 'Tola is a pure enterprise software investor with $400M fund. They understand B2B metrics deeply. CloudNC''s enterprise positioning would fit their thesis.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Sheila,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your pure enterprise software focus and $400M fund align with what we''re building.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('tidemark-partners', 'Tidemark Partners', 'Tidemark Partners', 'B', 'San Francisco, CA', '$600M (Fund I, 2023; David Yuan from TCV)', 'lead', 'B2B software, vertical SaaS, "essential enterprise software', '["Fund is new but David Yuan led TCV''s investment in ExactTarget","Peloton","etc."]', 'David Yuan', 'Co-Founder & Managing Partner', 'david@tidemark.com', 'Former TCV partner; 20+ years enterprise software investing', 'Tidemark is a NEW fund ($600M) from a top TCV partner, specifically focused on vertical SaaS and essential enterprise software. CloudNC is exactly their target profile. New fund = actively deploying.', 'CloudNC — AI for CNC machining, $5.4M ARR, $29B vertical, 915 factories', 'Hi David,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your new fund targeting essential vertical SaaS is exactly our profile — AI for the $29B CNC machining market.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('8090-partners', '8090 Partners', '8090 Partners', 'B', 'San Francisco, CA', '~$200M', 'lead', 'Enterprise SaaS, vertical software', '[]', 'Omar Hamoui', 'Founder', 'omar@8090partners.com', 'Former Google/AdMob; enterprise software investor', 'Focused growth investor in enterprise SaaS. Smaller fund but writes meaningful checks.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Omar,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on enterprise saas, vertical software is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('left-lane-capital', 'Left Lane Capital', 'Left Lane Capital', 'B', 'New York, NY', '$900M (Fund III, 2022)', 'lead', 'Consumer internet, B2B SaaS, technology', '[]', 'Harley Miller', 'Founder & Managing Partner', 'harley@leftlanecap.com', '', 'Left Lane does growth-stage B2B. $900M fund. Active deployer.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, 2x YoY growth', 'Hi Harley,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on consumer internet, b2b saas, technology is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('headline-formerly-e-ventures', 'Headline (formerly e.ventures)', 'Headline (formerly e.ventures)', 'B', 'San Francisco, CA / Berlin', '$950M (Fund VI, 2022)', 'lead', 'Enterprise, consumer, AI — US and Europe', '["Sonos","various enterprise companies"]', 'Akshay Naheta', 'Partner', 'akshay@headline.com', 'Enterprise technology; cross-border investing', 'Headline invests across US and Europe — perfect for UK-based CloudNC. $950M fund can lead. Their cross-border experience is an asset.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Akshay,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Sonos and various enterprise companies — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('foundry-group-now-foundry', 'Foundry Group (now Foundry)', 'Foundry Group (now Foundry)', 'B', 'Boulder, CO', '$1.5B+ AUM', 'lead', 'Technology broadly; thematic investing around protocols and systems', '["Fitbit","MakerBot","various deep tech"]', 'Brad Feld', 'Partner (semi-retired but still active)', 'brad@foundrygroup.com', '', 'Foundry backed MakerBot (3D printing/manufacturing). Brad Feld has spoken about manufacturing renaissance. More philosophical/thematic investors but could be interested.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Brad,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Fitbit and MakerBot — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('stripes-formerly-stripes-group', 'Stripes (formerly Stripes Group)', 'Stripes (formerly Stripes Group)', 'B', 'New York, NY', '$1B+ (Fund VI)', 'lead', 'Internet-enabled businesses, B2B software, vertical SaaS', '["Glassdoor","Harry''s","various vertical software"]', 'Ken Fox', 'Founder & Managing Partner', 'ken@stripes.co', 'Vertical software growth equity', 'Stripes specifically invests in vertical software companies. Growth equity approach. $1B fund can lead $15M.', 'CloudNC — AI for CNC machining, $5.4M ARR, $29B vertical, 915 factories', 'Hi Ken,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Glassdoor and Harry''s — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('lead-edge-capital', 'Lead Edge Capital', 'Lead Edge Capital', 'B', 'New York, NY', '$1.5B+ (Fund VI)', 'lead', 'B2B SaaS, technology growth companies', '["Alibaba","Spotify","Bumble","various B2B SaaS"]', 'Mitchell Green', 'Founder & Managing Partner', 'mgreen@leadedgecapital.com', 'Growth-stage B2B specialist', 'Lead Edge is a dedicated growth equity firm for B2B technology. $1.5B fund, they write $10-50M checks. They look for exactly CloudNC''s profile.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, 2x YoY growth', 'Hi Mitchell,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your dedicated B2B growth equity focus fits perfectly — CloudNC is vertical SaaS for the $29B CNC machining market.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('signalfire', 'SignalFire', 'SignalFire', 'B', 'San Francisco, CA', '$1.8B+ AUM', 'lead', 'Data-driven investing; enterprise, infrastructure, AI', '["Various AI and enterprise companies"]', 'Chris Farmer', 'Founder & CEO', 'chris@signalfire.com', 'Data-driven enterprise investor; ex-General Catalyst', 'SignalFire is data-driven (they crawl the entire internet for deal signals). CloudNC''s strong public metrics and media presence would trigger their system. Active AI investor.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Chris,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your data-driven approach will flag CloudNC''s metrics — $5.4M ARR, 2x YoY, 915 factories in a $29B market.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('thomvest-ventures', 'Thomvest Ventures', 'Thomvest Ventures', 'B', 'San Francisco, CA', 'Evergreen (Thomson Reuters family office venture arm)', 'lead', 'Enterprise software, AI, fintech', '["Various enterprise software companies"]', 'Umesh Padval', 'Managing Director', 'umesh@thomvest.com', 'Enterprise infrastructure and applied AI', 'Thomvest is the venture arm of the Thomson Reuters family. Evergreen capital = patient investor. Enterprise software focus. Not the best-known brand but writes growth checks.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Umesh,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Various enterprise software companies — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('upfront-ventures', 'Upfront Ventures', 'Upfront Ventures', 'B', 'Los Angeles, CA', '$650M (Fund VII)', 'lead', 'Enterprise, consumer, frontier tech', '["Ring","TrueCar","various B2B"]', 'Mark Suster', 'Managing Partner', 'mark@upfront.com', 'B2B SaaS specialist; prolific writer on SaaS metrics', 'Mark Suster writes extensively about B2B SaaS metrics and has expressed interest in vertical software. LA-based but invests nationally. $650M fund can support Series C lead.', 'CloudNC — AI for CNC machining, $5.4M ARR, $29B vertical, 915 factories', 'Hi Mark,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Ring and TrueCar — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('information-venture-partners', 'Information Venture Partners', 'Information Venture Partners', 'B', 'Toronto, Canada (invests in US)', '$120M', 'lead', 'B2B enterprise software, specifically industrial and financial', '[]', 'Rob Chicken', 'Managing Partner', 'rob@informationvp.com', 'Enterprise industrial software specifically', 'IVP specifically targets industrial enterprise software. Smaller fund but exactly the right thesis. Canadian but invests in US/UK.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Rob,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on b2b enterprise software, specifically industrial and financial is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('mfv-partners', 'MFV Partners', 'MFV Partners', 'B', 'New York, NY', '$200M+', 'lead', 'Manufacturing, food, vertical industries', '[]', 'Andrew Muller', 'Managing Partner', 'Check firm website', 'Manufacturing technology investor', 'If still active, directly relevant to manufacturing software.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Andrew,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on manufacturing, food, vertical industries is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('xn', 'XN', 'XN', 'B', 'New York, NY', '$1.3B+ (Fund III, 2022)', 'lead', 'Enterprise SaaS, marketplace, consumer internet', '["HireVue","1stDibs","various enterprise SaaS"]', 'Salil Deshpande', 'Partner', 'salil@xn.vc', 'Enterprise SaaS growth', 'XN (formerly True Ventures) writes growth checks in enterprise SaaS. $1.3B fund can easily lead $15M.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Salil,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed HireVue and 1stDibs — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('accel-kkr', 'Accel-KKR', 'Accel-KKR', 'B', 'Menlo Park, CA', '$4B+ AUM (growth equity)', 'lead', 'Technology, specifically mid-market enterprise software', '["SolarWinds","Genesys","SonarSource"]', 'Tom Barnds', 'Managing Director', 'tbarnds@accel-kkr.com', 'Mid-market software growth', 'Accel-KKR is a dedicated mid-market software growth investor. They understand B2B SaaS metrics deeply. $15M is within range.', 'CloudNC — AI for CNC machining, $5.4M ARR, AI for $29B CNC market', 'Hi Tom,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed SolarWinds and Genesys — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('wellington-management-venture', 'Wellington Management (Venture)', 'Wellington Management (Venture)', 'C', 'Boston, MA', '$1.4T AUM (massive asset manager; venture arm is small portion)', 'lead', 'Broad — technology, healthcare', '[]', 'John Kuelper', 'VP / Growth Equity', 'jkuelper@wellington.com', '', 'Wellington does selective private technology investments. Huge brand, patient capital. $15M is tiny for them.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi John,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on broad — technology, healthcare is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('harmony-partners', 'Harmony Partners', 'Harmony Partners', 'C', 'New York, NY', '$300M+', 'lead', 'Enterprise software, B2B', '[]', 'Mark Lotke', 'Founder', 'mark@harmonypartners.com', '', 'Enterprise software growth investor.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Mark,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on enterprise software, b2b is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('cota-capital', 'Cota Capital', 'Cota Capital', 'C', 'San Francisco, CA', '$250M+', 'lead', 'Enterprise software, cybersecurity', '[]', 'Bobby Yazdani', 'Founder & Managing Partner', 'bobby@cotacapital.com', '', 'Enterprise SaaS growth investor.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Bobby,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on enterprise software, cybersecurity is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('owl-ventures', 'Owl Ventures', 'Owl Ventures', 'C', 'San Francisco, CA', '$1B+ (multiple funds)', 'lead', 'Education technology and workforce development', '[]', 'Amit Patel', 'Managing Director', 'amit@owlvc.com', '', 'Lower fit — edtech focus. But workforce training for CNC (CloudNC''s vision of making machining accessible) could stretch to their thesis. Long shot.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Amit,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on education technology and workforce development is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('01-advisors', '01 Advisors', '01 Advisors', 'C', 'San Francisco, CA', '$250M+', 'lead', 'Enterprise, consumer — run by Dick Costolo (ex-Twitter CEO) and Adam Bain', '[]', 'Dick Costolo', 'Managing Partner', 'dick@01advisors.com', '', 'Dick Costolo invests in enterprise growth companies. Not industrial-specific but understands category-defining SaaS.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Dick,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on enterprise, consumer — run by dick costolo (ex-twitter ceo) and adam bain is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('sageview-capital', 'Sageview Capital', 'Sageview Capital', 'C', 'Greenwich, CT', '$500M+', 'lead', 'Technology, media, consumer', '[]', 'Ned Gilhuly', 'Managing Partner', 'ned@sageviewcapital.com', '', 'Growth investor with tech focus. Not specific to industrial but writes the right size checks.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Ned,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on technology, media, consumer is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('adams-street-partners', 'Adams Street Partners', 'Adams Street Partners', 'C', 'Chicago, IL', '$56B AUM', 'lead', 'Technology, healthcare growth', '[]', 'Jeff Diehl', 'Managing Partner & Head of Investments', 'jdiehl@adamsstreetpartners.com', '', 'Large AUM, does direct growth equity co-investments in tech.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Jeff,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on technology, healthcare growth is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('geodesic-capital', 'Geodesic Capital', 'Geodesic Capital', 'C', 'San Francisco, CA', '$500M+', 'lead', 'Enterprise software, AI — Japan/US cross-border', '["Various enterprise AI companies"]', 'Albert Wenger', 'Partner (note: also at USV)', '', 'Check firm website for specific contacts', 'Japan connection interesting — major CNC machine manufacturers are Japanese (Mazak, Okuma, Fanuc). Cross-border thesis could unlock Japanese strategic partnerships.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Albert,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Various enterprise AI companies — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('warburg-pincus', 'Warburg Pincus', 'Warburg Pincus', 'C', 'New York, NY', '$82B AUM', 'lead', 'Technology, healthcare, industrial, financial services', '[]', 'Adarsh Sarma', 'Managing Director (Technology)', 'adarsh.sarma@warburgpincus.com', '', 'Warburg has an industrial vertical and technology growth practice. Massive AUM. $15M is tiny for them but they sometimes do growth minority positions.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Adarsh,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on technology, healthcare, industrial, financial services is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('general-atlantic', 'General Atlantic', 'General Atlantic', 'C', 'New York, NY', '$84B AUM', 'lead', 'Technology, consumer, healthcare', '["Airbnb","ByteDance","various enterprise software"]', 'Anton Levy', 'Co-President & Global Head of Technology', 'alevy@generalatlantic.com', '', 'General Atlantic is a premier growth equity firm. $15M is small for them but they sometimes write smaller checks for high-conviction opportunities. Strong enterprise tech practice.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Anton,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Airbnb and ByteDance — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('hercules-capital', 'Hercules Capital', 'Hercules Capital', 'C', 'Palo Alto, CA', '$3.5B+ (venture lending / growth)', 'lead', 'Technology, life sciences', '[]', 'Scott Bluestein', 'CEO', 'sbluestein@htgc.com', '', 'Venture debt + equity. Could provide debt component alongside equity round.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Scott,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on technology, life sciences is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('sands-capital-ventures', 'Sands Capital Ventures', 'Sands Capital Ventures', 'C', 'Arlington, VA', '$14B+ AUM (venture is portion)', 'lead', 'High-growth technology businesses', '[]', 'Michael Clarke', 'Research Analyst (Technology)', 'mclarke@sandscapital.com', '', 'Sands does growth-stage technology investing. Arlington, VA location = defense community adjacency.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Michael,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on high-growth technology businesses is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('touring-capital', 'Touring Capital', 'Touring Capital', 'C', 'San Francisco, CA', '$465M (Fund I, 2024 — new fund)', 'lead', 'B2B software, AI', '[]', 'Alex Kayyal', 'Co-Founder & Managing Partner (ex-Salesforce Ventures)', 'alex@touringcapital.com', '', 'Brand new fund actively deploying into B2B software and AI. Alex Kayyal ran Salesforce Ventures. Very active in space.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Alex,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on b2b software, ai is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('notable-capital-formerly-ggv-capital-s-us-fund', 'Notable Capital (formerly GGV Capital''s US fund)', 'Notable Capital (formerly GGV Capital''s US fund)', 'C', 'San Francisco, CA', '$2.5B+ (Fund IX)', 'lead', 'Enterprise, consumer — global', '["Slack","Zendesk","Alibaba"]', 'Glenn Solomon', 'Managing Partner', 'glenn@notablecap.com', 'Enterprise / B2B SaaS', 'Notable (rebranded from GGV) is a top-tier enterprise investor. Glenn Solomon''s SaaS expertise is well-known. $2.5B fund can lead.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Glenn,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Slack and Zendesk — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('sutter-hill-ventures', 'Sutter Hill Ventures', 'Sutter Hill Ventures', 'C', 'Palo Alto, CA', '$600M+ (Fund XIV)', 'lead', 'Enterprise infrastructure, B2B', '["Snowflake","Pure Storage","Vlocity"]', 'Mike Speiser', 'Managing Director', 'mike@shv.com', 'Enterprise infrastructure; incubated Snowflake', 'Sutter Hill is legendary for enterprise infrastructure. Incubated Snowflake. CloudNC''s AI infrastructure for manufacturing could appeal. Very selective.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Mike,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You incubated Snowflake — you know what it looks like to build infrastructure for an industry. We''re doing that for CNC manufacturing.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('sozo-ventures', 'Sozo Ventures', 'Sozo Ventures', 'C', 'San Francisco, CA / Japan', '$600M+', 'lead', 'Cross-border US/Japan technology', '[]', 'Phil Wickham', 'Founder & Managing Partner', 'phil@sozoventures.com', '', 'Japan cross-border again interesting for CNC industry (Japanese machine makers). Could unlock distribution partnerships.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Phil,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on cross-border us/japan technology is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('storm-ventures', 'Storm Ventures', 'Storm Ventures', 'C', 'Menlo Park, CA', '$200M+', 'lead', 'Enterprise SaaS, pure B2B', '[]', 'Ryan Floyd', 'Managing Director', 'ryan@stormventures.com', 'Enterprise SaaS specialist', 'Pure enterprise SaaS investor. Smaller fund but very focused.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Ryan,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on enterprise saas, pure b2b is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('openview-partners', 'OpenView Partners', 'OpenView Partners', 'C', 'Boston, MA', '$1.4B (Fund VII, 2022)', 'lead', 'Product-led growth (PLG) enterprise software', '["Calendly","Datadog","Expensify"]', 'Blake Bartlett', 'Partner', 'blake@openviewpartners.com', 'PLG enterprise software; coined "product-led growth" term', 'OpenView is THE PLG enterprise software investor. CloudNC has PLG motion (self-serve + sales-assisted). $1.4B fund, growth-stage focus, Boston HQ. Strong fit.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Blake,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You coined product-led growth for enterprise software — CAM Assist has a self-serve motion that converts factories from free trial to enterprise contracts.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('point72-ventures', 'Point72 Ventures', 'Point72 Ventures', 'C', 'Stamford, CT', '$1.5B+ AUM', 'lead', 'Applied AI, enterprise, data infrastructure', '["Various AI and data companies"]', 'Sri Chandrasekar', 'Managing Partner', 'sri@point72.com', 'Applied AI and enterprise data', 'Point72''s venture arm invests in applied AI. Steve Cohen backing. Sophisticated data-driven investors who would understand CloudNC''s AI approach.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Sri,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your applied AI thesis fits perfectly — we''ve built the only AI that can autonomously program CNC machines.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('two-sigma-ventures', 'Two Sigma Ventures', 'Two Sigma Ventures', 'C', 'New York, NY', '$400M+ (Fund III)', 'lead', 'Data science, AI, machine learning — applied to real-world problems', '["Flatiron Health","various AI/ML companies"]', 'Mark Phillips', 'Managing Director', 'mphillips@twosigmaventures.com', 'Applied AI / enterprise data investments', 'Two Sigma Ventures specifically invests in companies that apply data science/AI to real-world problems. CloudNC''s AI for CNC manufacturing is a textbook case. Quantitative heritage means they''ll dig into the technology.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Mark,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on applying data science to real-world problems is exactly what CloudNC does — AI for CNC machining where LLMs score 0% and we score 82%.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('m12-microsoft-s-vc-arm', 'M12 (Microsoft''s VC arm)', 'M12 (Microsoft''s VC arm)', 'C', 'San Francisco, CA', 'Evergreen (Microsoft-backed)', 'lead', 'Enterprise, AI — strategic to Microsoft ecosystem', '["Various enterprise AI companies"]', 'Todd Graham', 'Managing Director', 'tgraham@m12.vc', 'Enterprise AI investments', 'Microsoft is pushing into industrial AI (Azure IoT, Dynamics). CloudNC''s manufacturing AI could be strategic. M12 can open Microsoft partnership doors.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Todd,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

You backed Various enterprise AI companies — we''re solving the AI layer that manufacturing has been waiting for.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('samsung-next', 'Samsung NEXT', 'Samsung NEXT', 'C', 'San Francisco, CA / Mountain View, CA', '$1.5B+ (evergreen CVC)', 'lead', 'AI, data infrastructure, hardware-software convergence', '[]', 'David Lee', 'Managing Partner', 'david@samsungnext.com', '', 'Samsung makes CNC machine components (controls, drives). Strategic angle plus CVC flexibility.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi David,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on ai, data infrastructure, hardware-software convergence is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('salesforce-ventures', 'Salesforce Ventures', 'Salesforce Ventures', 'C', 'San Francisco, CA', '$5B+ AUM (largest CVC)', 'lead', 'Enterprise cloud and AI — strategic to Salesforce ecosystem', '[]', 'Alex Kayyal', 'former head (now at Touring Capital)', 'jsomorjai@salesforce.com', '', 'Salesforce is the largest enterprise SaaS CVC. CloudNC''s CRM data could integrate with Salesforce ecosystem. $5B AUM means $15M is trivial.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Alex,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on enterprise cloud and ai — strategic to salesforce ecosystem is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('bond-capital-mary-meeker', 'Bond Capital (Mary Meeker)', 'Bond Capital (Mary Meeker)', 'C', 'Menlo Park, CA', '$6.5B (Fund III, 2023)', 'lead', 'Technology growth companies', '[]', 'Mary Meeker', 'Founder & General Partner', 'mary@bondcap.com', 'Iconic growth investor; Internet Trends report', 'Bond writes large growth checks. Mary Meeker has highlighted AI and manufacturing in Internet Trends. $6.5B fund. Very selective but strong AI/manufacturing convergence thesis.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Mary,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on technology growth companies is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('bedrock-capital', 'Bedrock Capital', 'Bedrock Capital', 'C', 'San Francisco, CA', '$600M+ (Fund III)', 'lead', 'Narrative violations" — companies that defy conventional wisdom', '[]', 'Geoff Lewis', 'Co-Founder', 'geoff@bedrockcap.com', '', 'Bedrock invests in "narrative violations." CloudNC''s thesis — that AI will make CNC machining as accessible as 3D printing, counter to the narrative that manufacturing is a dying industry — is exactly a narrative violation.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Geoff,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

We''re a narrative violation — everyone thinks manufacturing is dying, but we''re proving AI can make it boom. 915 factories agree.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('citi-ventures', 'Citi Ventures', 'Citi Ventures', 'C', 'San Francisco, CA', 'Evergreen (Citigroup CVC)', 'lead', 'Fintech, enterprise, data — strategic to Citi', '[]', 'Arvind Purushotham', 'Managing Director & Global Head', 'arvind.purushotham@citi.com', '', 'Citi Ventures invests in enterprise tech. Lower thesis fit but large CVC with flexible mandate.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Arvind,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on fintech, enterprise, data — strategic to citi is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
INSERT OR IGNORE INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body) VALUES ('hedosophia-founded-by-ian-osborne', 'Hedosophia (founded by Ian Osborne)', 'Hedosophia (founded by Ian Osborne)', 'C', 'London / New York', '$3B+ AUM', 'lead', 'Technology growth companies', '[]', 'Ian Osborne', 'Founder', 'ian@hedosophia.com', '', 'London/NY, understands UK tech, growth-stage. Lower specificity but right stage/geography.', 'CloudNC — AI for CNC machining, $5.4M ARR, $5.4M ARR, Autodesk-backed AI', 'Hi Ian,

I''m Theo, co-founder of CloudNC. We''ve built an AI that automates CNC machining programming — the cognitive bottleneck in every machine shop worldwide.

Your thesis on technology growth companies is exactly the space we''re defining.

Quick numbers: $5.4M ARR (2x YoY), 915 factories, backed by Autodesk ($45M Series B), Lockheed Martin, and In-Q-Tel. Raising $15M to scale US go-to-market.

I''m running a structured process — 30-minute intros this week, follow-ups next week for firms that want in. Happy to send the deck if there''s interest.

Best,
Theo Saville
CEO & Co-Founder, CloudNC
theo@cloudnc.com');
