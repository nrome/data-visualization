import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

// services
import { BuildingsService } from '../../services/buildings.service';
// models
import { Buildings } from '../../models/buildings';
import { Revenue } from '../../models/revenue';

@Component({
  selector: 'app-data-panel-one',
  templateUrl: './data-panel-one.component.html',
  styleUrls: ['./data-panel-one.component.css']
})
export class DataPanelOneComponent implements OnInit {

  // inject services
  constructor(private buildingService: BuildingsService) { }

  // define properties
  buildings: Buildings[];

  ngOnInit() {

    d3.select('p').style('color', 'red');

    // ########################################
    // CALL IN MOCK SERVICE
    // ########################################

    this.buildings = this.buildingService.getBuildings();
    console.log(this.buildings);

    // ########################################
    // TARGET DOM/SELECTOR, SET BOUNDARIES
    // ########################################

    /* set window rules for visualization, deduct
       margins from h/w vars to plug them in w/out nudging */
    const margin = { left: 100, right: 10, top: 10, bottom: 100 };
    const width = 600 - margin.left - margin.right;
      console.log(width);
    const height = 400 - margin.top - margin.bottom;
      console.log(height);

    /* define a group as g, shift the group
       around inside the selected DOM area */
    const g = d3.select('#chart-area')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    // ########################################
    // CONFIGURE LABELS
    // ########################################

    // configure the X Label
    g.append('text')
      .attr('class', 'x axis-label')
      .attr('x', width / 2)
      .attr('y', height + 50)
      .attr('font-size', '22px')
      .attr('text-anchor', 'middle')
      .text('Month');

    // configure the Y Label
    g.append('text')
      .attr('class', 'y axis-label')
      .attr('x', - (height / 2))
      .attr('y', -65)
      .attr('font-size', '22px')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text('Revenue');

    // ########################################
    // GET DATA FROM SOURCE
    // ########################################

    // pull static data from the assets dir
    d3.json('../../../assets/static-data/revenues.json').then((data) => {
      console.log(data);

      /* define data as d, iterate over
         and create an index for access */
      data.forEach(d => {
        d.profit = +d.profit;
      });

    // ########################################
    // CONFIGURE X AXIS
    // ########################################

      const x = d3.scaleBand()
        // maps/calls the defined array of data
        .domain(data.map((d) => {
          return d.month;
        }))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

      // graph text generators
      const xAxisCall = d3.axisBottom(x);
      // define the group for xAxis
      g.append('g')
       .attr('class', 'x axis')
       .attr('transform', 'translate(0, ' + height + ')')
       .call(xAxisCall);

    // ########################################
    // CONFIGURE Y AXIS
    // ########################################

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => {
          return d.profit;
        })])
        .range([height, 0]);

      // graph text generators
      const yAxisCall = d3.axisLeft(y)
        .ticks(12)
        .tickFormat((d) => {
          return '$' + d; // dollar sign format
        });
      // define the group for yAxis
      g.append('g')
        .attr('class', 'y-axis')
        .call(yAxisCall);

    // ########################################
    // BUILD OUT SHAPES
    // ########################################

      const rects = g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('y', (d) => {
          return y(d.profit);
        })
        .attr('x', (d) => {
          return x(d.month);
        })
        .attr('width', x.bandwidth)
        .attr('height', (d) => {
          return height - y(d.profit);
        })
        .attr('fill', (d) => {
          return 'grey';
        });

    }).catch((error) => {
        console.log(error);
    });

  } // ngOnInit

}


/**
  * Examples

**/