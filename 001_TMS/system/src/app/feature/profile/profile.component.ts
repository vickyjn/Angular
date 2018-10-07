import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../services/base.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [BaseService]
})
export class ProfileComponent implements OnInit {

  filterby?: string = 'all'
  employeedetails = [];
  uniqueskill: any = {};

  constructor(private _Base: BaseService){
  }

  ngOnInit() {
    this._Base.getemployee().subscribe((data) => {
      this.employeedetails = data;

      const emp: any = [];
      this.employeedetails.forEach(function (employee: any) { 
        employee.skills.forEach(function (items:any) {
          emp.push(items.skill);
        });
        
      });
      this.uniqueskill.lists = this.filterSkills(emp);
    }, (err) => {
      this._Base.serviceError(err);
    });
  }
  /**
   * Filters skills
   * @param emp 
   * @returns
   * @owner: Lavanya R  
   */
  filterSkills(emp) {
    let list = [];
    for(let i = 0;i < emp.length; i++){
        if(list.indexOf(emp[i]) == -1){
          list.push(emp[i]);
        }
    }
    return list;
  }  
  /**
   * Clicks profile component
   * @param list 
   * @owner: Lavanya R
   */
  click(list: any) {
    this.filterby=list;
  }
}
