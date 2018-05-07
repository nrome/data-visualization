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
        height: '828'
      },
      {
        name: 'Shanghai Tower',
        height: '623'
      },
      {
        name: 'Abraj Al-Bait Clock Tower',
        height: '601'
      },
      {
        name: 'Ping An Finance Centre',
        height: '599'
      },
      {
        name: 'Lotte World Tower',
        height: '544'
      },
      {
        name: 'One World Trade Center',
        height: '541'
      },
      {
        name: 'Guangzhou CTF Finance Center',
        height: '530'
      }
    ]

  } // END constructor

  getBuildings() {
    return this.buildings;
  }

}
