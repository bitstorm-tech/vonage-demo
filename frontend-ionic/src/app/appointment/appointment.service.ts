import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    phoneNumber: number;
    appointmentDate: string;

    constructor() {
    }
}
