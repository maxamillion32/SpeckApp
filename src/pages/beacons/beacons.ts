import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Beacon } from '../../models/beacon';
import { BLE } from 'ionic-native';
import { Messages } from '../../app/app.messages';
import { Pagebase } from '../base/pageBase';

@Component({
  selector: 'page-beacons',
  templateUrl: 'beacons.html'
})
export class BeaconsPage extends Pagebase {

  beacons: any;
  icons: any;
  scanDuraction: number;

  constructor(public navCtrl: NavController, loadingCtrl: LoadingController, alertCtrl: AlertController) {
    super(loadingCtrl, alertCtrl);
    this.beacons = [];
    this.icons = 'something';
    this.beacons.push(new Beacon("Test", "Test", -91));
    //this.startScanBeacons();
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
  }

  onSwipe(beacon: Beacon) {
    console.log('swiped');
    console.log(JSON.stringify(beacon));
  }

  onDelete() {
    this.showAlert("Delete", "Really delete?", [
      {
        text: 'Yes',        
        handler: data => {
          console.log('Yes clicked');
        }
      },
      {
        text: 'No',        
        handler: data => {
          console.log('No clicked');
        }
      }
    ]);
  }
}