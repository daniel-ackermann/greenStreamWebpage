import { Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { LoginService } from './login.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    @ViewChild('cookieFooter', { read: ViewContainerRef }) footerContainer: ViewContainerRef;


    constructor(private loginService: LoginService,
        private viewContainerRef: ViewContainerRef,
        private cfr: ComponentFactoryResolver,
        private injector: Injector
    ) {
        // get signedIn status from server
        this.loginService.isSignedIn();
    }
    async ngOnInit() {
        if (document.cookie == "") {
            this.viewContainerRef.clear();
            const { CookieFooterComponent } = await import('./cookie-footer/cookie-footer.component');
            const factory = this.cfr.resolveComponentFactory(CookieFooterComponent)
            const { instance } = this.viewContainerRef.createComponent(factory, null, this.injector);
        }
    }
}