import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CodeService {
    code: number;
    phoneNumber: number;

    constructor() {
    }
}
