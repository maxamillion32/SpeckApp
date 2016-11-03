import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Beacon } from '../../models/beacon';
import { BLE } from 'ionic-native';


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
    this.startScan();
  }

  startScan() {
    BLE.startScan([]).subscribe(device => {
      let beacon = new Beacon(device.id, device.name, device.rssi);
      this.beacons.push(beacon);
    });

    setTimeout(() => {
      BLE.stopScan().then(() => {
        console.log(JSON.stringify(this.beacons))
      });
    }, 3000);
  }
}