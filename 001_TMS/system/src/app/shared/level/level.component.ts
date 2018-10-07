import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tms-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit {
  @Input() disabled: Boolean = false;
  @Input() visible: Number = 3;
  @Input() level: Number;
  @Output() emitData = new EventEmitter();
  visibleList = [];
  constructor() { }

  ngOnInit() {
    const self = this;
    for (let i = 0; i < self.visible; i++) {
      self.visibleList.push({
        'active': false,
        'id': (i+1),
        'title': 'Level ' + (i + 1)
      });
    }
  }

  updateLevel(l, list) {
    list.forEach((li) => {
      li.active = false;
    });
    l.active = true;
    this.level = l;
    this.emitData.emit(this.level);
  }
}
