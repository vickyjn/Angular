import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tms-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() count: Number = 5;
  @Input() rated: Number = 3;
  @Output() emitNewRating = new EventEmitter();
  star: Array<Number>;
  constructor() { }
  ngOnInit() {
    const self = this;
    self.star = [];
    if(self.count) {
      for(let i = 1; i <= self.count; i++) {
        (self.star).push(i);
      }
    }
  }
  
  /**
   * Rates rating component
   * @param rating 
   * @owner: Lavanya R
   */
  rate(rating: Number) {
    this.rated = rating;
    this.emitNewRating.emit(this.rated);
  }
}
