import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/typings';
import { LoginComponent } from './login/login.component';

@Injectable()
export class LoginRequestService {
    isLoggedIn: boolean = false;
    private requestActive: boolean = false;
    pendingRequest: Promise<void>;
    userMessage: string = "";
    user: User = {
        id: -1,
        email: "",
        role: "visitor",
        languages: [],
        topics: []
    };
    constructor(private modalService: NgbModal) {}

    requestLogin(mode: number = 0) {
        if(!this.requestActive){
            this.requestActive = true;
            return this.pendingRequest = new Promise<void>((resolve, reject) => {
                let modalRef = this.modalService.open(LoginComponent, { ariaLabelledBy: 'modal-basic-title' });
                modalRef.result.then((result) => {
                    console.log(result);
                    this.requestActive = false;
                    resolve();
                }, (reason) => {
                    this.requestActive = false;
                    reject();
                });
                modalRef.componentInstance.register = mode;
                modalRef.componentInstance.userMessage = this.userMessage;
            })
        }else{
            return this.pendingRequest;
        }
    }
    setUserMessage(message: string){
        this.userMessage = message;
    }
}