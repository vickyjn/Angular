import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  public menushrink: Boolean = false;
  constructor() { }

  ngOnInit() {
  }
  togglemenu() {
    this.menushrink = !this.menushrink;
  }

}
