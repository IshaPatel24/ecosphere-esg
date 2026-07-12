# -*- coding: utf-8 -*-
from odoo import fields, models
from odoo.exceptions import ValidationError


class EsgChallengeParticipation(models.Model):
    _name = 'esg.challenge.participation'
    _description = 'Employee Challenge Participation'
    _inherit = ['mail.thread']
    _order = 'id desc'

    challenge_id = fields.Many2one('esg.challenge', required=True, tracking=True)
    employee_id = fields.Many2one('hr.employee', required=True, tracking=True)
    progress = fields.Float(string='Progress (%)', default=0.0)
    proof = fields.Binary(string='Proof')
    proof_filename = fields.Char()
    approval = fields.Selection([
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ], default='pending', required=True, tracking=True)
    xp_awarded = fields.Integer(default=0)

    _sql_constraints = [
        ('challenge_employee_unique', 'unique(challenge_id, employee_id)',
         'This employee is already participating in this challenge.'),
    ]

    def action_approve(self):
        for rec in self:
            if rec.challenge_id.evidence_required and not rec.proof:
                raise ValidationError("Proof is required before this challenge can be approved.")
            rec.xp_awarded = rec.challenge_id.xp
            rec.approval = 'approved'
            rec.progress = 100.0
            rec.employee_id.sudo().xp += rec.xp_awarded
            rec.employee_id.sudo().points += rec.xp_awarded
            if rec.employee_id.user_id:
                rec.message_post(
                    body="Your participation in challenge '%s' was approved. +%d XP." % (
                        rec.challenge_id.title, rec.xp_awarded),
                    partner_ids=rec.employee_id.user_id.partner_id.ids,
                )
        self.mapped('employee_id')._check_badge_unlock()

    def action_reject(self):
        for rec in self:
            rec.approval = 'rejected'
            rec.xp_awarded = 0
            if rec.employee_id.user_id:
                rec.message_post(
                    body="Your participation in challenge '%s' was rejected." % rec.challenge_id.title,
                    partner_ids=rec.employee_id.user_id.partner_id.ids,
                )
