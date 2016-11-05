import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Machine } from '../../models/machine';
import { Beacon } from '../../models/beacon';
import { MachineDetailsPage } from '../machineDetails/machineDetails';
import { Pagebase } from '../base/pageBase';
import { NativeStorage } from 'ionic-native';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-machines',
  templateUrl: 'machines.html'
})
export class MachinesPage extends Pagebase {

  machines: any;
  selectedMachine: Machine;

  /** Constructor */
  constructor(public navCtrl: NavController, loadingCtrl: LoadingController, alertCtrl: AlertController, platform: Platform) {
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