import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Beacon } from '../models/beacon';
import { BLE } from 'ionic-native';

@Injectable()
export class BeaconService {
    beacons: any;
    platform: Platform;
    frametype: string;
    rangingData: string;
    nid: string;
    bid: string;
    rfu: string;
    name: string;
    rssi: string;
    id: string;

    constructor(platform: Platform) {
        this.beacons = [];
        this.platform = platform;
    }

    scanForBeacons() {

        BLE.scan(['FEAA'], 1).subscribe(device => {

            this.frametype = "";
            this.rangingData = "";
            this.nid = "";
            this.bid = "";
            this.rfu = "";
            this.name = device.name;
            this.rssi = device.rssi;
            this.id = device.id;

            if (this.platform.is('ios')) {

                var rawData = new Uint8Array(device.advertising.kCBAdvDataServiceData['FEAA'])

                for (var _i = 0; _i < rawData.length; _i++) {
                    if (_i == 0) {
                        this.frametype = rawData[_i].toString(16);
                    }

                    if (_i == 1) {
                        this.rangingData = (parseInt(rawData[_i].toString()) - 256).toString();
                    }

                    if (_i >= 2 && _i <= 11) {
                        this.nid += rawData[_i].toString(16);
                    }

                    if (_i >= 12 && _i <= 17) {
                        this.bid += rawData[_i].toString(16);
                    }

                    if (_i >= 18 && _i <= 19) {
                        this.rfu += rawData[_i].toString(16);
                    }

                }


                console.log('id = ' + this.id);
                console.log('rssi = ' + this.rssi);
                console.log('name = ' + this.name);
                console.log('frametype = ' + this.frametype);
                console.log('rangingData = ' + this.rangingData);
                console.log('nid = ' + this.nid);
                console.log('bid = ' + this.bid);
                console.log('rfu = ' + this.rfu);

                let beacon = new Beacon(this.id, this.name, this.rssi, this.frametype, this.rangingData, this.nid, this.bid, this.rfu);
                this.beacons.push(beacon);
            }

            else if (this.platform.is('android')) {

                var rawData = new Uint8Array(device.advertising)

                for (var _i = 11; _i < rawData.length; _i++) {
                    if (_i == 11) {
                        this.frametype = rawData[_i].toString(16);
                    }

                    if (_i == 12) {
                        this.rangingData = (parseInt(rawData[_i].toString()) - 256).toString();
                    }

                    if (_i >= 13 && _i <= 22) {
                        this.nid += rawData[_i].toString(16);
                    }

                    if (_i >= 23 && _i <= 28) {
                        this.bid += rawData[_i].toString(16);
                    }

                    if (_i >= 29 && _i <= 30) {
                        this.rfu += rawData[_i].toString(16);
                    }

                }

                console.log('id = ' + this.id);
                console.log('rssi = ' + this.rssi);
                console.log('name = ' + this.name);
                console.log('frametype = ' + this.frametype);
                console.log('rangingData = ' + this.rangingData);
                console.log('nid = ' + this.nid);
                console.log('bid = ' + this.bid);
                console.log('rfu = ' + this.rfu);

                let beacon = new Beacon(this.id, this.name, this.rssi, this.frametype, this.rangingData, this.nid, this.bid, this.rfu);
                this.beacons.push(beacon);
            }

        });

        return this.beacons;
    }
}