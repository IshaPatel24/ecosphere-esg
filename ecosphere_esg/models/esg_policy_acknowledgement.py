# -*- coding: utf-8 -*-
from odoo import fields, models


class EsgPolicyAcknowledgement(models.Model):
    _name = 'esg.policy.acknowledgement'
    _description = 'Policy Acknowledgement'
    _inherit = ['mail.thread']
    _order = 'id desc'

    policy_id = fields.Many2one('esg.policy', required=True, ondelete='cascade')
    employee_id = fields.Many2one('hr.employee', required=True)
    acknowledged_date = fields.Date()
    status = fields.Selection([
        ('pending', 'Pending'),
        ('acknowledged', 'Acknowledged'),
    ], default='pending', required=True, tracking=True)
    reminder_sent = fields.Boolean(default=False)

    _sql_constraints = [
        ('policy_employee_unique', 'unique(policy_id, employee_id)',
         'This employee already has an acknowledgement record for this policy.'),
    ]

    def action_acknowledge(self):
        for rec in self:
            rec.write({'status': 'acknowledged', 'acknowledged_date': fields.Date.context_today(rec)})

    def _send_reminder_notification(self):
        for rec in self:
            if rec.employee_id.user_id:
                rec.message_post(
                    body="Reminder: please acknowledge the policy '%s'." % rec.policy_id.name,
                    partner_ids=rec.employee_id.user_id.partner_id.ids,
                )
            rec.reminder_sent = True
