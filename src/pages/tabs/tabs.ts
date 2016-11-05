import { Component } from '@angular/core';

import { HelpPage } from '../help/help';
import { BeaconsPage } from '../beacons/beacons';
import { MachinesPage } from '../machines/machines';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HelpPage;
  tab2Root: any = BeaconsPage;
  tab3Root: any = MachinesPage;  

  constructor() {
  }
}