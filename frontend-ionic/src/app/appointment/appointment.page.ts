import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.page.html',
    styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {
    appointmentDate: string;

    constructor(public appointmentService: AppointmentService) {
    }

    ngOnInit() {
    }

    saveDate() {
        console.log(this.appointmentDate);
    }
}
