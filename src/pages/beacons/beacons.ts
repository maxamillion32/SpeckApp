import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Beacon } from '../../models/beacon';
import { BLE } from 'ionic-native';
import { Messages } from '../../app/app.messages';
import { LoadingPageBase } from '../base/loadingPageBase';

@Component({
  selector: 'page-beacons',
  templateUrl: 'beacons.html'
})
export class BeaconsPage extends LoadingPageBase {

  beacons: any;
  icons: any;
  scanDuraction: number;

  constructor(public navCtrl: NavController, loadingCtrl: LoadingController) {
    super(loadingCtrl);
    this.beacons = [];
    this.icons = 'something';
    this.startScanBeacons();
  }

  startScanBeacons() {
    this.beacons = [];
    this.showLoadingCtrl(Messages.SCAN_FOR_BEACONS, 3000);

    BLE.startScan([]).subscribe(device => {
      let beacon = new Beacon(device.id, device.name, device.rssi);
      this.beacons.push(beacon);
    });

    setTimeout(() => {
      BLE.stopScan().then(() => {
        console.log(JSON.stringify(this.beacons))
      });
    }, this.scanDuraction);


    //this.beacons.push(new Beacon("Test", "Test", -91));
  }
}