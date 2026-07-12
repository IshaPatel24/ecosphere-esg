# -*- coding: utf-8 -*-
from odoo import fields, models


class EsgProductProfile(models.Model):
    _name = 'esg.product.profile'
    _description = 'Product ESG Profile'
    _order = 'product_id'

    product_id = fields.Many2one('product.template', required=True, ondelete='cascade')
    carbon_footprint = fields.Float(string='Carbon Footprint (kg CO2e / unit)', digits=(12, 4))
    emission_factor_id = fields.Many2one('esg.emission.factor', string='Related Emission Factor')
    recyclable = fields.Boolean(string='Recyclable')
    sustainable_material = fields.Boolean(string='Sustainable Material')
    esg_notes = fields.Text(string='ESG Notes')

    _sql_constraints = [
        ('product_unique', 'unique(product_id)', 'An ESG profile already exists for this product.'),
    ]


class ProductTemplateEsg(models.Model):
    _inherit = 'product.template'

    esg_profile_id = fields.One2many('esg.product.profile', 'product_id', string='ESG Profile')
