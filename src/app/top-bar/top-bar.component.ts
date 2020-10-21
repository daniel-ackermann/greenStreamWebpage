import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../login.service';
import { LoginRequestService } from '../loginRequest.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
    constructor(private loginRequestService: LoginRequestService, public loginService: LoginService) {}
    requestLogin(){
        this.loginRequestService.requestLogin().catch((err) => {
            console.error(err);
        });
    }
}