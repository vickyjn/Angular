import { Component, OnInit, DoCheck } from '@angular/core';
import * as moment from 'moment';
import { SharedService } from '../../services/shared.service';

import { BaseService } from '../../services/base.service';
import { Effort } from '../../models/effort';
import { Activity } from '../../models/models';

@Component({
  selector: 'tms-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivitylistComponent implements OnInit, DoCheck {
  remarks: String;
  status: Number;
  state: Boolean;
  date: String;
  dateTime: Number;
  msg: String;

  invalidActivityEntry: Boolean = false;
  invalidActivityEntry1: Boolean = false;
  totalActivityEffort: any = 0;
  activity;
  activities: Array<Effort>;
  dataModel: Activity = new Activity();
  options: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    opens: 'right',
    autoUpdateInput: false,
    singleDatePicker: true,
    minDate: moment().subtract(6, 'days'),
    maxDate: moment()
  };
  constructor(private _service: BaseService, private _SharedService: SharedService) { }

  ngOnInit() {
    const self = this;
    self.dataModel.effort = [];
    self.dataModel.date = moment().format('DD/MM/YYYY');
    self.date = self.dataModel.date;
    self.getEffortData(self.dateTime);
    self.getallActivity();
  }
  ngDoCheck() {
    const self = this;
    self.totalActivityEffort = 0;
    if (self.dataModel && self.dataModel.effort && self.dataModel.effort.length) {
      (self.dataModel.effort).forEach((activity) => {
        if (activity && activity.hours && activity.desc && activity.type) {
          self.totalActivityEffort += activity.hours;
        }
      });
    }
  }

  getallActivity() {
    this._service
      .getAdUnits()
      .subscribe((data: Activity[]) => {
        this.activity = data;
      }, (err) => {
        this._service.serviceError(err);
      });
  }
  singleSelect(value) {
    const self = this;
    console.log(value);
    self.dataModel = new Activity();
    var dt = moment(value, 'DD/MM/YYYY');

    self.getEffortData(dt);

  }
  getEffortData(date1) {
    const self = this;
    self._SharedService.emitIndicatorChange(true);
    self._service.getActivitylist(date1).subscribe((response: any) => {
      self._SharedService.emitIndicatorChange(false);
      if (response && !response.error && response.date) {
        self.dataModel = response;
      } else {
        self.dataModel = new Activity();
        self.dataModel.date = date1;
        //self.addNewActivity();
      }
    }, (err) => {
      this._service.serviceError(err);
    });
  }

  from(enable: Boolean, effort: Effort) {
    if (!enable) {
      effort.from = !effort.from;
    }
  }

}
