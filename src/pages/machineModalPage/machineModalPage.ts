import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { Pagebase } from '../base/pageBase';
import { Machine } from '../../models/machine';

@Component({
    selector: 'page-machinemodal',
    templateUrl: 'machineModalPage.html'
})
export class MachineModalPage extends Pagebase {

    machines: any;
    beacons: any;

    maxBeacons: number;

    constructor(public navCtrl: NavController, loadingCtrl: LoadingController, alertCtrl: AlertController, public viewCtrl: ViewController, private _navParams: NavParams) {
        super(loadingCtrl, alertCtrl);

        //Testdaten erstellen
        this.beacons = this._navParams.get("beacon");
        this.machines = [];

        this.maxBeacons = 2;

        for (var i = 0; i < 10; i++) {
            let machine = new Machine(i, "Machine " + i, "", "");
            this.machines.push(machine);
        }
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
        console.log('Machine: ' + machine.name);
        for (var i = 0; i < this.beacons.length; i++)
            console.log('Beacon ' + (i + 1) + ": " + this.beacons[i].nid);
        this.viewCtrl.dismiss();
    }

    createMachineWithBeacons() {
        for (var i = 0; i < this.beacons.length; i++)
            console.log('Beacon ' + (i + 1) + ": " + this.beacons[i].nid);
        this.viewCtrl.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}