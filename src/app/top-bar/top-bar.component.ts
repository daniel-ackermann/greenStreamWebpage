import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../login.service';
import { LoginRequestService } from '../loginRequest.service';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
    constructor(private loginRequestService: LoginRequestService, public loginService: LoginService, private modalService: NgbModal) { }
    requestLogin(mode?: number) {
        this.loginRequestService.requestLogin(mode).catch((err) => {
            console.error(err);
        });
    }

    doLogout() {
        this.loginService.doLogout().then(() => {
            this.modalService.dismissAll();
        }).catch((err) => {
            console.log(err);
        });
    }
}