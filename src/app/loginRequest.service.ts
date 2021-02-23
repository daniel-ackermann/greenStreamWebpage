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
        language: []
    };
    constructor(private modalService: NgbModal) {
    }
    requestLogin(mode: number = 0) {
        return new Promise<void>((resolve, reject) => {
            let modalRef = this.modalService.open(LoginComponent, { ariaLabelledBy: 'modal-basic-title' });
            modalRef.result.then((result) => {
                console.log(result);
                resolve();
            }, (reason) => {
                reject();
            });
            modalRef.componentInstance.register = mode;
        })
    }
}