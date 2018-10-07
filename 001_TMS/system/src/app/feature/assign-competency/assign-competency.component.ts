import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { BaseService } from '../../services/base.service';
import { Employee } from '../../services/employee';

@Component({
  selector: 'tms-assign-competency',
  templateUrl: './assign-competency.component.html',
  styleUrls: ['./assign-competency.component.scss']
})
export class AssignCompetencyComponent implements OnInit {
  skills: Array<any>;
  employees: Array<Employee>;
  level;
  data;
  employeeId;
  selectedSkill;
  constructor(private _service: BaseService, private _SharedService: SharedService) { }

  ngOnInit() {
    const self = this;
    self.getAllSkills();
    self.getEmployees();
  }

  getAllSkills() {
    const self = this;
    self._service.getSkills().subscribe((skills: Array<any>) => {
      skills.forEach((skill) => {
        const totalAssociates = skill.level1 + skill.level2 + skill.level3;
        const levelPercentage = 100 / totalAssociates;
        const percentage = ((100 / skill.requiredAssociates) * skill.actualAssociates);
        skill.percentage = percentage > 100 ? 100 : percentage;
        skill.level1Percentage = levelPercentage * skill.level1;
        skill.level2Percentage = levelPercentage * skill.level2;
        skill.level3Percentage = levelPercentage * skill.level3;
      });
      self.skills = skills;
    });
  }

  getEmployees() {
    const self = this;
    self._service.getemployee().subscribe((employees: Array<Employee>) => {
      self.employees = employees;
    });
  }

  updateData(level, employee) {
    if(level.active){
      if (this.selectedSkill.levels) {
        for(const lev in this.selectedSkill.levels) {
          const selectedLev = this.selectedSkill.levels[lev];
          if(selectedLev.indexOf(employee.id) >= 0) {            
            selectedLev.splice(selectedLev.indexOf(employee.id), 1);
          }
        }
      } else {
        this.selectedSkill.levels = {};
      }
      if (!this.selectedSkill.levels['level' + level.id]) {
        this.selectedSkill.levels['level' + level.id] = [];
      }
      this.selectedSkill.levels['level' + level.id].push(employee.id)
    }
  }

  getSkill(skill) {
    this.selectedSkill = skill;
  }

  save() {
    const self = this;
    console.log(this.selectedSkill);
    self._service.updateSkills(this.selectedSkill).subscribe((response: any) => {
      if (response && !response.error) {
        self.data = response;
        self._SharedService.emitIndicatorChange(false);
      }
    }, (err) => {
      this._service.serviceError(err);
    });
   
  }
}
