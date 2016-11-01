import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { BeaconsPage } from '../beacons/beacons';
import { MachinesPage } from '../machines/machines';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = BeaconsPage;
  tab3Root: any = MachinesPage;

  countBeacons: number;

  constructor() {    
    this.countBeacons = 10;
  }
}