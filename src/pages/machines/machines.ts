import { Component } from '@angular/core';

import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Machine } from '../../models/machine';
import { Pagebase } from '../base/pageBase';

@Component({
  selector: 'page-machines',
  templateUrl: 'machines.html'
})
export class MachinesPage extends Pagebase {

  machines: any;

  constructor(public navCtrl: NavController, loadingCtrl: LoadingController, alertCtrl: AlertController) {
    super(loadingCtrl, alertCtrl)
    this.machines = [];
    this.createSampleData();
  }

  createSampleData() {
    for (var i = 0; i < 10; i++) {
      let machine = new Machine(i, "Machine " + i, i % 2);
      this.machines.push(machine);
    }
  }

  addMachine() {
    this.saveItem("machine", new Machine(1, "Machine", 2));
  }
}