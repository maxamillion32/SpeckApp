import { LoadingController, AlertController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';

export abstract class Pagebase {

    constructor(private loadingCtrl: LoadingController,
        private alertCtrl: AlertController) { }

    showLoadingCtrl(message: string, duration: number) {

        let loader = this.loadingCtrl.create({
            content: message,
            duration: duration
        });

        loader.present();
    }

    showAlert(title: string, message: string, buttons: any[]) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: buttons
        });
        alert.present();
    }

    saveItem(key: string, object: any) {
        NativeStorage.setItem(key, object)
            .then(() => {
                console.log('Stored item: ' + key);
                console.log(JSON.stringify(object));
            },
            error => console.error('Error storing item: ', error));
    }

    deleteItem(key: string) {
        NativeStorage.getItem(key)
            .then(data => {
                console.log('Got item: ' + key);
                console.log(JSON.stringify(data));
                return data;
            },
            error => console.log(error));
    }
}