import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Machine } from '../../models/machine';
import { Beacon } from '../../models/beacon';
import { MachineDetailsPage } from '../machineDetails/machineDetails';
import { Pagebase } from '../base/pageBase';
import { NativeStorage } from 'ionic-native';
import { BeaconService } from '../../services/beaconService';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-machines',
  templateUrl: 'machines.html',
  providers: [BeaconService]
})
export class MachinesPage extends Pagebase {

  machines: any;
  selectedMachine: Machine;

  /** Constructor */
  constructor(public navCtrl: NavController, loadingCtrl: LoadingController, alertCtrl: AlertController, platform: Platform, private beaconService: BeaconService) {
    super(loadingCtrl, alertCtrl);

    platform.ready().then(() => {

      this.machines = [];

      // Load all machines from native device storage
      NativeStorage.getItem('savedMachines')
        .then(data => {
          console.log('Machines retrieved!');
          this.machines = data;
        },

        // In case of error, initialize 'savedMachines' item 
        error => NativeStorage.setItem('savedMachines', this.machines)
          .then(() => {
            console.log('Machines stored!');
          },
          error => console.error('Error storing item: ', error)));
    });

    setInterval(() => {
      this.updateMachinesRssiInformation();
    }, 5000);
  }

  updateMachinesRssiInformation() {
    let beacons = this.beaconService.scanForBeacons();

    NativeStorage.getItem("savedMachines")
      .then(data => {

        this.machines = data;

        for (let machine of this.machines) {
          var machineBeacon1 = machine.assignedBeacons[0];
          var machineBeacon2 = machine.assignedBeacons[1];

          console.log('BeaconId1: ' + machineBeacon1);
          console.log('BeaconId2: ' + machineBeacon2);

          let beacon1: any;
          let beacon2: any;

          console.log('Beacons.length: ' + beacons.length);

          for (var i = 0; i < beacons.length; i++) {

            if (beacons[i].uniqueId == machineBeacon1.uniqueId && !machineBeacon1.isDummy) {
              beacon1 = beacons[i];
            }

            if (beacons[i].uniqueId == machineBeacon2.uniqueId && !machineBeacon2.isDummy) {
              beacon2 = beacons[i];
            }
          }

          let beacon1Rssi = 0;
          let beacon2Rssi = 0;

          if (beacon1 != undefined && beacon2 != undefined) {
            machine.rssi = (beacon1Rssi + beacon2Rssi) / 2;
          }

          else if (beacon1 != undefined && beacon2 == undefined) {
            machine.rssi = beacon1.rssi;
          }

          else if (beacon1 == undefined && beacon2 != undefined) {
            machine.rssi = beacon2.rssi;
          }
          else {
            machine.rssi = 42;
          }
        }
      });
  }

  addMachine() {

    let itemIndex = this.machines.length + 1;
    let selectedMachine = new Machine(itemIndex, "Neu " + itemIndex, "Typ " + itemIndex, "This is a new machine..");
    selectedMachine.assignedBeacons.push(new Beacon("Dummy", "Dummy", 0, "", "", "", "", "", true));
    selectedMachine.assignedBeacons.push(new Beacon("EchterBeacon", "EchterTyp", 0, "", "", "", "", "", false));

    this.navCtrl.push(MachineDetailsPage, { machine: selectedMachine, isNew: true });

  }

  navigateToMachineDetails(machine: Machine) {

    this.navCtrl.push(MachineDetailsPage, { machine: machine, isNew: false });
  }

  ionViewWillEnter() {

    NativeStorage.getItem('savedMachines')
      .then(data => {
        console.log('Machines retrieved!');
        this.machines = data;
      },
      error => console.log(error));

  }
}