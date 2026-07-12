# -*- coding: utf-8 -*-
from odoo import api, fields, models


class EsgPolicy(models.Model):
    _name = 'esg.policy'
    _description = 'ESG Policy'
    _inherit = ['mail.thread']
    _order = 'name'

    name = fields.Char(required=True, tracking=True)
    category = fields.Selection([
        ('environmental', 'Environmental'),
        ('social', 'Social'),
        ('governance', 'Governance'),
    ], required=True, default='governance', tracking=True)
    description = fields.Text()
    document = fields.Binary(string='Policy Document')
    document_name = fields.Char()
    version = fields.Char(default='1.0')
    effective_date = fields.Date(default=fields.Date.context_today)
    active = fields.Boolean(default=True)
    acknowledgement_ids = fields.One2many('esg.policy.acknowledgement', 'policy_id')
    acknowledgement_rate = fields.Float(compute='_compute_ack_rate', string='Acknowledgement Rate (%)')

    def _compute_ack_rate(self):
        for rec in self:
            total = len(rec.acknowledgement_ids)
            done = len(rec.acknowledgement_ids.filtered(lambda a: a.status == 'acknowledged'))
            rec.acknowledgement_rate = (done / total * 100.0) if total else 0.0

    @api.model_create_multi
    def create(self, vals_list):
        records = super().create(vals_list)
        employees = self.env['hr.employee'].search([('active', '=', True)])
        ack_vals = []
        for rec in records:
            for emp in employees:
                ack_vals.append({
                    'policy_id': rec.id,
                    'employee_id': emp.id,
                    'status': 'pending',
                })
        if ack_vals:
            self.env['esg.policy.acknowledgement'].create(ack_vals)
        return records

    def action_send_reminders(self):
        """Send policy acknowledgement reminders to employees who haven't acknowledged yet."""
        pending = self.acknowledgement_ids.filtered(lambda a: a.status == 'pending')
        for ack in pending:
            ack._send_reminder_notification()
        return True
