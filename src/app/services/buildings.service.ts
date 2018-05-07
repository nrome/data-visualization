import { Injectable } from '@angular/core';

import { Buildings } from '../models/buildings';

@Injectable()
export class BuildingsService {

  // define properties
  buildings: Buildings[];

  constructor() { 
    this.buildings = [
      {
        name: 'Burj Khalifa',
        height: '350'
      },
      {
        name: 'Shanghai Tower',
        height: '263.34'
      },
      {
        name: 'Abraj Al-Bait Clock Tower',
        height: '254.04'
      },
      {
        name: 'Ping An Finance Centre',
        height: '253.20'
      },
      {
        name: 'Lotte World Tower',
        height: '230.16'
      }
    ]

  } // END constructor

  getBuildings() {
    return this.buildings;
  }

}
