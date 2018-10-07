import { Component, OnInit, DoCheck } from '@angular/core';
import * as moment from 'moment';
import { SharedService } from '../../services/shared.service';

import { BaseService } from '../../services/base.service';
import { Effort } from '../../models/effort';
import { Activity, Profile } from '../../models/models';

@Component({
  selector: 'tms-task-effort',
  templateUrl: './task-effort.component.html',
  styleUrls: ['./task-effort.component.css']
})
export class TaskEffortComponent implements OnInit, DoCheck {
  remarks: String;
  status: Number;
  state: Boolean;
  date: String;
  dateTime: Number;
  msg: String;
  skills;

  invalidActivityEntry: Boolean = false;
  invalidActivityEntry1: Boolean = false;
  totalActivityEffort: any = 0;
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
    this.getskills();

    self.date = self.dataModel.date;
    self.getEffortData(moment().valueOf());
    self.addNewActivity();
    document.addEventListener('keydown', function (e) {
      if (e.keyCode === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        self.saveActivity(0);
      }
    }, false);
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

  /**
   * Singles select
   * @param value 
   * @owner: Lavanya R
   */
  singleSelect(value: any) {
    const self = this;
    self.dataModel = new Activity();
    self.dataModel.date = moment(value.start).format('DD/MM/YYYY');
    self.date = self.dataModel.date;
    self.dateTime = moment(value.start).valueOf();
    self.getEffortData(self.dateTime);

  }
  getEffortData(date) {
    const self = this;
    self._SharedService.emitIndicatorChange(true);
    self._service.getActivity(date).subscribe((response: any) => {
      self._SharedService.emitIndicatorChange(false);
      if (response && !response.error && response.date) {
        self.dataModel = response;
      } else {
        self.dataModel = new Activity();
        self.dataModel.date = self.date;
        self.addNewActivity();
      }
    }, (err) => {
      this._service.serviceError(err);
    });
  }
  addNewActivity() {
    const self = this;
    self.invalidActivityEntry = true;
    (self.dataModel.effort).forEach((activity) => {
      const checkInputs = ['desc', 'hours', 'type', 'id'];
      checkInputs.forEach(function (input) {
        if (!activity[input]) {
          self.invalidActivityEntry = false;
          self.msg = 'All fields are required in Activity';
        }
      });

    });
    if (self.invalidActivityEntry) {
      const effort = new Effort();
      effort.contributors = [];
      (self.dataModel.effort).push(effort);

    }



  }
  remove(index: Number) {
    const self = this;
    self.dataModel.effort = (self.dataModel.effort).filter((activity) => {
      return (activity.id !== index);
    });
  }
  validate() {

    const self = this,
      parsedDataModel: Activity = JSON.parse(JSON.stringify(self.dataModel));
    if (self.dataModel && self.dataModel.effort && self.dataModel.effort.length) {
      const parsedEffort = [];

      (parsedDataModel.effort).forEach((effort) => {
        if (effort.desc && effort.hours) {
          parsedEffort.push(effort);
        }

      });

      parsedDataModel.effort = parsedEffort;
    }
  }
  saveActivity(isClose: Number) {
    const self = this;
    self.validate();
    self._SharedService.emitIndicatorChange(true);
    (self.dataModel.effort).forEach((activity) => {
      const checkInputs = ['desc', 'hours', 'type', 'id'];
      checkInputs.forEach(function (input) {
        if (!activity[input]) {
          self.invalidActivityEntry = false;
        }
      });

    });
    if (!self.invalidActivityEntry) {
      (self.dataModel.effort).pop();

    }
    self._service.postActivity(self.dataModel, isClose).subscribe((response: any) => {
      if (response && !response.error) {
        self.dataModel = response;
        self._SharedService.emitIndicatorChange(false);
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

  updateContributors(contributors: Array<Profile>, effort: Effort) {
    effort.contributors = contributors;
  }

  chartHover(attributes) {
    //console.log(attributes);
  }

  chartFill(attributes) {
    const type = attributes.type;
    return type === 'Innovation' ? 'Yellow' : 'Green';
  }

  updateTotalActivity(activityHours) {
    if (activityHours.hours < 0 || isNaN(activityHours.hours)) {
      activityHours.hours = 0;
    }
  }

  getskills() {
    this._service.getSkills().subscribe((skills: Array<any>) => {
      this.skills = skills;
    });
  }

}
