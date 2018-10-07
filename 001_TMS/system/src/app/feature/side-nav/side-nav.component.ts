import { Component, OnInit, Input } from '@angular/core';
import { BaseService } from '../../services/base.service';

import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  providers: [BaseService]
})
export class SideNavComponent implements OnInit {
  @Input() view: Boolean;
  menu: Array<any> = [];
  constructor(private _Base: BaseService, private _SharedService:SharedService) { }

  ngOnInit() {
    const self = this;
    self._SharedService.emitIndicatorChange(true);
    self._Base.getmenu().subscribe((data) => {
      self.menu = data;
      self._SharedService.emitIndicatorChange(false);
    }, (err) => {
      this._Base.serviceError(err);
    });
  }

}
