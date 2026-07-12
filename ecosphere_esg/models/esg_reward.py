# -*- coding: utf-8 -*-
from odoo import fields, models


class EsgReward(models.Model):
    _name = 'esg.reward'
    _description = 'Redeemable Reward'
    _order = 'points_required'

    name = fields.Char(required=True)
    description = fields.Text()
    points_required = fields.Integer(required=True, default=100)
    stock = fields.Integer(default=0)
    status = fields.Selection([
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ], default='active', required=True)
    redemption_ids = fields.One2many('esg.reward.redemption', 'reward_id')
