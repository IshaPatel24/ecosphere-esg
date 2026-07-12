# -*- coding: utf-8 -*-
from odoo import api, fields, models


class EsgDepartmentScore(models.Model):
    _name = 'esg.department.score'
    _description = 'Aggregated Department ESG Score'
    _order = 'period_date desc'

    department_id = fields.Many2one('esg.department', required=True, ondelete='cascade')
    period_date = fields.Date(required=True, default=fields.Date.context_today)
    environmental_score = fields.Float(default=0.0)
    social_score = fields.Float(default=0.0)
    governance_score = fields.Float(default=0.0)
    total_score = fields.Float(compute='_compute_total_score', store=True)

    @api.depends('environmental_score', 'social_score', 'governance_score')
    def _compute_total_score(self):
        ICP = self.env['ir.config_parameter'].sudo()
        env_w = float(ICP.get_param('ecosphere_esg.weight_environmental', 40))
        soc_w = float(ICP.get_param('ecosphere_esg.weight_social', 30))
        gov_w = float(ICP.get_param('ecosphere_esg.weight_governance', 30))
        total_w = env_w + soc_w + gov_w or 1.0
        for rec in self:
            rec.total_score = (
                rec.environmental_score * env_w
                + rec.social_score * soc_w
                + rec.governance_score * gov_w
            ) / total_w

    def action_recompute_from_operational_data(self):
        """Simplified scoring: normalizes recent activity volumes into 0-100 scores.
        Real-world scoring rules would be tuned per organization via Settings."""
        Carbon = self.env['esg.carbon.transaction']
        CSR = self.env['esg.employee.participation']
        Issue = self.env['esg.compliance.issue']
        for rec in self:
            dept = rec.department_id
            emissions = sum(Carbon.search([
                ('department_id', '=', dept.id), ('state', '=', 'confirmed')
            ]).mapped('computed_emission'))
            # Lower emissions -> higher environmental score (simple inverse capped at 100)
            rec.environmental_score = max(0.0, 100.0 - min(emissions / 10.0, 100.0))

            approved_participation = CSR.search_count([
                ('activity_id.department_id', '=', dept.id), ('approval_status', '=', 'approved')
            ])
            rec.social_score = min(approved_participation * 5.0, 100.0)

            open_issues = Issue.search_count([
                ('audit_id.department_id', '=', dept.id), ('status', 'in', ('open', 'in_progress'))
            ])
            rec.governance_score = max(0.0, 100.0 - open_issues * 10.0)
