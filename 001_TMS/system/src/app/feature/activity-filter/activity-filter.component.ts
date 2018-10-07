import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseService } from '../../services/base.service';
import * as moment from 'moment';
import { Effort } from '../../models/effort';
import { Activity, Profile } from '../../models/models';

@Component({
  selector: 'tms-activity-filter',
  templateUrl: './activity-filter.component.html',
  styleUrls: ['./activity-filter.component.css']
})
export class ActivityFilterComponent implements OnInit {

  @Output() dataModel = new EventEmitter();
  @Output() dataChart = new EventEmitter();
  effort: Effort = new Effort();
  // dataModel;
  date;
  type;
  status;
  dateTime;
  contributors: any = [];
  options: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    opens: 'right',
    autoUpdateInput: false,
    singleDatePicker: true
  };
  constructor(private _service: BaseService) { }

  ngOnInit() {

  }

  singleSelect(value: any) {
    const self = this;
    self.date = moment(value.start).format('DD/MM/YYYY');
    self.dateTime = moment(value.start).valueOf();
  }

  updateContributors(contributors: Array<Profile>) {
    this.contributors = contributors;
    this.effort.contributors = this.contributors;
  }

  load() {
    const self = this;
    console.log("ss",self.effort.type);
    self._service.getSelectedActivity(self.dateTime).subscribe((response: any) => {
      self.dataModel.emit(response);
    }, (err) => {
      this._service.serviceError(err);
    });

    self._service.getSelectedActivityView(self.dateTime).subscribe((response: any) => {
      self.dataChart.emit(response);
    }, (err) => {
      this._service.serviceError(err);
    });
  }

}
