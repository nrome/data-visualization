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

    /* original concept was to consume json data through
       a RESTful API using Angular 5 service patterns
       (i.e. RxJS > Observable > Subscribe)

       d3.json will tap an external source
       using a javascript/ES6 promise w/ arrow func
       not sure about performance implications with either approach */

    // mock service up and running
    console.log(this.buildings);

    // define the canvas area via DOM selector
    const svg = d3.select('#chart-area')
      .append('svg')
        .attr('width', '500')
        .attr('height', '500');

    // pull static data from the assets dir
    // latest version of d3 affords use of js promises to build visuals
    d3.json('../../../assets/static-data/buildings.json').then((data) => {
      console.log(data);
      data.forEach(d => {
        d.height = +d.height;
      });

      // height proportioned to height of buildings
      const y = d3.scaleLinear()
                .domain([0, 828]) // input or MAX raw data (i.e. 0 - 828)
                .range([0, 400]); // output or value to normalize (i.e. 0 - 400)

      const rects = svg.selectAll('rect')
                     .data(data)
                     .enter()
                     .append('rect')
                     .attr('y', 20)
                     .attr('x', (d, i) => {
                       return (i * 60);
                     })
                     .attr('width', 40)
                     .attr('height', (d) => {
                       return y(d.height);
                     })
                     .attr('fill', (d) => {
                       return 'grey';
                     });

    }).catch((error) => {
      // new - we can catch errors when promises are rejected
      console.log(error);
    });

  } // ngOnInit

}


/**
  * Logarithmic Scale Example

    const x = d3.scaleLog()
              .domain([300, 150000])
              .range([0, 400])
              .base(10);

          console.log(x(500)) // 32.9
          console.log(x(5000)) // 181.1
          console.log(x(50000)) // 329.3

          console.log(x.invert(32.9)) // 500
          console.log(x.invert(181.1)) // 5000
          console.log(x.invert(329.3)) // 50000

  * Time Scale Example

    const x = d3.scaleTime()
              .domain([new Date(2000, 0, 1), new Date(2001, 0, 1)])
              .range([0, 400]);

          console.log(x(new Date(2000, 7, 1))) // 199
          console.log(x(new Date(2000, 2, 1))) // 66.5
          console.log(x(new Date(2000, 10, 25))) // 360

          console.log(x.invert(232.8)) // Tue Aug 01 2000
          console.log(x.invert(66.5)) // Wed Mar 01 2000
          console.log(x.invert(360)) // Sun Nov 25 2000

  * Ordinal Scale Example using D3 API colorscheme

    const x = d3.scaleOridinal()
              .domain(['AFRICA',
                       'N. AMERICA',
                       'S. AMERICA',
                       'EUROPE',
                       'ASIA',
                       'AUSTRALASIA'])
              .range(d3.shcemeCategory10)
              .base(10);

          console.log(color('AFRICA')) // #1f77b4
          console.log(color('ASIA')) // #9467bd
          console.log(color('ANTARCTICA')) // #e377c2
          console.log(color('PANGAEA')) // #7f7f7f
**/