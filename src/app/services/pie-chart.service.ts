import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PieChart } from '../models/pie-chart';

@Injectable()
export class PieChartService {

  private mockData: PieChart[] = [
    {
      label: 'data1',
      value: 1,
    },
    {
      label: 'data2',
      value: 2,
    },
    {
      label: 'data3',
      value: 3,
    },
    {
      label: 'data4',
      value: 4,
    }
  ];

}
