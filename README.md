# SpeckApp
Implementation of a platform-independent mobile app for the localization of Bluetooth Low Energy (BLE) Beacons, in terms of the Agile Process Models lecture at DHBW CAS Heilbronn.

## Technologies
The app is based on the Ionic Framework combined with Angular 2 and TypeScript.
This project exclusively involves the usage of BLE-beacons that come with the Eddystone-standard.

## Usage
Follow the steps described at https://ionicframework.com/docs/v2/getting-started/installation/.
Inside of the Project folder you have to install the dependencies with `npm install`.

## Required Cordova plugins
- cordova-plugin-ble-central 1.1.3 "BLE"
- cordova-plugin-compat 1.1.0 "Compat"
- cordova-plugin-console 1.0.4 "Console"
- cordova-plugin-device 1.1.3 "Device"
- cordova-plugin-nativestorage 2.0.2 "NativeStorage"
- cordova-plugin-splashscreen 4.0.0 "Splashscreen"
- cordova-plugin-statusbar 2.2.0 "StatusBar"
- cordova-plugin-whitelist 1.3.0 "Whitelist"
- ionic-plugin-keyboard 2.2.1 "Keyboard"

### iOS
**ONLY** on OS X. Xcode is required.
`ionic build ios` creates a Xcode project inside the platforms folder.
Open the Xcode project and deploy like a native Xcode project.

### Android
`ionic build android` creates a android project inside the platforms folder.

