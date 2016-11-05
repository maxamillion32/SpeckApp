import { Component } from '@angular/core';

import { NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import { Machine } from '../../models/machine';
import { Beacon } from '../../models/Beacon';
import { Pagebase } from '../base/pageBase';
import { NativeStorage } from 'ionic-native';

@Component({
  selector: 'page-machineDetails',
  templateUrl: 'machineDetails.html'
})
export class MachineDetailsPage extends Pagebase {

  machines: any;
  selectedMachine: Machine;
  isNewMachine: boolean;

  alertCtrl: AlertController;

  beacon1: Beacon;
  beacon2: Beacon;

  constructor(public navCtrl: NavController, loadingCtrl: LoadingController, alertCtrl: AlertController, public navParams: NavParams) {
    super(loadingCtrl, alertCtrl);

    this.alertCtrl = alertCtrl;

    this.machines = [];
    this.selectedMachine = navParams.get('machine') as Machine;
    this.isNewMachine = navParams.get('isNew') as boolean;
    this.beacon1 = this.selectedMachine.assignedBeacons[0] as Beacon;
    this.beacon2 = this.selectedMachine.assignedBeacons[1] as Beacon;

    NativeStorage.getItem('savedMachines')
      .then(data => {

        this.machines = data;

        if (this.isNewMachine) {

          this.machines.push(this.selectedMachine);

          NativeStorage.setItem('savedMachines', this.machines)
            .then(() => {
              console.log('Machines stored!');
            },
            error => console.error('Error storing item: ', error));
        }
      },
      error => console.error('Error getting item: ', error));

  }

  showEditDialog(name: string, type: string, description: string) {

    let prompt = this.alertCtrl.create({
      title: 'Maschine bearbeiten',
      message: "Bitte geben Sie die neuen Informationen ein:",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: name
        },
        {
          name: 'type',
          placeholder: 'Typ',
          value: type
        },
        {
          name: 'description',
          placeholder: 'Beschreibung',
          value: description
        },
      ],
      buttons: [
        {
          text: 'Abbrechen'
        },
        {
          text: 'Speichern',
          handler: data => {

            for (var _i = 0; _i < this.machines.length; _i++) {

              if (this.machines[_i].id === this.selectedMachine.id) {

                this.selectedMachine.name = data.name;
                this.selectedMachine.type = data.type;
                this.selectedMachine.description = data.description;

                this.machines[_i] = this.selectedMachine;

                break;

              }
            }

            NativeStorage.setItem('savedMachines', this.machines)
              .then(() => {
                console.log('Machines stored!');
              },
              error => console.error('Error storing item: ', error));

          }
        }
      ]
    });
    prompt.present();
  }

  ionViewWillEnter() {

    console.log('Im here...');

  }

  assignBeacon() {

  }

  unassignBeacon(beaconToUnassign: Beacon) {

    let beaconIndex = this.selectedMachine.assignedBeacons.indexOf(beaconToUnassign, 0);
    if (beaconIndex > -1) {
      this.selectedMachine.assignedBeacons[beaconIndex].isDummy = true;
    }

    // Save changes to the native storage
    if (this.machines == null) {

      this.machines = [];
      this.machines.push(this.selectedMachine);

    } else {

      let machineIndex = this.machines.indexOf(this.selectedMachine, 0);
      if (machineIndex > -1) {
        this.machines[machineIndex] = this.selectedMachine;
      }

    }

    this.saveItem('savedMachines', this.machines);
  }

  deleteMachine() {

    for (var _i = 0; _i < this.machines.length; _i++) {

      if (this.machines[_i].id === this.selectedMachine.id) {

        this.machines.splice(_i, 1);
        break;

      }
    }

    NativeStorage.setItem('savedMachines', this.machines)
      .then(() => {
        console.log('Machines stored!');
      },
      error => console.error('Error storing item: ', error));

    // Navigate back
    this.navCtrl.pop();

  }
} 