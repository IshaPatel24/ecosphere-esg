# -*- coding: utf-8 -*-
from odoo import fields, models


class EsgCsrActivity(models.Model):
    _name = 'esg.csr.activity'
    _description = 'CSR Activity'
    _inherit = ['mail.thread']
    _order = 'date desc'

    name = fields.Char(required=True, tracking=True)
    category_id = fields.Many2one('esg.category', domain=[('type', '=', 'csr')], required=True)
    department_id = fields.Many2one('esg.department', tracking=True)
    description = fields.Text()
    date = fields.Date(default=fields.Date.context_today, required=True)
    location = fields.Char()
    status = fields.Selection([
        ('planned', 'Planned'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ], default='planned', required=True, tracking=True)
    points_value = fields.Integer(string='Points Awarded per Participation', default=10)
    participation_ids = fields.One2many('esg.employee.participation', 'activity_id')
    participant_count = fields.Integer(compute='_compute_participant_count')

    def _compute_participant_count(self):
        for rec in self:
            rec.participant_count = len(rec.participation_ids)

    def action_view_participants(self):
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'name': 'Participants',
            'res_model': 'esg.employee.participation',
            'view_mode': 'list,form',
            'domain': [('activity_id', '=', self.id)],
            'context': {'default_activity_id': self.id},
        }
