import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

// services
import { BuildingsService } from '../../services/buildings.service';
// models
import { Buildings } from '../../models/buildings';

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

    this.buildings = this.buildingService.getBuildings();

    // call in mock service
    console.log(this.buildings);

    /* set window rules for visualization, deduct
       margins from h/w vars to plug them in w/out nudging */
    const margin = { left: 100, right: 10, top: 10, bottom: 150 };

    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    /* define a group as g, shift the group
       around inside the selected DOM area */
    const g = d3.select('#chart-area')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    // configure the X Label
    g.append('text')
      .attr('class', 'x axis-label')
      .attr('x', width / 2)
      .attr('y', height + 140)
      .attr('font-size', '22px')
      .attr('text-anchor', 'middle')
      .text('The world\'s tallest buildings');

    // configure the Y Label
    g.append('text')
      .attr('class', 'y axis-label')
      .attr('x', - (height / 2))
      .attr('y', -60)
      .attr('font-size', '22px')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text('Height in Meters');

    // pull static data from the assets dir
    d3.json('../../../assets/static-data/buildings.json').then((data) => {
      console.log(data);

      /* define data as d, iterate over
         and create an index for access */
      data.forEach(d => {
        d.height = +d.height;
      });

      const x = d3.scaleBand()
                // maps/calls the defined array of data
                .domain(data.map((d) => {
                  return d.name;
                }))
                .range([0, width])
                .paddingInner(0.3)
                .paddingOuter(0.3);

      const y = d3.scaleLinear()
                  .domain([0, d3.max(data, (d) => {
                    return d.height;
                  })])
                  .range([0, height]);

      // axis graph/line text generators
      const xAxisCall = d3.axisBottom(x);
      // define the group for xAxis
      g.append('g')
       .attr('class', 'x axis')
       .attr('transform', 'translate(0, ' + height + ')')
       .call(xAxisCall)
       .selectAll('text') // alter text labels
         .attr('y', '10')
         .attr('x', '-5')
         .attr('text-anchor', 'end')
         .attr('transform', 'rotate(-40)');

      const yAxisCall = d3.axisLeft(y)
        .ticks(3)
        .tickFormat((d) => {
          return d + 'm'; // format in meters
        });
      // define the group for yAxis
      g.append('g')
        .attr('class', 'y-axis')
        .call(yAxisCall);

      const rects = g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('y', 0)
        .attr('x', (d) => {
          return x(d.name);
        })
        .attr('width', x.bandwidth)
        .attr('height', (d) => {
          return y(d.height);
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