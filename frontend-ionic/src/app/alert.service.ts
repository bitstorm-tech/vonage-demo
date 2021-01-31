import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(private alertController: AlertController) {
    }

    showAlert(message: string, header = 'Oops, something went wrong') {
        this.alertController.create({
            header,
            message,
            buttons: ['OK']
        }).then(alert => alert.present());
    }
}
