# -*- coding: utf-8 -*-
from odoo import fields, models


class ResConfigSettingsEsg(models.TransientModel):
    _inherit = 'res.config.settings'

    esg_weight_environmental = fields.Float(
        string='Environmental Weight (%)', default=40.0,
        config_parameter='ecosphere_esg.weight_environmental')
    esg_weight_social = fields.Float(
        string='Social Weight (%)', default=30.0,
        config_parameter='ecosphere_esg.weight_social')
    esg_weight_governance = fields.Float(
        string='Governance Weight (%)', default=30.0,
        config_parameter='ecosphere_esg.weight_governance')

    esg_auto_emission_calc = fields.Boolean(
        string='Auto Emission Calculation',
        config_parameter='ecosphere_esg.auto_emission_calc',
        help='Automatically create Carbon Transactions from Purchase / Manufacturing / '
             'Expense / Fleet records using the relevant Emission Factor.')
    esg_evidence_required = fields.Boolean(
        string='Evidence Requirement',
        config_parameter='ecosphere_esg.evidence_required',
        help='CSR / Challenge participation cannot be approved without an attached proof file.')
    esg_badge_auto_award = fields.Boolean(
        string='Badge Auto-Award',
        config_parameter='ecosphere_esg.badge_auto_award',
        help='Automatically assign badges the moment an employee satisfies the unlock rule.')

    esg_notify_compliance = fields.Boolean(
        string='Notify: New Compliance Issue',
        config_parameter='ecosphere_esg.notify_compliance', default=True)
    esg_notify_approval = fields.Boolean(
        string='Notify: CSR / Challenge Approval Decisions',
        config_parameter='ecosphere_esg.notify_approval', default=True)
    esg_notify_policy_reminder = fields.Boolean(
        string='Notify: Policy Acknowledgement Reminders',
        config_parameter='ecosphere_esg.notify_policy_reminder', default=True)
    esg_notify_badge = fields.Boolean(
        string='Notify: Badge Unlocks',
        config_parameter='ecosphere_esg.notify_badge', default=True)
