import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../services/base.service';
@Component({
  selector: 'tms-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.scss']
})
export class ViewActivityComponent implements OnInit {

  activity;
  allActivity;
  constructor(private _service: BaseService) { }

  ngOnInit() {
    const self = this;
    self._service.getActivityView().subscribe((data) => {
      self.activity = data;
    }, (err) => {
      self._service.serviceError(err);
    });

    self._service.getAllUserActivity().subscribe((data) => {
      self.allActivity = data;
    }, (err) => {
      self._service.serviceError(err);
    });

  }
  setData(data) {
    const self = this;
    self.allActivity = data;
  }
  setChartData(data) {
    const self = this;
    self.activity = data;
  }
}
