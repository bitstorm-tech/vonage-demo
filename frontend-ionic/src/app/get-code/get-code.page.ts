import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertService } from '../alert.service';
import { AppointmentService } from '../appointment/appointment.service';

@Component({
    selector: 'app-get-code',
    templateUrl: './get-code.page.html',
    styleUrls: ['./get-code.page.scss'],
})
export class GetCodePage implements OnInit {
    phoneNumber: number;

    constructor(
        private alertService: AlertService,
        private http: HttpClient,
        private appointmentService: AppointmentService,
        private router: Router,
        private loadingController: LoadingController
    ) {
    }

    ngOnInit() {
    }

    sendCode() {
        let loading;
        this.loadingController.create({message: 'Sending code ...'}).then(l => {
            loading = l;
            loading.present();
        });

        this.appointmentService.getPhoneNumberStatus(this.phoneNumber)
            .then(result => {
                if (result.status === 3) {
                    this.alertService.showAlert('The phone number you have entered is not valid.', 'Invalid');
                    loading.dismiss();
                } else {
                    this.appointmentService.sendCodeToPhone(this.phoneNumber)
                        .then(() => loading.dismiss())
                        .catch(error => {
                            loading.dismiss();
                            this.alertService.showAlert(error.message);
                            return;
                        });
                    this.appointmentService.phoneNumber = this.phoneNumber;
                    this.router.navigate(['check-code']);
                }
            })
            .catch(error => {
                loading.dismiss();
                this.alertService.showAlert(error.message);
            });
    }
}
