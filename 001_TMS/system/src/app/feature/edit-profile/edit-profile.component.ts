import { Component, OnInit } from '@angular/core';
import { Profile, Skill } from '../../models/models';
import { BaseService } from '../../services/base.service';

@Component({
  selector: 'tms-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  Skills: Array<Skill>;
  dataModel: Profile = new Profile();
  ntid: String ="lvr5kor";
  id:Number;
  employeedetails = [];
  editSkill : Boolean = false;
  invalidSkillEntry : Boolean = false;
  constructor(private _Base: BaseService) { }

  ngOnInit() {
    const self = this;
    self.dataModel.skills = [];
    self._Base.getntid().subscribe(res => {
      self.ntid = res.ntid;
    }, (err) => {
      this._Base.serviceError(err);
    });
    // self.ntid = "lvr5kor";

    self._Base.getemployee().subscribe((data) => {
      self.employeedetails = data;
      self.employeedetails.forEach(function (employee: any) { 
        if(self.ntid.toLowerCase() === employee.id){
          self.dataModel = employee;
          self.dataModel.id = employee.id;
          self.id = self.dataModel.id;
          self.getSkillData(self.id);
        }
      });
    }, (err) => {
      this._Base.serviceError(err);
    });
  }
 
  /**
   * Gets skill data
   * @param id 
   * @owner: Lavanya R
   */
  getSkillData(id) {
    const self = this;
    self._Base.getemployeebyid(id).subscribe((response: any) => {
      if (response && !response.error) {
        self.dataModel.skills = response.skills;
      } else {
        self.dataModel = new Profile();
        self.dataModel.id = self.id;
        self.dataModel.skills = response.skills;
        self.addNewSkill();
      }
    }, (err) => {
      this._Base.serviceError(err);
    });
  }
 
  /**
   * Adds new skill
   * @owner: Lavanya R
   */
  addNewSkill() {
    const self = this;
    self.invalidSkillEntry = true;
    if (self.invalidSkillEntry) {
      (self.dataModel.skills).push(new Skill());
    }
  }

  /**
   * Validates edit profile component
   * @owner: Lavanya R
   */
  validate() {
    const self = this,
    parsedDataModel: Profile = JSON.parse(JSON.stringify(self.dataModel));
    if (self.dataModel && self.dataModel.skills && self.dataModel.skills.length) {
      const parsedEffort = [];
      (parsedDataModel.skills).forEach((skills) => {
        if (skills.skill) {
          parsedEffort.push(skills);
        }
        
      });
      
      parsedDataModel.skills = parsedEffort;
    }
  }

  /**
   * Saves profile
   * @owner: Lavanya R
   */
  saveProfile() {
    const self = this;
    self.validate();
    self._Base.putProfile(self.dataModel).subscribe((response: any) => {
      if (response && !response.error) {
        self.dataModel = response;
      }
    }, (err) => {
      this._Base.serviceError(err);
    });
  }
 
  /**
   * Removes edit profile component
   * @param index 
   * @owner: Lavanya R
   */
  remove(index: Number) {
    const self = this;
    self.dataModel.skills = (self.dataModel.skills).filter((skill) => {
      return (skill.skillId !== index);
    });
  }

  /**
   * Updates rate
   * @param rate 
   * @param skill
   * @owner: Lavanya R 
   */
  updateRate(rate: Number, skill: Skill) {
    skill.rate = rate;
  }
}
