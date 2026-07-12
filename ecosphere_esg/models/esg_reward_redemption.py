# -*- coding: utf-8 -*-
from odoo import fields, models
from odoo.exceptions import UserError


class EsgRewardRedemption(models.Model):
    _name = 'esg.reward.redemption'
    _description = 'Reward Redemption'
    _order = 'id desc'

    employee_id = fields.Many2one('hr.employee', required=True)
    reward_id = fields.Many2one('esg.reward', required=True)
    points_spent = fields.Integer(readonly=True)
    date = fields.Datetime(default=fields.Datetime.now)
    state = fields.Selection([
        ('done', 'Done'),
        ('cancelled', 'Cancelled'),
    ], default='done', required=True)

    def action_cancel(self):
        for rec in self:
            if rec.state == 'done':
                rec.employee_id.sudo().points += rec.points_spent
                rec.reward_id.sudo().stock += 1
                rec.state = 'cancelled'
