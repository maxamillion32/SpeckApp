import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Beacon } from '../../models/beacon';
import { Pagebase } from '../base/pageBase';
import { BeaconService } from '../../services/beaconService';

@Component({
  selector: 'page-beacons',
  templateUrl: 'beacons.html',
  providers: [BeaconService]
})
export class BeaconsPage extends Pagebase {

  beacons: any;
  icons: any;

  constructor(public navCtrl: NavController,
    loadingCtrl: LoadingController,
    alertCtrl: AlertController,
    private beaconService: BeaconService) {

    super(loadingCtrl, alertCtrl);
    this.beacons = [];
    this.icons = 'something';

    this.startScanBeacons();
    this.checkForUnreachableBeacons();
  }

  startScanBeacons() {

    setInterval(() => {
      this.beacons = this.beaconService.scanForBeacons();
    }, 200);

  }

  checkForUnreachableBeacons() {

    setInterval(() => {
      for (let beacon of this.beacons) {

        var dateTimeDelta = this.calculateDateTimeDelta(new Date(), beacon.lastUpdated);

        if (dateTimeDelta.getSeconds() >= 3) {
          beacon.isReachable = false;
        }

      }
    }, 1000);
  }

  calculateDateTimeDelta(date1: Date, date2: Date) {
    var dateTimeDelta = +(date1) - +(date2);
    return new Date(dateTimeDelta);
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