import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../services/base.service';

@Component({
  selector: 'tms-group-view-activity',
  templateUrl: './group-view-activity.component.html',
  styleUrls: ['./group-view-activity.component.css']
})
export class GroupViewActivityComponent implements OnInit {

  activity;
  constructor(private _service: BaseService) { }

  ngOnInit() {
    this._service.groupActivityView().subscribe((data) => {
      console.log(data);
      this.activity = data;
    }, (err) => {
      this._service.serviceError(err);
    });
  }

}
