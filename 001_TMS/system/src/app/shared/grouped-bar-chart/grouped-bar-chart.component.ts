import { Component, OnInit, Input, DoCheck } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'tms-grouped-bar-chart',
  templateUrl: './grouped-bar-chart.component.html',
  styleUrls: ['./grouped-bar-chart.component.css']
})
export class GroupedBarChartComponent implements OnInit {

  @Input() data;
  @Input() pickLabel;
  title = 'Group Bar Chart';
  svg: any; 
  
  constructor() { }

  ngOnInit() {
    this.initSvg(this.data);
  }
  ngDoCheck() {
  }

  private initSvg(unparsed: any[]) {
    this.svg = d3.select('svg');
    var self = this;
    var data = this.processdata(unparsed);

    var chartWidth = 600,
      barHeight = 20,
      groupHeight = barHeight * data.series.length,
      gapBetweenGroups = 10,
      spaceForLabels = 250,
      spaceForLegend = 150;

    // Zip the series data together (first values, second values, etc.)
    var zippedData = [];
    for (var i = 0; i < data.labels.length; i++) {
      for (var j = 0; j < data.series.length; j++) {
        zippedData.push(data.series[j].values[i]);
      }
    }

    // Color scale
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

    var x = d3.scaleLinear()
      .domain([0, d3.max(zippedData)])
      .range([0, chartWidth]);

    var y = d3.scaleLinear()
      .range([chartHeight + gapBetweenGroups, 0]);
    var yAxis = d3.axisLeft(y);

    // Specify the chart area and dimensions
    var chart = d3.select(".chart")
      .attr("width", spaceForLabels + chartWidth + spaceForLegend)
      .attr("height", chartHeight);

    // Create bars
    var bar = chart.selectAll("g")
      .data(zippedData)
      .enter().append("g")
      .attr("transform", function (d, i) {
        return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i / data.series.length))) + ")";
      });

    // Create rectangles of the correct width
    bar.append("rect")
      .attr("fill", function (d, i) { return color(i % data.series.length); })
      .attr("class", "bar")
      .attr("width", x)
      .attr("height", barHeight - 1);

    // Add text label in bar
    bar.append("text")
      .attr("x", function (d) { return x(d) - 40; })
      .attr("y", barHeight / 2)
      .attr("fill", "#fff")
      .attr("dy", ".35em")
      .text(function (d) { return d; });

    // Draw labels
    bar.append("text")
      .attr("class", "label")
      .attr("x", function (d) { return - 100; })
      .attr("y", groupHeight / 2)
      .attr("dy", ".35em")
      .text(function (d, i) {
        if (i % data.series.length === 0)
          return data.labels[Math.floor(i / data.series.length)];
        else
          return ""
      });

    chart.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups / 2 + ")")
      .call(yAxis);

    // Draw legend
    var legendRectSize = 18,
      legendSpacing = 4;

    var legend = chart.selectAll('.legend')
      .data(data.series)
      .enter()
      .append('g')
      .attr('transform', function (d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = -gapBetweenGroups / 2;
        var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
      });

    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', function (d, i) { return color(i); })
      .style('stroke', function (d, i) { return color(i); });

    legend.append('text')
      .attr('class', 'legend')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function (d) { return d.label; });
  }
  private processdata(data) {

    var name = [];
    var lable_pro = [];
    var lable_invo = [];
    var lable_res = [];
    var lable_com = [];
    var series_obj = [];
    var labels = [];

    for (var i = 0; i < data.length; i++) {
      name.push(data[i].name)
      for (var j = 0; j < data[i].series.length; j++) {
        if (data[i].series[j].type == 'Project') {
          lable_pro.push(data[i].series[j].hours);
        }
        else if (data[i].series[j].type == 'Innovation') {
          lable_invo.push(data[i].series[j].hours);
        }
        else if (data[i].series[j].type == 'Research') {
          lable_res.push(data[i].series[j].hours);
        }
        else if (data[i].series[j].type == 'Competency Building') {
          lable_com.push(data[i].series[j].hours);
        }
      }
    }

    series_obj.push({
      'label': 'Project', 'values': lable_pro
    });
    series_obj.push({
      'label': 'Innovation', 'values': lable_invo
    });
    series_obj.push({
      'label': 'Research', 'values': lable_res
    });
    series_obj.push({
      'label': 'Competency Building', 'values': lable_com
    });

    var final_obj = {
      'labels': name,
      'series': series_obj
    };
    return final_obj;
  }

}