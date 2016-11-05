import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelpPage } from '../pages/help/help';
import { BeaconsPage } from '../pages/beacons/beacons';
import { MachinesPage } from '../pages/machines/machines';
import { TabsPage } from '../pages/tabs/tabs';
import { MachineModalPage } from '../pages/machineModalPage/machineModalPage';
import { MachineDetailsPage } from '../pages/machineDetails/machineDetails';

@NgModule({
  declarations: [
    MyApp,
    HelpPage,
    BeaconsPage,
    MachinesPage,
    TabsPage,
    MachineModalPage,
    MachineDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelpPage,
    BeaconsPage,
    MachinesPage,
    TabsPage,
    MachineModalPage,
    MachineDetailsPage
  ],
  providers: []
})
export class AppModule { }