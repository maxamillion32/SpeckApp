import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BeaconsPage } from '../pages/beacons/beacons';
import { MachinesPage } from '../pages/machines/machines';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BeaconsPage,
    MachinesPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BeaconsPage,
    MachinesPage,
    TabsPage
  ],
  providers: []
})
export class AppModule { }