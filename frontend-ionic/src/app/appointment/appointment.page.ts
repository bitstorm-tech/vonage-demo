import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';
import { AppointmentService } from './appointment.service';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.page.html',
    styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {
    appointmentDate: string;

    constructor(public appointmentService: AppointmentService, private alertService: AlertService) {
    }

    ngOnInit() {
        if (this.appointmentService.appointmentDate) {
            this.appointmentDate = this.appointmentService.appointmentDate;
        }
    }

    saveDate() {
        this.appointmentService.updateAppointmentDate(this.appointmentDate)
            .catch(error => this.alertService.showAlert(error.message));
    }

    openVideo() {
        this.appointmentService.openVideoSession();
    }

    makeCall() {
        this.appointmentService.makeAppointmentCall();
    }
}
