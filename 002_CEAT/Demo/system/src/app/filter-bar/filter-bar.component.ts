import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../service/service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {
  @Output() postData = new EventEmitter();
  start;
  end;
  servicestart;
  serviceend;
  options: any = {
    locale: { format: 'DD/MM/YYYY hh:mm A' },
    alwaysShowCalendars: false,
    opens: 'right',
    autoUpdateInput: false,
    singleDatePicker: false,
    timePicker: true
  };
  constructor(private _Base: ServiceService) { }

  ngOnInit() {
    this.loadData(null, null);
  }

  loadData(start, end) {
    var self = this;
    self._Base.getCeat(start, end).subscribe((data) => {
      self.postData.emit(data);
    });
  }  

  singleSelect(value: any) {
    const self = this;
    self.start = moment(value.start).format('DD/MM/YYYY hh:mm A');
    self.end = moment(value.end).format('DD/MM/YYYY hh:mm A');
    self.servicestart = value.start;
    self.serviceend = value.end;
  }

  resetData() {
    const self = this,
    stDt = new Date(self.servicestart).toISOString(),
    stEnd = new Date(self.serviceend).toISOString();
    self.loadData(stDt, stEnd);
}
}
