# -*- coding: utf-8 -*-
from odoo import api, fields, models


class EsgComplianceIssue(models.Model):
    _name = 'esg.compliance.issue'
    _description = 'Compliance Issue'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'due_date'

    name = fields.Char(compute='_compute_name', store=True)
    audit_id = fields.Many2one('esg.audit', string='Related Audit', tracking=True)
    severity = fields.Selection([
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ], required=True, default='medium', tracking=True)
    description = fields.Text(required=True)
    owner_id = fields.Many2one('res.users', string='Owner', required=True, tracking=True)
    due_date = fields.Date(required=True, tracking=True)
    status = fields.Selection([
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
    ], default='open', required=True, tracking=True)
    is_overdue = fields.Boolean(compute='_compute_is_overdue', search='_search_is_overdue')

    @api.depends('description')
    def _compute_name(self):
        for rec in self:
            rec.name = (rec.description or '')[:60]

    @api.depends('due_date', 'status')
    def _compute_is_overdue(self):
        today = fields.Date.context_today(self)
        for rec in self:
            rec.is_overdue = bool(rec.due_date and rec.due_date < today and rec.status in ('open', 'in_progress'))

    def _search_is_overdue(self, operator, value):
        today = fields.Date.context_today(self)
        if operator == '=':
            if value:
                return [('status', 'in', ('open', 'in_progress')), ('due_date', '<', today)]
            else:
                return ['|', ('status', 'not in', ('open', 'in_progress')), ('due_date', '>=', today)]
        elif operator == '!=':
            if value:
                return ['|', ('status', 'not in', ('open', 'in_progress')), ('due_date', '>=', today)]
            else:
                return [('status', 'in', ('open', 'in_progress')), ('due_date', '<', today)]
        return []

    @api.model_create_multi
    def create(self, vals_list):
        records = super().create(vals_list)
        for rec in records:
            if rec.owner_id.partner_id:
                rec.message_post(
                    body="New compliance issue assigned to you: %s" % (rec.description or ''),
                    partner_ids=rec.owner_id.partner_id.ids,
                )
        return records

    @api.model
    def _cron_flag_overdue_issues(self):
        overdue = self.search([('status', 'in', ('open', 'in_progress')), ('due_date', '<', fields.Date.today())])
        for issue in overdue:
            if issue.owner_id.partner_id:
                issue.message_post(
                    body="Compliance issue '%s' is overdue (due %s)." % (issue.name, issue.due_date),
                    partner_ids=issue.owner_id.partner_id.ids,
                )
