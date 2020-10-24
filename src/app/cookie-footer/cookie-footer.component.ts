import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

@Component({
    templateUrl: './cookie-footer.component.html',
    styleUrls: ['./cookie-footer.component.css']
})
export class CookieFooterComponent {
    cookiesApproved: boolean = false;

    acceptCookies() {
        document.cookie = "acceptCookies=true";
        console.log("acceptCookies");
        this.cookiesApproved = true;
    }
}

@NgModule({
    declarations: [CookieFooterComponent],
    imports: [CommonModule]
})
class CookieFooterModule {}