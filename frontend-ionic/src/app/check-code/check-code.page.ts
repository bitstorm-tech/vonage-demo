import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AppointmentService } from '../appointment.service';

@Component({
    selector: 'app-check-code',
    templateUrl: './check-code.page.html',
    styleUrls: ['./check-code.page.scss'],
})
export class CheckCodePage implements OnInit {
    code: number;

    constructor(private appointmentService: AppointmentService,
                private http: HttpClient,
                private router: Router,
                private alert: AlertController) {
    }

    ngOnInit() {
    }

    checkCode() {
        const code = this.code;
        const phoneNumber = this.appointmentService.phoneNumber;

        if (!code || !phoneNumber) {
            this.alert.create({
                header: 'Missing parameters',
                message: 'Either phone number or code is missing (or both)',
                buttons: ['OK']
            }).then(alert => alert.present);
            return;
        }

        const url = `http://localhost:8080/api/appointment?code=${code}&phone_number=${phoneNumber}`;
        this.http.get<{ appointmentDate }>(url).toPromise()
            .then(appointment => {
                this.appointmentService.appointmentDate = appointment.appointmentDate;
                this.router.navigate(['appointment']);
            })
            .catch(error => {
                this.alert.create({
                    header: 'Oops, something went wrong :(',
                    message: error,
                    buttons: ['OK']
                }).then(alert => alert.present);
            });
    }
}
