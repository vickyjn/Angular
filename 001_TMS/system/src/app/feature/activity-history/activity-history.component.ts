import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { BaseService } from '../../services/base.service';
import { Activity } from '../../models/models';
@Component({
  selector: 'tms-activity-history',
  templateUrl: './activity-history.component.html',
  styleUrls: ['./activity-history.component.scss']
})
export class ActivityHistoryComponent implements OnInit {
  allActivity: Array<Activity>;
  constructor(private _service: BaseService, private _SharedService: SharedService) { }

  ngOnInit() {
    this.getAllActivity();
  }

  getAllActivity() {
    const self = this;
    self._SharedService.emitIndicatorChange(true);
    self._service.getAllActivity().subscribe((response: any) => {
      self._SharedService.emitIndicatorChange(false);
      if (response && !response.error) {
        self.allActivity = response;
      } else {
        self.allActivity = new Array();
      }
    }, (err) => {
      this._service.serviceError(err);
    });
  }

}
