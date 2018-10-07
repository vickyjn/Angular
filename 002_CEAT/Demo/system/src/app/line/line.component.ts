import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Zoom from 'd3-zoom';
import * as d3Brush from 'd3-brush';
import { ServiceService } from '../service/service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})

export class LineComponent implements OnInit {

  testData;
  data: any;

  svg: any;
  margin = { top: 20, right: 20, bottom: 110, left: 40 };
  margin2 = { top: 430, right: 20, bottom: 30, left: 40 };
  g: any;
  width: number;
  height: number; height2;
  x; x2; y2; xAxis2; line2;
  y;
  z; contextHeight = 50;
  line; start; end;
  private brush: any;
  focus;
  context; yAxis; xAxis;
  private zoom: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  tyre_list;
  type = 'SPEED';
  chartData;
  servicestart;
  serviceend;
  load = false;
  constructor(private _Base: ServiceService) {

  }

  options: any = {
    locale: { format: 'DD/M hh:mm A' },
    alwaysShowCalendars: false,
    opens: 'right',
    autoUpdateInput: false,
    singleDatePicker: false,
    timePicker: true
  };

  singleSelect(value: any) {
    const self = this;
    self.start = moment(value.start).format('DD/MM/YYYY hh:mm A');
    self.end = moment(value.start).format('DD/MM/YYYY hh:mm A');
    self.servicestart = value.start;
    self.serviceend = value.end;
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  parsedDate(date: any) {
    return Date.parse(date);
  }
  groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }
  ngOnInit() {
    this.loadData(null, null);

  }
  loadData(start, end) {
    const self = this;
    const tyre_id: any = [];
    self._Base.getCeat(start, end).subscribe((data) => {
      self.load = true;
      self.testData = data;
      self.testData.forEach(function (datax: any) {
        tyre_id.push(datax.TYRE_ID);
      });
      self.tyre_list = self.filterList(tyre_id);

      self.chartData = self.groupData(self.testData);

      self.dropdownList = self.tyre_list;

      self.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: true
      };

    });
  }
  groupData(data) {
    console.log(data.length);
    const self = this;
    const group_to_values = self.groupBy(data, 'TYRE_ID');
    const groups = Object.keys(group_to_values).map(function (key) {
      if (key) {
        return { id: key, value: group_to_values[key] };
      }
    });

    self.data = groups.map((v) => v.value.map((w) => self.parsedDate(w.TIMESTAMP)))[0];
    self.initChart(groups);
    self.drawAxis();
    self.drawPath(groups);


  }


  filterList(data) {
    const list = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i] && list.indexOf(data[i]) === -1) {
        list.push(data[i]);
      }
    }
    return list;
  }

  private initChart(TEMPERATURES): void {
    const self = this;
    d3.selectAll('svg').remove();
    d3.select('.svg-c').append('svg');
    self.svg = d3.select('svg');
    self.svg.attr('width', 1260);
    self.svg.attr('height', 500);
    self.svg.attr('fill', 'none');
    self.width = self.svg.attr('width') - self.margin.left - self.margin.right;
    self.height = self.svg.attr('height') - self.margin.top - self.margin.bottom;
    self.height2 = +self.svg.attr('height') - self.margin2.top - self.margin2.bottom;

    self.brush = d3Brush.brushX()
      .extent([[0, 0], [self.width, self.height2]])
      .on('brush end', self.brushed.bind(self));

    self.zoom = d3Zoom.zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([[0, 0], [self.width, self.height]])
      .extent([[0, 0], [self.width, self.height]])
      .on('zoom', self.zoomed.bind(self));

    self.x = d3Scale.scaleTime().range([0, self.width]);
    self.y = d3Scale.scaleLinear().range([self.height, 0]);
    self.z = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10);

    self.x2 = d3Scale.scaleTime().range([0, self.width]);
    self.y2 = d3Scale.scaleLinear().range([self.height2, 0]);

    self.line = d3Shape.line()
      .curve(d3Shape.curveBasis)
      .x((d: any) => self.x(self.parsedDate(d.TIMESTAMP)))
      .y((d: any) => self.y(d[self.type]));

    self.line2 = d3Shape.line()
      .curve(d3Shape.curveBasis)
      .x((d: any) => self.x2(self.parsedDate(d.TIMESTAMP)))
      .y((d: any) => self.y2(d[self.type]));

    self.svg.append('defs').append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', self.width)
      .attr('height', self.height);

    self.focus = self.svg.append('g')
      .attr('class', 'focus')
      .attr('transform', 'translate(' + self.margin.left + ',' + self.margin.top + ')');

    self.context = self.svg.append('g')
      .attr('class', 'context')
      .attr('transform', 'translate(' + self.margin2.left + ',' + self.margin2.top + ')');

    self.x.domain(d3Array.extent(self.data, (d: Date) => d));

    self.y.domain([
      d3Array.min(TEMPERATURES, function (c) { return d3Array.min(c.value, function (d) { return d[self.type]; }); }),
      d3Array.max(TEMPERATURES, function (c) { return d3Array.max(c.value, function (d) { return d[self.type]; }); })
    ]);

    self.z.domain(TEMPERATURES.map(function (c) { return c.id; }));

    self.x2.domain(self.x.domain());

    self.y2.domain(self.x.domain());
  }

  private drawAxis(): void {
    const self = this;
    self.focus.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + self.height + ')')
      .call(d3Axis.axisBottom(self.x));

    self.focus.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(self.y))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('fill', '#000')
      .text(this.type);

    // self.context.append('g')
    //   .attr('class', 'axis axis--x')
    //   .attr('transform', 'translate(0,' + this.height2 + ')')
    //   .call(d3Axis.axisBottom(this.x2));

  }

  private brushed() {
    const self = this;
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') { return; }
    const s = d3.event.selection || self.x2.range();
    self.x.domain(s.map(self.x2.invert, self.x2));
    self.focus.select('.line').attr('d', self.line);
    self.focus.select('.axis--x').call(self.xAxis);
    self.svg.select('.zoom').call(self.zoom.transform, d3Zoom.zoomIdentity
      .scale(self.width / (s[1] - s[0]))
      .translate(-s[0], 0));
  }

  private zoomed() {
    const self = this;
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') { return; }
    const t = d3.event.transform;
    self.x.domain(t.rescaleX(self.x2).domain());
    self.focus.select('.line').attr('d', self.line);
    self.focus.select('.axis--x').call(self.xAxis);
    self.context.select('.brush').call(self.brush.move, self.x.range().map(t.invertX, t));
  }


  private drawPath(TEMPERATURES): void {
    const self = this;
    const city = self.focus.selectAll('.city')
      .data(TEMPERATURES)
      .enter().append('g')
      .attr('class', 'city');

    city.append('path')
      .attr('class', 'line')
      .attr('d', (d) => self.line(d.value))
      .style('stroke', (d) => self.z(d.id));

    city.append('text')
      .datum(function (d) { return { id: d.id, value: d.value[d.value.length - 1] }; })
      .attr('transform', function (d) {
        return 'translate(' + self.x(self.parsedDate(d.value.TIMESTAMP)) + ',' + self.y(d.value[self.type]) + ')';
      })
      .attr('x', 3)
      .attr('dy', '0.35em')
      .style('font', '10px sans-serif')
      .text(function (d) {
        return d.id;
      });

    // let city2 = this.context.selectAll('.city1')
    //   .data(TEMPERATURES)
    //   .enter().append('g')
    //   .attr('class', 'city1');

    // city2.append('path')
    //   .attr('class', 'line')
    //   .attr("height", this.contextHeight)
    //   .attr('d', (d) => this.line(d.values))
    //   .style('stroke', (d) => this.z(d.id));


    // city2.append('g')
    //   .attr('class', 'brush')
    //   .call(this.brush)
    //   .call(this.brush.move, this.x.range());
    // this.svg.append('rect')
    //   .attr('class', 'zoom')
    //   .attr('width', this.width)
    //   .attr('height', this.height)
    //   .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
    //   .call(this.zoom);

  }

  resetData() {
    const self = this,
      stDt = new Date(self.servicestart).toISOString(),
      stEnd = new Date(self.serviceend).toISOString();
      self.load = false;
      self.loadData(stDt, stEnd);
  }

}
