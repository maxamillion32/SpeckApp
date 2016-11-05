import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Beacon } from '../models/beacon';
import { BLE } from 'ionic-native';

@Injectable()
export class BeaconService {
    beacons: Beacon[];
    platform: Platform;
    frametype: string;
    rangingData: string;
    nid: string;
    bid: string;
    rfu: string;
    name: string;
    rssi: number;
    id: string;

    constructor(platform: Platform) {
        this.beacons = new Array<Beacon>();
        this.platform = platform;
    }

    scanForBeacons() {

        BLE.scan(['FEAA'], 0.1).subscribe(device => {

            console.log('found device!');

            this.frametype = "";
            this.rangingData = "";
            this.nid = "";
            this.bid = "";
            this.rfu = "";
            this.name = device.name;
            this.rssi = device.rssi;
            this.id = device.id;

            if (this.rssi > 0) {
                return;
            }

            if (this.platform.is('ios')) {

                console.log('Platform is iOS');

                var rawData = new Uint8Array(device.advertising.kCBAdvDataServiceData['FEAA'])

                for (var _i = 0; _i < rawData.length; _i++) {
                    if (_i == 0) {
                        if (rawData[_i].toString(16).length == 1) {
                            this.frametype = '0' + rawData[_i].toString(16);
                        } else {
                            this.frametype = rawData[_i].toString(16);
                        }
                    }

                    if (_i == 1) {
                        this.rangingData = (parseInt(rawData[_i].toString()) - 256).toString();
                    }

                    if (_i >= 2 && _i <= 11) {
                        if (rawData[_i].toString(16).length == 1) {
                            this.nid += '0' + rawData[_i].toString(16);
                        } else {
                            this.nid += rawData[_i].toString(16);
                        }
                    }

                    if (_i >= 12 && _i <= 17) {
                        if (rawData[_i].toString(16).length == 1) {
                            this.bid += '0' + rawData[_i].toString(16);
                        } else {
                            this.bid += rawData[_i].toString(16);
                        }
                    }

                    if (_i >= 18 && _i <= 19) {
                        if (rawData[_i].toString(16).length == 1) {
                            this.rfu += '0' + rawData[_i].toString(16);
                        } else {
                            this.rfu += rawData[_i].toString(16);
                        }
                    }

                }

            }

            else if (this.platform.is('android')) {

                console.log('Platform is android');

                var rawData = new Uint8Array(device.advertising)

                for (var _i = 11; _i < rawData.length; _i++) {
                    if (_i == 11) {
                        if (rawData[_i].toString(16).length == 1) {
                            this.frametype = '0' + rawData[_i].toString(16);
                        } else {
                            this.frametype = rawData[_i].toString(16);
                        }
                    }

                    if (_i == 12) {
                        this.rangingData = (parseInt(rawData[_i].toString()) - 256).toString();
                    }

                    if (_i >= 13 && _i <= 22) {
                        if (rawData[_i].toString(16).length == 1) {
                            this.nid += '0' + rawData[_i].toString(16);
                        } else {
                            this.nid += rawData[_i].toString(16);
                        }
                    }

                    if (_i >= 23 && _i <= 28) {
                        if (rawData[_i].toString(16).length == 1) {
                            this.bid += '0' + rawData[_i].toString(16);
                        } else {
                            this.bid += rawData[_i].toString(16);
                        }
                    }

                    if (_i >= 29 && _i <= 30) {
                        if (rawData[_i].toString(16).length == 1) {
                            this.rfu += '0' + rawData[_i].toString(16);
                        } else {
                            this.rfu += rawData[_i].toString(16);
                        }
                    }

                }

            }
            this.updateBeaconsArray();
        });



        console.log('return this.beacons from service');

        // Sorting of the beacons by rssi value.
        this.beacons.sort((a, b) => {

            if (a.rssi > b.rssi) {
                return -1;
            }

            if (a.rssi < b.rssi) {
                return 1;
            }

            return 0;
        });

        return this.beacons;
    }

    updateBeaconsArray() {

        if (this.beacons.length == 0) {
            let beacon = new Beacon(this.id, this.name, this.rssi, this.frametype, this.rangingData, this.nid, this.bid, this.rfu);
            this.beacons.push(beacon);
        }

        var beaconIsAvailable = false;

        for (let beacon of this.beacons) {

            if (beacon.id == this.id) {
                beacon.nid = this.nid;
                beacon.bid = this.bid;
                beacon.frameType = this.frametype;
                beacon.rssi = this.rssi;
                beacon.rfu = this.rfu;
                beacon.rangingData = this.rangingData;
                beacon.lastUpdated = new Date();
                beacon.isReachable = true;

                beaconIsAvailable = true;
            }
        }

        if (!beaconIsAvailable) {
            let beacon = new Beacon(this.id, this.name, this.rssi, this.frametype, this.rangingData, this.nid, this.bid, this.rfu);
            this.beacons.push(beacon);
        }
    }
}