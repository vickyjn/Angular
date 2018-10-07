import { Component, OnInit, Input, DoCheck } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'tms-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, DoCheck {
  @Input() hover: Function;
  @Input() fill: Function;
  @Input() data;
  @Input() xAxis;
  @Input() yAxis = 'hours';
  constructor() { }

  draw() {
    const self = this;
    const data = this.data;
    let barHeight = 0;
    if (data && data.length) {
      barHeight = (data.length * 20);
      d3.select('.bar-chart svg').remove();
      d3.select('.bar-chart').append('svg').attr('width', barHeight).attr('height', 60);
      const svg = d3.select('svg'),
        margin = { top: 5, right: 5, bottom: 25, left: 5 },
        width = +barHeight - margin.left - margin.right,
        height = +95 - margin.top - margin.bottom;

      const x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

      const g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      x.domain(data.map(function (d, i) {
        if (!self.xAxis) {
          return i + 1;
        } else {
          return d[self.xAxis];
        }
      }));
      y.domain([0, d3.max(data, function (d) { return d[self.yAxis]; })]);

      g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

      g.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('title', function (d) {
          self.hover(d);
        })
        .attr('x', function (d, i) {
          if (!self.xAxis) {
            return x(i + 1);
          } else {
            return d[self.xAxis];
          }
        })
        .attr('fill', self.fill)
        .attr('y', function (d) { return y(d[self.yAxis]); })
        .attr('width', x.bandwidth())
        .attr('height', function (d) { return height - y(d[self.yAxis]); });
    }
  }
  ngOnInit() {
    this.draw();
  }
  ngDoCheck() {
    this.draw();
  }

}
