import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as OT from '@opentok/client';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    phoneNumber: number;
    appointmentDate: string;

    constructor(private http: HttpClient) {
    }

    getPhoneNumberStatus(phoneNumber: number) {
        return this.http.get<{ status }>(`http://localhost:8080/api/insight?phone_number=${phoneNumber}`)
            .toPromise();
    }

    sendCodeToPhone(phoneNumber: number) {
        return this.http.get(`http://localhost:8080/api/2fa/code?phone_number=${phoneNumber}`)
            .toPromise();
    }

    updateAppointmentDate(appointmentDate: string) {
        return this.http.put(`http://localhost:8080/api/appointment/${this.phoneNumber}`, {appointmentDate})
            .toPromise();
    }

    makeAppointmentCall() {
        this.http.get(`http://localhost:8080/api/voice/${this.phoneNumber}`)
            .toPromise();
    }

    openVideoSession() {
        this.http.get('http://localhost:8080/api/video/session')
            .toPromise()
            .then((sessionIdAndToken: SessionIdAndToken) => {
                console.log(sessionIdAndToken);
                const sessionId = sessionIdAndToken.sessionId;
                const token = sessionIdAndToken.token;
                const session = OT.initSession('47098784', sessionId);

                const publisher = OT.initPublisher('publisher', {
                    insertMode: 'append',
                    width: '400px',
                    height: '400px'
                }, this.handleError);

                session.connect(token, error => {
                    if (error) {
                        this.handleError(error);
                    } else {
                        session.publish(publisher, this.handleError);
                    }
                });

                session.on('streamCreated', event => {
                    session.subscribe(event.stream, 'subscriber', {
                        insertMode: 'append',
                        width: '300px',
                        height: '300px'
                    }, this.handleError);
                });
            });
    }

    handleError(error) {
        if (error) {
            alert(error);
        }
    }
}

interface SessionIdAndToken {
    sessionId: string;
    token: string;
}
