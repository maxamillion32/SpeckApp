import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Beacon } from '../../models/beacon'



@Component({
  selector: 'page-beacons',
  templateUrl: 'beacons.html'
})
export class BeaconsPage {

  beacons: any;
  icons: any;

  constructor(public navCtrl: NavController) {
    this.beacons = [];
    this.icons = 'something';
    this.createSampleData();
  }

  createSampleData() {
    for (var i = 0; i < 10; i++) {
      let beaconObject = new Beacon(i, "Beacon " + i);
      this.beacons.push(beaconObject);
    }
  }
}