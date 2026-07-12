# EcoSphere — ESG Management Platform

An Odoo 17 addon that integrates Environmental, Social and Governance (ESG)
measurement directly into day-to-day ERP operations, with built-in
gamification (Challenges, XP, Badges, Rewards, Leaderboards).

Built for **Odoo Hackathon 2026** — problem statement: *EcoSphere: ESG
Management Platform*.

## Installation

1. Copy the `ecosphere_esg` folder into your Odoo `addons` path (e.g.
   `odoo/addons/` or a custom addons-path directory).
2. Restart the Odoo server.
3. Go to **Apps**, remove the "Apps" filter, search for **EcoSphere ESG
   Management Platform**, and click **Install**.
   (Dependencies `base`, `mail`, `hr`, `purchase`, `mrp`, `hr_expense`,
   `fleet` will be installed automatically if not already present.)

```bash
# example (odoo-bin)
./odoo-bin -c odoo.conf -d your_db -i ecosphere_esg
```

## Module Structure

```
ecosphere_esg/
├── __init__.py
├── __manifest__.py
├── models/                # 20 model files (master + transactional data)
├── views/                 # list/form/kanban/graph/pivot views + menus
├── wizard/                 # Custom Report Builder wizard
├── report/                 # QWeb PDF report (ESG Summary)
├── security/                # groups + access rights
├── data/                   # sequence, cron, demo data
└── static/description/     # module icon
```

## Feature Coverage (per problem statement)

| Area | Implemented |
|---|---|
| **Master Data** | Department, Category, Emission Factor, Product ESG Profile, Environmental Goal, ESG Policy, Badge, Reward |
| **Transactional Data** | Carbon Transaction, CSR Activity, Employee Participation, Challenge, Challenge Participation, Policy Acknowledgement, Audit, Compliance Issue, Department Score |
| **Environmental** | Emission factor config, carbon calc, department carbon tracking, sustainability goals, environmental dashboard |
| **Social** | CSR activities, employee participation with proof/approval, gamified points |
| **Governance** | Policies, acknowledgements, audits, compliance issues with owner/due-date + automatic overdue flagging (daily cron) |
| **Gamification** | Challenge lifecycle (Draft → Active → Under Review → Completed / Archived), XP, auto-awarded Badges, redeemable Rewards, Leaderboard |
| **Reports** | Environmental / Social / Governance / ESG Summary via Custom Report Builder wizard (filters: Department, Date Range, Employee, Challenge, ESG Category); PDF export for ESG Summary; screen/pivot/graph export for the others |
| **Settings** | Configurable ESG category weights (default 40/30/30), Auto Emission Calculation toggle, Evidence Requirement toggle, Badge Auto-Award toggle, Notification toggles |
| **Business Rules** | Reward redemption deducts points & stock; notifications on new compliance issue, approval decisions, policy reminders, badge unlocks; evidence required before approval when enabled; badge auto-award on XP/CSR/Challenge thresholds; compliance issues require Owner + Due Date and are auto-flagged when overdue |

## Notes & Assumptions

* This module was built from the published problem-statement PDF. A few
  implementation choices were made where the spec left room for
  interpretation:
  * **Score formula** (`esg.department.score.action_recompute_from_operational_data`)
    uses a simple, clearly-commented normalization (lower emissions → higher
    Environmental score, approved CSR participation count → Social score,
    open compliance issues → Governance score). This is intended as a
    working starting point — tune the formula to your organization's real
    methodology.
  * **Auto Emission Calculation** exposes a reusable hook
    (`esg.carbon.transaction._auto_generate_from_document`) that
    Purchase/Manufacturing/Expense/Fleet integrations can call; wiring it to
    each source module's `create()`/state-change methods is a natural next
    step once the exact mapping to Emission Factors is decided.
  * **Custom Report Builder** exports to screen (list/pivot/graph) for all
    report types and to PDF for the ESG Summary Report as a working example;
    Excel/CSV export can reuse Odoo's standard list-view export or be added
    via `report_xlsx` if that module is available in your environment.

## Demo Data

Installing with demo data enabled seeds: 3 departments, 4 categories, 3
emission factors, 2 policies, 3 badges, 2 rewards, 1 CSR activity and 1
active challenge, so the app is explorable immediately after install.

## License

LGPL-3
