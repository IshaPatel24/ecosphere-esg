# -*- coding: utf-8 -*-
from odoo import api, fields, models
from odoo.exceptions import UserError


class HrEmployeeEsg(models.Model):
    _inherit = 'hr.employee'

    esg_department_id = fields.Many2one('esg.department', string='ESG Department')
    xp = fields.Integer(string='XP', default=0)
    points = fields.Integer(string='Redeemable Points', default=0)
    badge_ids = fields.Many2many('esg.badge', string='Badges Earned')
    csr_participation_ids = fields.One2many('esg.employee.participation', 'employee_id')
    challenge_participation_ids = fields.One2many('esg.challenge.participation', 'employee_id')
    redemption_ids = fields.One2many('esg.reward.redemption', 'employee_id')

    csr_completed_count = fields.Integer(compute='_compute_gamification_counts')
    challenge_completed_count = fields.Integer(compute='_compute_gamification_counts')

    def _compute_gamification_counts(self):
        for emp in self:
            emp.csr_completed_count = len(emp.csr_participation_ids.filtered(
                lambda p: p.approval_status == 'approved'))
            emp.challenge_completed_count = len(emp.challenge_participation_ids.filtered(
                lambda p: p.approval == 'approved'))

    def _check_badge_unlock(self):
        """Auto-award badges when Badge Auto-Award setting is enabled and
        an employee's XP / completed counts satisfy the badge's unlock rule."""
        auto_award = self.env['ir.config_parameter'].sudo().get_param('ecosphere_esg.badge_auto_award')
        if not auto_award:
            return
        badges = self.env['esg.badge'].search([('active', '=', True)])
        for emp in self:
            emp._compute_gamification_counts()
            for badge in badges:
                if badge in emp.badge_ids:
                    continue
                unlocked = False
                if badge.unlock_rule_type == 'xp_threshold' and emp.xp >= badge.unlock_value:
                    unlocked = True
                elif badge.unlock_rule_type == 'challenges_completed' and \
                        emp.challenge_completed_count >= badge.unlock_value:
                    unlocked = True
                elif badge.unlock_rule_type == 'csr_completed' and \
                        emp.csr_completed_count >= badge.unlock_value:
                    unlocked = True
                if unlocked:
                    emp.badge_ids = [(4, badge.id)]
                    if emp.user_id:
                        emp.message_post(
                            body="Congratulations! You unlocked the badge '%s'." % badge.name,
                            partner_ids=emp.user_id.partner_id.ids,
                        )

    def action_redeem_reward(self, reward):
        self.ensure_one()
        if reward.status != 'active':
            raise UserError("This reward is not available for redemption.")
        if reward.stock <= 0:
            raise UserError("This reward is out of stock.")
        if self.points < reward.points_required:
            raise UserError("You do not have enough points to redeem this reward.")
        self.sudo().points -= reward.points_required
        reward.sudo().stock -= 1
        return self.env['esg.reward.redemption'].create({
            'employee_id': self.id,
            'reward_id': reward.id,
            'points_spent': reward.points_required,
        })

    def action_view_leaderboard(self):
        return {
            'type': 'ir.actions.act_window',
            'name': 'Leaderboard',
            'res_model': 'hr.employee',
            'view_mode': 'list',
            'domain': [('xp', '>', 0)],
            'context': {'search_default_group_by_xp': 0},
        }
