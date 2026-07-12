# -*- coding: utf-8 -*-
from odoo import api, fields, models


class EsgDepartment(models.Model):
    _name = 'esg.department'
    _description = 'ESG Department'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'name'

    name = fields.Char(required=True, tracking=True)
    code = fields.Char(required=True, tracking=True)
    head_id = fields.Many2one('hr.employee', string='Department Head', tracking=True)
    parent_id = fields.Many2one('esg.department', string='Parent Department', ondelete='cascade')
    child_ids = fields.One2many('esg.department', 'parent_id', string='Sub-Departments')
    employee_ids = fields.One2many('hr.employee', 'esg_department_id', string='Employees')
    employee_count = fields.Integer(compute='_compute_employee_count', store=True)
    status = fields.Selection([
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ], default='active', required=True, tracking=True)
    active = fields.Boolean(default=True)

    score_ids = fields.One2many('esg.department.score', 'department_id', string='Scores')
    latest_total_score = fields.Float(compute='_compute_latest_score', string='Latest ESG Score', store=True)
    latest_environmental_score = fields.Float(compute='_compute_latest_score', store=True)
    latest_social_score = fields.Float(compute='_compute_latest_score', store=True)
    latest_governance_score = fields.Float(compute='_compute_latest_score', store=True)

    carbon_transaction_ids = fields.One2many('esg.carbon.transaction', 'department_id')
    csr_activity_ids = fields.One2many('esg.csr.activity', 'department_id')
    goal_ids = fields.One2many('esg.environmental.goal', 'department_id')

    _sql_constraints = [
        ('code_unique', 'unique(code)', 'Department code must be unique.'),
    ]

    @api.depends('employee_ids')
    def _compute_employee_count(self):
        for rec in self:
            rec.employee_count = len(rec.employee_ids)

    @api.depends('score_ids.period_date', 'score_ids.total_score')
    def _compute_latest_score(self):
        for rec in self:
            latest = rec.score_ids.sorted('period_date', reverse=True)[:1]
            rec.latest_total_score = latest.total_score if latest else 0.0
            rec.latest_environmental_score = latest.environmental_score if latest else 0.0
            rec.latest_social_score = latest.social_score if latest else 0.0
            rec.latest_governance_score = latest.governance_score if latest else 0.0

    def action_view_scores(self):
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'name': 'Department Scores',
            'res_model': 'esg.department.score',
            'view_mode': 'list,form,graph',
            'domain': [('department_id', '=', self.id)],
        }
