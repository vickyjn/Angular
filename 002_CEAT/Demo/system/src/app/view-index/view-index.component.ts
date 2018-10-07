import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-index',
  templateUrl: './view-index.component.html',
  styleUrls: ['./view-index.component.css']
})
export class ViewIndexComponent implements OnInit {
  width: number = 900;
  height: number = 500;
  data: Array<any>;
  filteredData;
  constructor() { }

  ngOnInit() {
  }
  setData(data) {
    this.data = data;
    var obj = this.data.filter(function (e) { return e.TYRE_ID === "1229782938247303441" });
    
    var keys = ['TIMESTAMP', 'SPEED', 'RPM'];

    var parentArray = [];
    var keysLength = keys.length;

    for (var i = 0; i < obj.length; i++) {
      var subArray = [];
      for (var j = 0; j < keys.length; j++) {
        if (keys[j] in obj[i]) {
          var tempSplit = obj[i][keys[j]] ? obj[i][keys[j]] : null;
          if (keysLength !== j) {
            subArray.push(tempSplit);
            if (keysLength - 1 === j) {
              parentArray.push(subArray);
            }
          }
        }
      }
    }
    this.filteredData = parentArray;
  }
}
