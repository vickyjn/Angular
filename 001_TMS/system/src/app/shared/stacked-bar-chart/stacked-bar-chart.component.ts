import { Component, OnInit, Input, DoCheck, HostListener } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'tms-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.css']
})

export class StackedBarChartComponent implements OnInit, DoCheck {
  @Input() data;
  constructor() { }

  private margin;

  private width: number;
  private height: number;

  private svg: any;
  private x: any;
  private y: any;
  private z: any;
  private g: any;


  ngOnInit() {
    this.initMargins();
    this.initSvg();
    this.drawChart(this.data);
  }

  ngDoCheck() {
    this.initMargins();
    this.initSvg();
    this.drawChart(this.data);
  }
  
  onResize(event) {
    event.target.innerWidth;
    this.drawChart(this.data);
  }

  private initMargins() {
    this.margin = { top: 20, right: 20, bottom: 30, left: 40 };
  }

  private initSvg() {
    d3.select("svg").remove();
    this.svg = d3.select('.bar-chart').append('svg').attr('height', 200);
    let parentWidth = this.svg.node().parentNode.clientWidth;
    this.width = parentWidth - this.margin.left - this.margin.right;
    this.svg.attr('width', this.width + 35);
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g').attr('transform', 'translate(' + 20 + ',' + 30 + ')');

    this.x = d3.scaleBand()
      .rangeRound([0, this.width])
      .paddingInner(0.05)
      .align(0.1);
    this.y = d3.scaleLinear()
      .rangeRound([this.height, 0]);
    this.z = d3.scaleOrdinal()
      .range(['#1f77b4', '#2ca02c', '#ff7f0e', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
  }

  private drawChart(data: any[]) {
    const keys = Object.getOwnPropertyNames(data[0]).slice(1);

    this.x.domain(data.map((d: any) => d.name));
    this.y.domain([0, d3.max(data, (d: any) => {
      let total = 0;
      for (const x in d) {
        if (!isNaN(d[x])) {
          total = total + d[x];
        }
      }
      return total;
    })]).nice();
    this.z.domain(keys);

    this.g.append('g')
      .selectAll('g')
      .data(d3.stack().keys(keys)(data))
      .enter().append('g')
      .attr('fill', d => this.z(d.key))
      .selectAll('rect')
      .data(d => d)
      .enter().append('rect')
      .attr('x', d => this.x(d.data.name))
      .attr('y', d => this.y(d[1]) || 0)
      .attr('height', d => this.y(d[0]) - this.y(d[1]) || 0)
      .attr('width', this.x.bandwidth());


    this.g.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(this.x));

    this.g.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(this.y).ticks(null, 's'))
      .append('text')
      .attr('x', 2)
      .attr('y', this.y(this.y.ticks().pop()) + 0.5)
      .attr('dy', '0.32em')
      .attr('fill', '#000')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'start')
      .text('Hours');

    const legend = this.g.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'end')
      .selectAll('g')
      .data(keys.slice().reverse())
      .enter().append('g')
      .attr('transform', (d, i) => 'translate(0,' + i * 20 + ')');

    legend.append('rect')
      .attr('x', this.width - 19)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', this.z);

    legend.append('text')
      .attr('x', this.width - 24)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
      .text(d => d);
  }
}
