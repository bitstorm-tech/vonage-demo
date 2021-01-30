import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CodeService } from '../code.service';

@Component({
    selector: 'app-get-code',
    templateUrl: './get-code.page.html',
    styleUrls: ['./get-code.page.scss'],
})
export class GetCodePage implements OnInit {
    phoneNumber: number;

    constructor(
        private alertController: AlertController,
        private http: HttpClient,
        private codeService: CodeService,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    getCode() {
        this.http.get<{ status }>('http://localhost:8080/api/insights?phone_number=' + this.phoneNumber)
            .toPromise()
            .then(result => {
                if (result.status === 3) {
                    this.showAlert('The phone number you have entered is not valid.', 'Invalid');
                } else {
                    this.codeService.phoneNumber = this.phoneNumber;
                    this.router.navigate(['check-code']);
                }
            })
            .catch(error => {
                this.showAlert(error.message);
            });
    }

    showAlert(message: string, header = 'Oops, something went wrong :(') {
        this.alertController.create({
            header,
            message,
            buttons: ['OK']
        }).then(alert => alert.present());
    }
}
