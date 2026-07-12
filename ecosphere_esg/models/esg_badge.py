# -*- coding: utf-8 -*-
from odoo import fields, models


class EsgBadge(models.Model):
    _name = 'esg.badge'
    _description = 'Gamification Badge'
    _order = 'unlock_value'

    name = fields.Char(required=True)
    description = fields.Text()
    icon = fields.Binary(string='Icon')
    icon_filename = fields.Char()
    unlock_rule_type = fields.Selection([
        ('xp_threshold', 'XP Threshold'),
        ('challenges_completed', 'Challenges Completed'),
        ('csr_completed', 'CSR Activities Completed'),
    ], required=True, default='xp_threshold')
    unlock_value = fields.Integer(string='Unlock Threshold', required=True, default=100)
    active = fields.Boolean(default=True)
