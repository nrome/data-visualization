import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-data-panel-one',
  templateUrl: './data-panel-one.component.html',
  styleUrls: ['./data-panel-one.component.css']
})
export class DataPanelOneComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    d3.select('p').style('color', 'red');

    // my original concept was to consume json data through
    // a RESTful API using Angular 5 service patterns
    // (i.e. RxJS > Observable > Subscribe)

    // however, d3.json will tab an external source 
    // using a javascript/ES6 promise w/ arrow func
    // not sure about performance implications with either approach

    d3.json('https://jsonplaceholder.typicode.com/users').then((data) => {

      // console.log(data);

      // iterate over the promise result
      data.forEach((d) => {
        // console.log(d.name);
      });

      // define the svg canvas
      const svg = d3.select('#chart-area').append('svg')
        .attr('width', 500)
        .attr('height', 500);

      // wrap each entity in a shape
      const circles = svg.selectAll('circle').data(data);

      // specify conditions for shapes
      circles.enter()
        .append('circle')
          .attr('cx', function(d, i) {
            console.log(d);
            return(i * 50) + 25;
          })
          .attr('cy', 25)
          .attr('r', function(d) {
            return d.id * 2;
          })
          .attr('fill', function(d) {
            if (d.name === 'Mrs. Dennis Schulist') {
              return 'blue';
            } else {
                return 'red';
            }
          });


    });


  /* // define the svg canvas
    const svg = d3.select('#chart-area').append('svg')
                .attr('width', 500)
                .attr('height', 500);

    // apply shapes

    const circle = svg.append('circle')
                    .attr('cx', 250)
                    .attr('cy', 250)
                    .attr('r', 45)
                    .attr('fill', 'blue');

    const line = svg.append('line')
                    .attr('x1', 100)
                    .attr('y1', 300)
                    .attr('x2', 100)
                    .attr('y2', 100)
                    .attr('stroke-width', 2)
                    .attr('stroke', 'black');

    const rect = svg.append('rect')
                    .attr('x', 20)
                    .attr('y', 20)
                    .attr('width', 100)
                    .attr('height', 60)
                    .attr('fill', 'red');
    
    const ellipse = svg.append('ellipse')
                    .attr('cx', 50)
                    .attr('cy', 50)
                    .attr('rx', 25)
                    .attr('ry', 10);
  */

  } 

}
