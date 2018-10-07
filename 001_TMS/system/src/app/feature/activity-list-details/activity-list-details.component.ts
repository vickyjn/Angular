import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Employee } from '../../services/employee';

@Component({
  selector: 'tms-activitylist-details',
  templateUrl: './activity-list-details.component.html',
  styleUrls: ['./activity-list-details.component.scss']
})
export class ActivitylistDetailsComponent implements OnInit, OnChanges {

  @Input() data: Employee;

  constructor() { }

  ngOnInit() {}
  ngOnChanges() {
  	console.log(this.data);
  }

}
