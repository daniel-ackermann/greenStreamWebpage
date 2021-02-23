import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { LoginService } from '../login.service';

@Component({
    templateUrl: './cookie-footer.component.html',
    styleUrls: ['./cookie-footer.component.css']
})
export class CookieFooterComponent {
    requestCookies: boolean = true;


    constructor(public loginService: LoginService) {
        this.loginService.onStatusChange.subscribe(status => {
            if (status === true) {
                this.acceptCookies();
            }
        })
    }


    acceptCookies() {
        document.cookie = "acceptCookies=true;same-site=lax";
        console.log("acceptCookies");
        this.requestCookies = false;
    }

    rejectCookies() {
        document.cookie = "acceptCookies=false;same-site=lax";
        console.log("rejectCookies");
        this.requestCookies = false;
    }
}

@NgModule({
    declarations: [CookieFooterComponent],
    imports: [CommonModule]
})
class CookieFooterModule { }