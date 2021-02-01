import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as OT from '@opentok/client';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    phoneNumber: number;
    appointmentDate: string;
    private backendHost = environment.backendHost;

    constructor(private http: HttpClient) {
    }

    getPhoneNumberStatus(phoneNumber: number) {
        return this.http.get<{ status }>(`${this.backendHost}/api/insight?phone_number=${phoneNumber}`)
            .toPromise();
    }

    sendCodeToPhone(phoneNumber: number) {
        return this.http.get(`${this.backendHost}/api/2fa/code?phone_number=${phoneNumber}`)
            .toPromise();
    }

    updateAppointmentDate(appointmentDate: string) {
        return this.http.put(`${this.backendHost}/api/appointment/${this.phoneNumber}`, {appointmentDate})
            .toPromise();
    }

    getAppointmentDate(code: number) {
        const url = `${this.backendHost}/api/appointment?code=${code}&phone_number=${this.phoneNumber}`;
        return this.http.get<string>(url).toPromise();
    }

    makeAppointmentCall() {
        this.http.get(`${this.backendHost}/api/voice/${this.phoneNumber}`)
            .toPromise();
    }

    openVideoSession() {
        this.http.get(`${this.backendHost}/api/video/session`)
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
