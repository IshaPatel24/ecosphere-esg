# -*- coding: utf-8 -*-
from odoo import fields, models


class EsgEmissionFactor(models.Model):
    _name = 'esg.emission.factor'
    _description = 'Emission Factor'
    _order = 'name'

    name = fields.Char(required=True)
    source_type = fields.Selection([
        ('purchase', 'Purchase'),
        ('manufacturing', 'Manufacturing'),
        ('expense', 'Expense'),
        ('fleet', 'Fleet'),
        ('other', 'Other'),
    ], required=True, default='other')
    category = fields.Selection([
        ('fuel', 'Fuel'),
        ('electricity', 'Electricity'),
        ('travel', 'Travel'),
        ('waste', 'Waste'),
        ('water', 'Water'),
        ('materials', 'Materials'),
        ('other', 'Other'),
    ], required=True, default='other')
    unit = fields.Char(string='Unit', required=True, help='e.g. liter, kWh, km, kg')
    factor_value = fields.Float(string='CO2e Factor (kg CO2e / unit)', required=True, digits=(12, 4))
    active = fields.Boolean(default=True)
    notes = fields.Text()
