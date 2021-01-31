import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';
import { Appointment } from '../appointment/appointment.model';
import { AppointmentService } from '../appointment/appointment.service';

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
                private alertService: AlertService) {
    }

    ngOnInit() {
    }

    checkCode() {
        const code = this.code;
        const phoneNumber = this.appointmentService.phoneNumber;

        if (!code || !phoneNumber) {
            this.alertService.showAlert('Either phone number or code is missing (or both)', 'Missing parameters');
            return;
        }

        const url = `http://localhost:8080/api/appointment?code=${code}&phone_number=${phoneNumber}`;
        this.http.get<string>(url).toPromise()
            .then(appointmentDate => {
                this.appointmentService.appointmentDate = appointmentDate;
                this.router.navigate(['appointment']);
            })
            .catch(error => {
                this.alertService.showAlert(error.message);
            });
    }
}
