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
        .attr('height', '600');

    // pull static data from the assets dir
    // latest version of d3 affords use of js promises to build visuals
    d3.json('../../../assets/static-data/buildings.json').then((data) => {
      console.log(data);

      data.forEach(d => {
        console.log(d.height);
        d.height = +d.height;
      });

      // height proportioned to height of buildings
      const x = d3.scaleBand()
                .domain(['Burj Khalifa',
                         'Shanghai Tower',
                         'Abraj Al-Bait Clock Tower',
                         'Ping An Finance Centre',
                         'Lotte World Tower',
                         'One World Trade Center',
                         'Guangzhou CTF Finance Center'])
                .range([0, 400])
                .paddingInner(0.4)
                .paddingOuter(0.4);

      console.log(x('Burj Khalifa'));

      const y = d3.scaleLinear()
                  .domain([0, 828])
                  .range([0, 400]);

      const rects = svg.selectAll('rect')
                     .data(data)
                     .enter()
                     .append('rect')
                     .attr('y', 20)
                     .attr('x', (d) => {
                     // .attr('x', (d, i) => {
                       // return (i * 60);
                       return x(d.name);
                     })
                     // .attr('width', 40)
                     .attr('width', x.bandwidth)
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
  * Min, Max, and Extend functions in D3

    let data = [
      { grade: 'A', value: 4 },
      { grade: 'B', value: 3 },
      { grade: 'C', value: 2 }
    ]

    let min = d3.min(data, (d) => {
      return d.value;
    })

    console.log(min) // 2

    let max = d3.max(data, (d) => {
      return d.value;
    })

    console.log(max) // 4

    let val_extent = d3.extent(data, (d) => {
      return d.value;
    })

    console.log(val_extent) // [2, 4]

    let grade_map = data.map((d) => {
      return d.grade;
    })

    console.log(grade_map) // ['A', 'B', 'C']

    let y = d3.scaleLinear()
      .domain([
        d3.min(data, (d) => { return d.value; });
        d3.max(data, (d) => { return d.value; });
      ]) // [2, 4]
      .range([0, 400])

    let y = d3.scaleLinear()
      .domain([d3.extent(data, (d) => { return d.value; })]) // [2, 4]
      .range([0, 400])

    let x = d3.scaleBand()
      .domain(data.map((d) => { return d.grade; })) // ['A','B','C']
      .range([0, 400])
      .paddingInner(0.3)
      .paddingOuter(0.3);

**/