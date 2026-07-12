# -*- coding: utf-8 -*-
from odoo import api, fields, models
from odoo.exceptions import ValidationError


class EsgEmployeeParticipation(models.Model):
    _name = 'esg.employee.participation'
    _description = 'Employee CSR Participation'
    _inherit = ['mail.thread']
    _order = 'completion_date desc'

    employee_id = fields.Many2one('hr.employee', required=True, tracking=True)
    activity_id = fields.Many2one('esg.csr.activity', string='Activity', required=True, tracking=True)
    proof = fields.Binary(string='Proof')
    proof_filename = fields.Char()
    approval_status = fields.Selection([
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ], default='pending', required=True, tracking=True)
    points_earned = fields.Integer(default=0)
    completion_date = fields.Date(default=fields.Date.context_today)

    def action_approve(self):
        evidence_required = self.env['ir.config_parameter'].sudo().get_param('ecosphere_esg.evidence_required')
        for rec in self:
            if evidence_required and not rec.proof:
                raise ValidationError("Proof is required before this participation can be approved.")
            rec.points_earned = rec.activity_id.points_value
            rec.approval_status = 'approved'
            rec.employee_id.sudo().points += rec.points_earned
            rec.employee_id.sudo().xp += rec.points_earned
            if rec.employee_id.user_id:
                rec.message_post(
                    body="Your CSR participation in '%s' was approved. +%d points." % (
                        rec.activity_id.name, rec.points_earned),
                    partner_ids=rec.employee_id.user_id.partner_id.ids,
                )
        self.mapped('employee_id')._check_badge_unlock()

    def action_reject(self):
        for rec in self:
            rec.approval_status = 'rejected'
            rec.points_earned = 0
            if rec.employee_id.user_id:
                rec.message_post(
                    body="Your CSR participation in '%s' was rejected." % rec.activity_id.name,
                    partner_ids=rec.employee_id.user_id.partner_id.ids,
                )
