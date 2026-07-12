# -*- coding: utf-8 -*-
from odoo import api, fields, models


class EsgCarbonTransaction(models.Model):
    _name = 'esg.carbon.transaction'
    _description = 'Carbon Transaction'
    _inherit = ['mail.thread']
    _order = 'date desc'

    name = fields.Char(default='New', copy=False)
    department_id = fields.Many2one('esg.department', required=True, tracking=True)
    source_type = fields.Selection([
        ('purchase', 'Purchase'),
        ('manufacturing', 'Manufacturing'),
        ('expense', 'Expense'),
        ('fleet', 'Fleet'),
        ('manual', 'Manual'),
    ], required=True, default='manual')
    source_document = fields.Reference(selection=[
        ('purchase.order', 'Purchase Order'),
        ('mrp.production', 'Manufacturing Order'),
        ('hr.expense', 'Expense'),
        ('fleet.vehicle.log.fuel', 'Fleet Fuel Log'),
    ], string='Source Document')
    emission_factor_id = fields.Many2one('esg.emission.factor', required=True)
    quantity = fields.Float(required=True, default=1.0)
    computed_emission = fields.Float(compute='_compute_emission', store=True, string='CO2e Emission (kg)')
    date = fields.Date(default=fields.Date.context_today, required=True)
    auto_generated = fields.Boolean(default=False)
    state = fields.Selection([
        ('draft', 'Draft'),
        ('confirmed', 'Confirmed'),
    ], default='draft', required=True, tracking=True)

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            if vals.get('name', 'New') == 'New':
                vals['name'] = self.env['ir.sequence'].next_by_code('esg.carbon.transaction') or 'New'
        return super().create(vals_list)

    @api.depends('quantity', 'emission_factor_id.factor_value')
    def _compute_emission(self):
        for rec in self:
            rec.computed_emission = rec.quantity * (rec.emission_factor_id.factor_value or 0.0)

    def action_confirm(self):
        self.write({'state': 'confirmed'})

    @api.model
    def _auto_generate_from_document(self, source_type, department, emission_factor, quantity, document=None):
        """Helper used by integration points (Purchase/Manufacturing/Expense/Fleet)
        to auto-create a Carbon Transaction when the 'Auto Emission Calculation'
        setting is enabled."""
        if self.env['ir.config_parameter'].sudo().get_param('ecosphere_esg.auto_emission_calc') != 'True':
            return False
        vals = {
            'department_id': department.id if department else False,
            'source_type': source_type,
            'emission_factor_id': emission_factor.id if emission_factor else False,
            'quantity': quantity,
            'auto_generated': True,
            'state': 'confirmed',
        }
        if document:
            vals['source_document'] = '%s,%d' % (document._name, document.id)
        if vals['department_id'] and vals['emission_factor_id']:
            return self.create(vals)
        return False
