import { Location } from '@angular/common';
import { Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
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
        private injector: Injector,
        private swUpdate: SwUpdate,
        private location: Location
    ) {
        // get signedIn status from server
        this.loginService.isSignedIn().catch(() => { });
    }
    async ngOnInit() {
        if (document.cookie == "") {
            this.viewContainerRef.clear();
            const { CookieFooterComponent } = await import('./cookie-footer/cookie-footer.component');
            const factory = this.cfr.resolveComponentFactory(CookieFooterComponent)
            const { instance } = this.viewContainerRef.createComponent(factory, null, this.injector);
        }

        if (this.swUpdate.isEnabled) {
            this.swUpdate.available.subscribe(() => {
                window.location.reload();
            });
        }
    }

    closeModal(){
        // this.location.back();
    }
}