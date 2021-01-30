import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';

@Component({
    selector: 'app-check-code',
    templateUrl: './check-code.page.html',
    styleUrls: ['./check-code.page.scss'],
})
export class CheckCodePage implements OnInit {
    code: number;

    constructor(private codeService: CodeService) {
    }

    ngOnInit() {
    }

    checkCode() {
    }
}
