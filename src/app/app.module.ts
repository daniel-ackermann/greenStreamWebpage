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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
    imports: [
        NgbModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
                { path: 'impressum', loadChildren: () => import('./impressum/impressum.module').then(m => m.ImpressumModule) },
                { path: 'privacy', loadChildren: () => import('./privacy/privacy.module').then(m => m.PrivacyModule) },
                { path: 'import', loadChildren: () => import('./import-json/import-json.module').then(m => m.ImportJSONModule) },
                { path: 'me', loadChildren: () => import('./me/me.module').then(m => m.MeModule) },
                { path: 'list', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
                { path: 'index', loadChildren: () => import('./index/index.module').then(m => m.IndexModule) },
                { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
                { path: 'passwordRestore', loadChildren: () => import('./password-restore/password-restore.module').then(m => m.PasswordRestoreModule) },
                { path: 'new', outlet: 'itemModal', loadChildren: () => import('./item-edit/item-edit.module').then(m => m.ItemEditModule) },
                {
                    path: '**',
                    redirectTo: 'index',
                    pathMatch: 'full'
                }
            ],
            {
                useHash: false,
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                relativeLinkResolution: 'legacy'
            }
        ),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
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