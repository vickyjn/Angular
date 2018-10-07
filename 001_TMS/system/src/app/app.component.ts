import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  indicator: Boolean;
  minimizemenu: Boolean = false;
  constructor(private _sharedService: SharedService) {  }
  navtoggle(state) {
    this.minimizemenu = state;
  }

  ngOnInit() {
    const self = this;
    self._sharedService.changeEmitted$.subscribe((emitted: Boolean) => {
      setTimeout(() => {
        if(self.indicator !== emitted) {
          self.indicator = emitted;  
        }  
      });          
    });
  }

}
