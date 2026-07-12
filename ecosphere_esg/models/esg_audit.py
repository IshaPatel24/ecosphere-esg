# -*- coding: utf-8 -*-
from odoo import fields, models


class EsgAudit(models.Model):
    _name = 'esg.audit'
    _description = 'Governance Audit'
    _inherit = ['mail.thread']
    _order = 'date desc'

    name = fields.Char(required=True, tracking=True)
    department_id = fields.Many2one('esg.department', tracking=True)
    audit_type = fields.Char()
    auditor_id = fields.Many2one('res.users', string='Auditor', default=lambda self: self.env.user)
    date = fields.Date(default=fields.Date.context_today, required=True)
    findings = fields.Text()
    status = fields.Selection([
        ('planned', 'Planned'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ], default='planned', required=True, tracking=True)
    compliance_issue_ids = fields.One2many('esg.compliance.issue', 'audit_id', string='Compliance Issues')
    issue_count = fields.Integer(compute='_compute_issue_count')

    def _compute_issue_count(self):
        for rec in self:
            rec.issue_count = len(rec.compliance_issue_ids)

    def action_view_issues(self):
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'name': 'Compliance Issues',
            'res_model': 'esg.compliance.issue',
            'view_mode': 'list,form',
            'domain': [('audit_id', '=', self.id)],
            'context': {'default_audit_id': self.id},
        }
