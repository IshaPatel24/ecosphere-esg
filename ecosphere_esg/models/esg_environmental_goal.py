# -*- coding: utf-8 -*-
from odoo import api, fields, models


class EsgEnvironmentalGoal(models.Model):
    _name = 'esg.environmental.goal'
    _description = 'Environmental / Sustainability Goal'
    _inherit = ['mail.thread']
    _order = 'end_date'

    name = fields.Char(required=True, tracking=True)
    department_id = fields.Many2one('esg.department', string='Department', tracking=True)
    metric_description = fields.Char(string='Metric', help='e.g. "Reduce CO2 emissions"')
    unit = fields.Char(default='kg CO2e')
    target_value = fields.Float(required=True)
    current_value = fields.Float(compute='_compute_current_value', store=True)
    start_date = fields.Date(required=True, default=fields.Date.context_today)
    end_date = fields.Date(required=True)
    status = fields.Selection([
        ('draft', 'Draft'),
        ('active', 'Active'),
        ('achieved', 'Achieved'),
        ('missed', 'Missed'),
    ], default='draft', required=True, tracking=True)
    progress = fields.Float(compute='_compute_progress', string='Progress (%)')

    @api.depends('department_id', 'start_date', 'end_date')
    def _compute_current_value(self):
        Carbon = self.env['esg.carbon.transaction']
        for rec in self:
            domain = [('state', '=', 'confirmed')]
            if rec.department_id:
                domain.append(('department_id', '=', rec.department_id.id))
            if rec.start_date:
                domain.append(('date', '>=', rec.start_date))
            if rec.end_date:
                domain.append(('date', '<=', rec.end_date))
            transactions = Carbon.search(domain) if rec.department_id else Carbon.browse()
            rec.current_value = sum(transactions.mapped('computed_emission'))

    @api.depends('current_value', 'target_value')
    def _compute_progress(self):
        for rec in self:
            rec.progress = (rec.current_value / rec.target_value * 100.0) if rec.target_value else 0.0

    def action_recompute(self):
        self._compute_current_value()
        for rec in self:
            if rec.status == 'active' and rec.end_date and fields.Date.context_today(rec) > rec.end_date:
                rec.status = 'achieved' if rec.current_value <= rec.target_value else 'missed'
