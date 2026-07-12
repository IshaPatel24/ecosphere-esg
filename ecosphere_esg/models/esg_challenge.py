# -*- coding: utf-8 -*-
from odoo import fields, models


class EsgChallenge(models.Model):
    _name = 'esg.challenge'
    _description = 'Sustainability Challenge'
    _inherit = ['mail.thread']
    _order = 'deadline'

    title = fields.Char(required=True, tracking=True)
    category_id = fields.Many2one('esg.category', domain=[('type', '=', 'challenge')], required=True)
    description = fields.Text()
    xp = fields.Integer(string='XP Reward', default=50)
    difficulty = fields.Selection([
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ], default='medium', required=True)
    evidence_required = fields.Boolean(default=True)
    deadline = fields.Date()
    status = fields.Selection([
        ('draft', 'Draft'),
        ('active', 'Active'),
        ('under_review', 'Under Review'),
        ('completed', 'Completed'),
        ('archived', 'Archived'),
    ], default='draft', required=True, tracking=True)
    participation_ids = fields.One2many('esg.challenge.participation', 'challenge_id')
    participant_count = fields.Integer(compute='_compute_participant_count')

    def _compute_participant_count(self):
        for rec in self:
            rec.participant_count = len(rec.participation_ids)

    def action_activate(self):
        self.write({'status': 'active'})

    def action_under_review(self):
        self.write({'status': 'under_review'})

    def action_complete(self):
        self.write({'status': 'completed'})

    def action_archive_challenge(self):
        self.write({'status': 'archived'})

    def action_view_participants(self):
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'name': 'Participants',
            'res_model': 'esg.challenge.participation',
            'view_mode': 'list,form',
            'domain': [('challenge_id', '=', self.id)],
            'context': {'default_challenge_id': self.id},
        }
