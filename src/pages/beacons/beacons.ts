import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Beacon } from '../../models/beacon';
import { BLE } from 'ionic-native';
import { Messages } from '../../app/app.messages';
import { Pagebase } from '../base/pageBase';
import { StringByteConverterService } from '../../services/StringByteConverterService';
import { BeaconService } from '../../services/beaconService';

@Component({
  selector: 'page-beacons',
  templateUrl: 'beacons.html',
  providers: [StringByteConverterService, BeaconService]
})
export class BeaconsPage extends Pagebase {

  beacons: any;
  icons: any;
  scanDuraction: number;

  constructor(public navCtrl: NavController,
    loadingCtrl: LoadingController,
    alertCtrl: AlertController,
    private stringByteConverterService: StringByteConverterService,
    private beaconService: BeaconService) {

    super(loadingCtrl, alertCtrl);
    this.beacons = [];
    this.icons = 'something';
    //this.beacons.push(new Beacon("Test", "Test", -91));
    this.startScanBeacons();
  }

  startScanBeacons() {
    this.beacons = this.beaconService.scanForBeacons();
  }

  // startScanBeacons() {
  //   this.beacons = [];
  //   this.showLoadingCtrl(Messages.SCAN_FOR_BEACONS, 3000);

  //   BLE.startScan([]).subscribe(device => {

  //     var adData = new Uint8Array(device.advertising);
  //     console.log(adData);
  //     var stringRepresentation = this.stringByteConverterService.bytesToString(adData);
  //     console.log('String representation:')
  //     console.log(stringRepresentation);

  //     let beacon = new Beacon(device.id, device.name, device.rssi);
  //     this.beacons.push(beacon);
  //   });

  //   setTimeout(() => {
  //     BLE.stopScan().then(() => {
  //       console.log(JSON.stringify(this.beacons))
  //     });
  //   }, 3000);
  // }

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