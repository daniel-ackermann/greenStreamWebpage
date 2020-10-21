import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/typings';
import { LoginComponent } from './login/login.component';

@Injectable()
export class LoginRequestService {
    isLoggedIn: boolean = false;
    user: User = {
        id: -1,
        email: "",
        role: "visitor",
        language: "en"
    };
    constructor(private modalService: NgbModal) {
    }
    requestLogin() {
        return new Promise((resolve, reject) => {
            this.modalService.open(LoginComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
                console.log(result);
                resolve();
            }, (reason) => {
                reject();
            });
        })
    }
}