# -*- coding: utf-8 -*-
from odoo import fields, models


class EsgCategory(models.Model):
    _name = 'esg.category'
    _description = 'Shared Category (CSR Activity / Challenge)'
    _order = 'name'

    name = fields.Char(required=True, translate=True)
    type = fields.Selection([
        ('csr', 'CSR Activity Category'),
        ('challenge', 'Challenge Category'),
    ], required=True, index=True)
    status = fields.Selection([
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ], default='active', required=True)
    active = fields.Boolean(default=True)
    description = fields.Text()

    _sql_constraints = [
        ('name_type_unique', 'unique(name, type)', 'A category with this name already exists for this type.'),
    ]
