import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';
import { AppointmentService } from '../appointment/appointment.service';

@Component({
    selector: 'app-check-code',
    templateUrl: './check-code.page.html',
    styleUrls: ['./check-code.page.scss'],
})
export class CheckCodePage implements OnInit {
    code: number;

    constructor(private appointmentService: AppointmentService,
                private router: Router,
                private alertService: AlertService) {
    }

    ngOnInit() {
    }

    checkCode() {
        const code = this.code;
        const phoneNumber = this.appointmentService.phoneNumber;

        if (!code || !phoneNumber) {
            this.alertService.showAlert(
                'Either phone number or code is missing (or both). Please start with step 1/3 again.',
                'Missing parameters');
            return;
        }

        this.appointmentService.getAppointmentDate(code)
            .then(appointmentDate => {
                this.appointmentService.appointmentDate = appointmentDate;
                this.router.navigate(['appointment']);
            })
            .catch(error => {
                console.log(error);
                this.alertService.showAlert(error.error);
            });
    }
}
