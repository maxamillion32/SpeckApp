import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ActionSheetController, ModalController } from 'ionic-angular';
import { Pagebase } from '../base/pageBase';
import { BeaconService } from '../../services/beaconService';
import { MachineModalPage } from '../machineModalPage/machineModalPage';

@Component({
  selector: 'page-beacons',
  templateUrl: 'beacons.html',
  providers: [BeaconService]
})
export class BeaconsPage extends Pagebase {

  beacons: any;
  icons: any;
  visibleBeacons: any;
  selectedBeacons: any;
  maxBeacons: number;

  constructor(public navCtrl: NavController,
    loadingCtrl: LoadingController,
    alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private beaconService: BeaconService,
    private modalCtrl: ModalController) {

    super(loadingCtrl, alertCtrl);
    this.beacons = [];
    this.visibleBeacons = [];
    this.selectedBeacons = [];
    this.maxBeacons = 2;

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

  chooseMachine(beacon) {
    let modal = this.modalCtrl.create(MachineModalPage, { "beacon": this.selectedBeacons });
    modal.present();
    this.selectedBeacons = [];
  }

  toggleVisibility(beacon) {
    var index = this.visibleBeacons.indexOf(beacon);
    if (index === -1) {
      this.visibleBeacons.push(beacon);
    }
    else {
      this.visibleBeacons.splice(index, 1);
    }
  }

  isBeaconInformationVisible(beacon) {
    if (this.visibleBeacons.indexOf(beacon) === -1)
      return false;
    else
      return true;
  }

  toggleSelection(beacon) {
    var index = this.selectedBeacons.indexOf(beacon);
    if (index === -1) {
      if (!this.areMaxBeaconsSelected()) {
        this.selectedBeacons.push(beacon);
      }
    }
    else {
      this.selectedBeacons.splice(index, 1);
    }
  }

  isAnyBeaconSelected() {
    return this.selectedBeacons.length > 0;
  }

  isBeaconSelected(beacon) {
    if (this.selectedBeacons.indexOf(beacon) === -1)
      return false;
    else
      return true;
  }

  areMaxBeaconsSelected() {
    return this.selectedBeacons.length >= this.maxBeacons;
  }
}