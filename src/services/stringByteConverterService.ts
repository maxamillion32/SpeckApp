import { Injectable } from '@angular/core';

@Injectable()
export class StringByteConverterService {

    constructor() {
    }

    stringToBytes(string: string) {
        var array = new Uint8Array(string.length);
        for (var i = 0, l = string.length; i < l; i++) {
            array[i] = string.charCodeAt(i);
        }
        return array.buffer;
    }

    bytesToString(buffer: Uint8Array) {
        let returnValue = '';
        for (var i = 0, l = buffer.length; i < l; i++) {
            returnValue += ' ' +  buffer[i].toString(16);
        }
        return returnValue;
    }
}