# -*- coding: utf-8 -*-
{
    'name': 'EcoSphere ESG Management Platform',
    'version': '17.0.1.0.0',
    'category': 'Sustainability',
    'summary': 'Environmental, Social & Governance management with gamification, built on Odoo',
    'description': """
EcoSphere: ESG Management Platform
===================================
Integrates ESG (Environmental, Social, Governance) measurement directly into
day-to-day ERP operations.

Environmental
-------------
* Emission Factors, Carbon Transactions (auto/manual), Department Carbon Tracking
* Environmental Goals and Environmental Dashboard

Social
------
* CSR Activities and Employee Participation (with proof / approval workflow)
* Diversity metrics, training completion tracking

Governance
----------
* ESG Policies, Policy Acknowledgements
* Audits and Compliance Issues (with ownership, due dates, overdue flagging)

Gamification
------------
* Challenges (Draft -> Active -> Under Review -> Completed / Archived)
* XP, Badges (auto-award), Rewards (redeemable), Leaderboards

Reports
-------
* Environmental / Social / Governance / ESG Summary reports
* Custom Report Builder with filters (Department, Date Range, Module,
  Employee, Challenge, ESG Category)

Settings
--------
* Configurable Environmental/Social/Governance weighting (default 40/30/30)
* Toggle: Auto Emission Calculation, Evidence Requirement, Badge Auto-Award
* Notification settings for compliance issues, approvals, policy reminders, badges
    """,
    'author': 'Odoo Hackathon 2026 Team',
    'website': '',
    'license': 'LGPL-3',
    'depends': ['base', 'mail', 'hr', 'purchase', 'mrp', 'hr_expense', 'fleet'],
    'data': [
        'security/esg_security.xml',
        'security/ir.model.access.csv',
        'data/esg_sequence.xml',
        'data/esg_cron.xml',
        'data/esg_mail_templates.xml',
        'data/esg_demo_data.xml',
        'views/esg_department_views.xml',
        'views/esg_category_views.xml',
        'views/esg_emission_factor_views.xml',
        'views/esg_product_profile_views.xml',
        'views/esg_environmental_goal_views.xml',
        'views/esg_carbon_transaction_views.xml',
        'views/esg_policy_views.xml',
        'views/esg_policy_acknowledgement_views.xml',
        'views/esg_audit_views.xml',
        'views/esg_compliance_issue_views.xml',
        'views/esg_csr_activity_views.xml',
        'views/esg_employee_participation_views.xml',
        'views/esg_challenge_views.xml',
        'views/esg_challenge_participation_views.xml',
        'views/esg_badge_views.xml',
        'views/esg_reward_views.xml',
        'views/esg_reward_redemption_views.xml',
        'views/esg_department_score_views.xml',
        'views/hr_employee_views.xml',
        'views/res_config_settings_views.xml',
        'views/esg_dashboard_views.xml',
        'views/esg_menus.xml',
        'wizard/esg_report_wizard_views.xml',
        'report/esg_report_templates.xml',
    ],
    'demo': [],
    'installable': True,
    'application': True,
    'auto_install': False,
}
