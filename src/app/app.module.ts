import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { HttpErrorInterceptor } from './http.interceptor';
import { LoginService } from './login.service';
import { LoginRequestService } from './loginRequest.service';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';

@NgModule({
    imports: [
        NgbModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: 'impressum',    loadChildren: () => import('./impressum/impressum.module')      .then(m => m.ImpressumModule) },
            { path: 'privacy',      loadChildren: () => import('./privacy/privacy.module')          .then(m => m.PrivacyModule) },
            { path: 'import',       loadChildren: () => import('./import-json/import-json.module')  .then(m => m.ImportJSONModule) },
            { path: 'me',           loadChildren: () => import('./me/me.module')                    .then(m => m.MeModule)},
            { path: 'list',         loadChildren: () => import('./home/home.module')                .then(m => m.HomeModule) },
            // { path: 'item',         loadChildren: () => import('./item/')}
            {
                path: '**',
                redirectTo: 'list',
                pathMatch: 'full'
            }
        ], { useHash: false, scrollPositionRestoration: 'enabled' })
    ],
    declarations: [
        LoginComponent,
        AppComponent,
        TopBarComponent,
        BottomBarComponent
    ],
    exports: [RouterModule],
    providers: [
        LoginService, {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
        LoginRequestService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }