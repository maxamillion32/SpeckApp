import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { Pagebase } from '../base/pageBase';
import { NativeStorage } from 'ionic-native';

@Component({
    selector: 'page-machinemodal',
    templateUrl: 'machineModalPage.html'
})
export class MachineModalPage extends Pagebase {

    machines: any;
    beacons: any;

    maxBeacons: number;

    constructor(public navCtrl: NavController,
        loadingCtrl: LoadingController,
        alertCtrl: AlertController,
        public viewCtrl: ViewController,
        private _navParams: NavParams, ) {
        super(loadingCtrl, alertCtrl);

        //Testdaten erstellen
        this.beacons = this._navParams.get("beacon");
        this.machines = [];

        this.maxBeacons = 2;

        NativeStorage.getItem("savedMachines").then((data) => {
            this.machines = data;
        });

        // for (var i = 0; i < 10; i++) {
        //     let machine = new Machine(i, "Machine " + i, "", "");
        //     this.machines.push(machine);
        // }
    }

    hasMachineEnoughBeaconSpots(machine) {
        if (machine.countBeacons + this.beacons.length > this.maxBeacons) {
            return false;
        }
        else {
            return true;
        }
    }

    addBeaconsToMachine(machine) {

        console.log(JSON.stringify(this.beacons));
        console.log('Machine: ' + machine.name);

        for (let beacon of this.beacons) {

            if (machine.assignedBeacons[0].isDummy) {
                machine.assignedBeacons[0] = beacon;
                continue;
            }

            if (machine.assignedBeacons[1].isDummy) {
                machine.assignedBeacons[1] = beacon;
            }
        }

        // Persist the new machine to the machines-array.
        for (var i = 0; i < this.machines.length; i++) {

            if (this.machines[i].id == machine.id) {
                this.machines[i] = machine;
            }
        }

        NativeStorage.setItem("savedMachines", this.machines);
        this.viewCtrl.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}