# 🌍 EcoSphere — ESG Management Platform

- An ESG (Environmental, Social, Governance) management system built natively on Odoo.

Built for **Odoo Hackathon 2026** — Problem Statement: *EcoSphere: ESG Management Platform*.

Most ERP systems collect operational data, but ESG reporting is still manual, disconnected,
and hard to monitor in real time. EcoSphere integrates ESG directly into day-to-day ERP
operations — measuring sustainability metrics, encouraging employee participation, and
producing meaningful reports for management, all inside Odoo.

---

## ✨ Features

### 🌱 Environmental
- Configurable Emission Factors
- Automatic & manual Carbon Transaction calculation
- Department-level carbon tracking
- Sustainability Goals with progress tracking
- Environmental Dashboard

### 🤝 Social
- CSR Activities with participation workflow
- Employee participation with proof upload & approval
- Points/XP awarded on approval
- Diversity & training-completion tracking

### 🏛️ Governance
- ESG Policies with versioning
- Policy Acknowledgements with automated reminders
- Audits and Compliance Issues
- Ownership + due dates on every issue, with automatic overdue flagging

### 🎮 Gamification
- Challenges with full lifecycle: `Draft → Active → Under Review → Completed / Archived`
- XP and redeemable Points
- Auto-awarded Badges based on configurable unlock rules
- Redeemable Rewards catalogue (stock-aware)
- Leaderboard

### 📊 Reports
- Environmental / Social / Governance / ESG Summary reports
- Custom Report Builder wizard — filter by Department, Date Range, Employee,
  Challenge, or ESG Category
- PDF export (ESG Summary), screen/pivot/graph export for the rest

### ⚙️ Settings & Administration
- Configurable ESG category weighting (default: Environmental 40% / Social 30% / Governance 30%)
- Toggle: Auto Emission Calculation
- Toggle: Evidence Requirement (proof needed before approval)
- Toggle: Badge Auto-Award
- Notification settings (compliance issues, approvals, policy reminders, badge unlocks)

---

## 🏗️ Business Workflow

```
Master Configuration
   Departments · Categories · Emission Factors · Products · Goals · Policies · Challenges
        │
        ▼
Daily Business Operations (Purchase · Manufacturing · Expenses · Fleet)
        │
        ▼
Carbon Transactions
        │
        ▼
Employee Participation (CSR) · Challenge Participation · Policy Acknowledgements · Audits
        │
        ▼
Environmental Score · Social Score · Governance Score
        │
        ▼
Department Total Score
        │
        ▼
Overall ESG Score (weighted average, configurable per organisation)
        │
        ▼
Organisation Dashboard & Reports
```

---

## 🚀 Installation

1. Copy the `ecosphere_esg` folder into your Odoo `addons` path.
2. Restart the Odoo server.
3. Go to **Apps** → remove the "Apps" filter → search **EcoSphere ESG Management Platform** → **Install**.

```bash
./odoo-bin -c odoo.conf -d your_db -i ecosphere_esg
```

Depends on: `base`, `mail`, `hr`, `purchase`, `mrp`, `hr_expense`, `fleet`
(installed automatically if not already present).

Demo data is included, so the app is explorable immediately after install:
3 departments, 4 categories, 3 emission factors, 2 policies, 3 badges,
2 rewards, 1 CSR activity, and 1 active challenge.

---

## 📁 Module Structure

```
ecosphere_esg/
├── models/       # 20 model files — master + transactional data
├── views/        # list / form / kanban / graph / pivot views + menus
├── wizard/       # Custom Report Builder
├── report/       # QWeb PDF report (ESG Summary)
├── security/     # groups + access rights
├── data/         # sequence, cron, demo data
└── static/description/
```

---

## 🧩 Data Model Overview

| Master Data | Transactional Data |
|---|---|
| Department | Carbon Transaction |
| Category (CSR / Challenge) | CSR Activity |
| Emission Factor | Employee Participation |
| Product ESG Profile | Challenge |
| Environmental Goal | Challenge Participation |
| ESG Policy | Policy Acknowledgement |
| Badge | Audit |
| Reward | Compliance Issue |
| | Department Score |

---

## 📝 Notes & Assumptions

- Score formula** — a clearly commented, simple normalisation is provided as a
  working starting point (lower emissions → higher Environmental score, approved
  CSR participation → Social score, open compliance issues → Governance score.
  Tune it to your organisation's actual methodology.
- Auto Emission Calculation** exposes a reusable hook
  (`esg.carbon.transaction._auto_generate_from_document`) ready to be wired into
  Purchase / Manufacturing / Expense / Fleet `create()`/state-change methods.
- Custom Report Builder** exports to screen (list/pivot/graph) for all reports
  types, and to PDF for the ESG Summary report as a working example.

---
