import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() togglestate = new EventEmitter();
  menushrink: Boolean = true;
  ntid: String;
  isDev: Boolean = false;
  constructor(private _Base: BaseService, private _SharedService:SharedService) { }

  ngOnInit() {
    const self = this;
    self._SharedService.emitIndicatorChange(true);
    self._Base.getntid().subscribe(res => {
      self.ntid = res.ntid;
      self._SharedService.emitIndicatorChange(false);
    }, (err) => {
      !self.isDev ? location.reload() : '';
      this._Base.serviceError(err);
    });
  }

  togglemenu() {
    this.menushrink = !this.menushrink;
    this.togglestate.emit(!this.menushrink);
  }
}
