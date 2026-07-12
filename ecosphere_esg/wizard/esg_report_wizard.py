# -*- coding: utf-8 -*-
from odoo import fields, models


class EsgReportWizard(models.TransientModel):
    _name = 'esg.report.wizard'
    _description = 'ESG Custom Report Builder'

    report_type = fields.Selection([
        ('environmental', 'Environmental Report'),
        ('social', 'Social Report'),
        ('governance', 'Governance Report'),
        ('summary', 'ESG Summary Report'),
        ('custom', 'Custom Report'),
    ], required=True, default='summary')

    department_id = fields.Many2one('esg.department', string='Department')
    date_from = fields.Date(string='Date From')
    date_to = fields.Date(string='Date To')
    employee_id = fields.Many2one('hr.employee', string='Employee')
    challenge_id = fields.Many2one('esg.challenge', string='Challenge')
    esg_category = fields.Selection([
        ('environmental', 'Environmental'),
        ('social', 'Social'),
        ('governance', 'Governance'),
    ], string='ESG Category')
    export_format = fields.Selection([
        ('screen', 'View on Screen'),
        ('pdf', 'PDF'),
        ('xlsx', 'Excel'),
        ('csv', 'CSV'),
    ], default='screen', required=True)

    def _build_domain(self, model):
        domain = []
        field_names = self.env[model]._fields
        if self.department_id and 'department_id' in field_names:
            domain.append(('department_id', '=', self.department_id.id))
        if self.date_from and 'date' in field_names:
            domain.append(('date', '>=', self.date_from))
        if self.date_to and 'date' in field_names:
            domain.append(('date', '<=', self.date_to))
        if self.employee_id and 'employee_id' in field_names:
            domain.append(('employee_id', '=', self.employee_id.id))
        if self.challenge_id and 'challenge_id' in field_names:
            domain.append(('challenge_id', '=', self.challenge_id.id))
        return domain

    def action_generate_report(self):
        self.ensure_one()
        model_map = {
            'environmental': 'esg.carbon.transaction',
            'social': 'esg.employee.participation',
            'governance': 'esg.compliance.issue',
            'summary': 'esg.department.score',
            'custom': 'esg.department.score',
        }
        target_model = model_map[self.report_type]
        domain = self._build_domain(target_model)

        if self.export_format == 'pdf':
            return self.env.ref('ecosphere_esg.action_report_esg_summary').report_action(
                self.env[target_model].search(domain))

        return {
            'type': 'ir.actions.act_window',
            'name': dict(self._fields['report_type'].selection).get(self.report_type),
            'res_model': target_model,
            'view_mode': 'list,pivot,graph',
            'domain': domain,
        }
