import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Appointment } from './appointment.model';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    phoneNumber: number;
    appointmentDate: string;

    constructor(private http: HttpClient) {
    }

    getPhoneNumberStatus(phoneNumber: number) {
        return this.http.get<{ status }>('http://localhost:8080/api/insight?phone_number=' + phoneNumber)
            .toPromise();
    }

    sendCodeToPhone(phoneNumber: number) {
        return this.http.get('http://localhost:8080/api/2fa/code?phone_number=' + phoneNumber)
            .toPromise();
    }

    updateAppointmentDate(appointmentDate: string) {
        return this.http.put('http://localhost:8080/api/appointment/' + this.phoneNumber, {appointmentDate})
            .toPromise();
    }
}
