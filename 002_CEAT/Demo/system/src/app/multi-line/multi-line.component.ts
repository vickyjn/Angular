import { Component, ElementRef, ViewChild, OnChanges, ViewEncapsulation, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-multi-line',
    templateUrl: './multi-line.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./multi-line.component.css']
})
export class MultiLineComponent implements OnChanges {
    noData: boolean = false;
    loading: boolean = true;
    noLegends: boolean = true;
    legends: Array<any> = [];
    className: string = 'multi-line' + (new Date()).getTime();
    @ViewChild('divToMeasure') divToMeasureElement: ElementRef;
    @Input() viewData;
    @Input() x;
    @Input() y;
    @Input() id;
    nativeWidth: number = 800;
    legendsWidth:number = 110;
    constructor() { }
    loadChart(type) {
        this.y = type;
        this.load();
    }
    ngOnChanges() {
        this.load();
    }
    toggleLine(d, l) {
        var active = d.active ? false : true,
            newOpacity = active ? 0 : 1;
        d3.selectAll('.line')
            .transition().duration(100)
            .style("opacity", 0);
        d3.select(d.tag)
            .transition().duration(100)
            .style("opacity", 1);
        l.forEach(element => {
            element.active = false;
        });
        d.active = active;
        if (!active) {
            d3.selectAll('.line')
                .transition().duration(100)
                .style("opacity", 1);
        }
    }
    onResize() {
        this.load();
    }
    load() {
        var self = this;
        if (!self.noLegends) {
            self.legendsWidth = 0;
        }
        this.nativeWidth = this.divToMeasureElement.nativeElement.offsetWidth;
        var margin = { top: 30, right: 20, bottom: 70, left: 50 },
            width = self.nativeWidth - margin.left - margin.right - self.legendsWidth,
            height = 400 - margin.top - margin.bottom;

        // Set the ranges
        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        // Define the axes
        var xAxis = d3.axisBottom(x).ticks(5);

        var yAxis = d3.axisLeft(y).ticks(5);
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        // Define the line
        var priceline = d3.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.price);
            });

        // Adds the svg canvas
        if (self.className) {
            d3.select(".multiline svg").remove();
            var svg = d3.select(".multiline")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            if (self.viewData && self.viewData.length) {
                self.noData = false;
                self.loading = false;
                var data = self.viewData;
                data.forEach(function (d) {
                    d.date = new Date(d[self.x]);
                    d.price = +parseFloat(d[self.y]);
                });

                // Scale the range of the data
                x.domain(d3.extent(data, function (d) { return d.date; }));
                y.domain([0, d3.max(data, function (d) { return d.price; })]);

                // Nest the entries by symbol
                var dataNest = d3.nest()
                    .key(function (d) {
                        return d[self.id];
                    })
                    .entries(data);
                var legendSpace = width / dataNest.length;
                // Loop through each symbol / key
                svg.append('g').attr('class', 'legends');
                self.legends = [];
                dataNest.forEach(function (d, i) {
                    svg.append("path")
                        .attr("class", "line")
                        .attr("id", 'tag' + d.key.replace(/\s+/g, ''))
                        .style("stroke", function () {
                            return d.color = color(d.key);
                        })
                        .style("stroke-width", 3)
                        .attr("d", priceline(d.values));
                    // Add the Legend
                    self.legends.push({ 'name': ('Tyre' + parseInt(i + 1)), 'tag': "#tag" + d.key.replace(/\s+/g, ''), color: color(d.key) });                    
                });
                if(!self.legends.length && self.legends) {
                    self.noLegends = false;
                }
                // Add the X Axis
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                // Add the Y Axis
                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);
            } else if (self.viewData && !self.viewData.length) {
                self.noData = true;
                self.loading = false;
            }
        }
    }

}
