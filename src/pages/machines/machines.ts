import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Machine } from '../../models/machine';

@Component({
  selector: 'page-machines',
  templateUrl: 'machines.html'
})
export class MachinesPage {

  machines: any;

  constructor(public navCtrl: NavController) {
    this.machines = [];
    this.createSampleData();
  }

  createSampleData(){
    for(var i=0; i < 10; i++){
      let machine = new Machine(i, "Machine " + i, i%2);
      this.machines.push(machine);
    }
  }
}