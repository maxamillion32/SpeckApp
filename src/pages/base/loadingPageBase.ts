import { LoadingController } from 'ionic-angular';

export abstract class LoadingPageBase {

    constructor(private loadingCtrl: LoadingController) {}

    showLoadingCtrl(message: string, duration: number) {

        let loader = this.loadingCtrl.create({
            content: message,
            duration: duration
        });

        loader.present();
    }
}