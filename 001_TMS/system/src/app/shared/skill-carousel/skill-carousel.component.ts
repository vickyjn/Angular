import { Component, Input, DoCheck, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tms-skill-carousel',
  templateUrl: './skill-carousel.component.html',
  styleUrls: ['./skill-carousel.component.scss']
})
export class SkillCarouselComponent implements DoCheck {
  @Input() count: any = 6;
  @Input() min: any = 0;
  @Input() max: any = 6;
  @Input() list: Array<any>;
  @Output() emitSkill = new EventEmitter();
  @Input() skill: Number;
  constructor() { }

  ngDoCheck() {
  }

  selectSkill(skill) {
    this.list.forEach((s) => {
      s.selected = false;
    });
    skill.selected = true;
    this.skill = skill;
    this.emitSkill.emit(this.skill);
  }

  prev(allowed) {
    const self = this;
    if (!allowed) {
      self.min = (self.min - self.count);
      self.max = (self.max - self.count);
    }
  }

  next(allowed) {
    const self = this;
    if (!allowed) {
      self.min = (self.min + self.count);
      self.max = (self.max + self.count);
    }
  }

}
