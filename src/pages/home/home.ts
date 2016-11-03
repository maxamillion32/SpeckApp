import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { BeaconsPage } from '../beacons/beacons';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  navToBeacons(){
    this.navCtrl.push(BeaconsPage);
  }
}