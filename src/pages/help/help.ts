import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BeaconsPage } from '../beacons/beacons';
import { MachinesPage } from '../machines/machines';

@Component({
  selector: 'page-help',
  templateUrl: 'help.html'
})
export class HelpPage {

  constructor(public navCtrl: NavController) {
  }

  navToBeacons() {
    this.navCtrl.push(BeaconsPage);
  }

  navToMachines() {
    this.navCtrl.push(MachinesPage);
  }

  //dummy
  navToHelp() {
    this.navCtrl.push(HelpPage);
  }
}