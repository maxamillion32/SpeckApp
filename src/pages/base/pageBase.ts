import { LoadingController, AlertController } from 'ionic-angular';

export abstract class Pagebase {

    constructor(private loadingCtrl: LoadingController, private alertCtrl: AlertController) { }

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
}