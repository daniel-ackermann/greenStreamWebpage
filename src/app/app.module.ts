import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ListComponent } from './list/list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { ListItemComponent } from './list-item/list-item.component';
import { FilterPipe } from './filter.pipe';
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
            { path: '', component: ListComponent },
            { path: 'item', outlet: 'itemModal', loadChildren: () => import('./item/item.module').then(m => m.ItemModule) },
            { path: 'edit', outlet: 'itemModal', loadChildren: () => import('./item-edit/item-edit.module').then(m => m.ItemEditModule) },
            { path: 'new', outlet: 'itemModal', loadChildren: () => import('./item-edit/item-edit.module').then(m => m.ItemEditModule) },
            { path: 'settings', outlet: 'itemModal', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
            { path: 'impressum', loadChildren: () => import('./impressum/impressum.module').then(m => m.ImpressumModule) },
            { path: 'privacy', loadChildren: () => import('./privacy/privacy.module').then(m => m.PrivacyModule) },
            { path: 'import', loadChildren: () => import('./import-json/import-json.module').then(m => m.ImportJSONModule) },
            // { path: 'login', outlet: 'modal', component: LoginModal },
            {
                path: '**',
                redirectTo: '',
                pathMatch: 'full'
            }
        ], { useHash: false, scrollPositionRestoration: 'enabled' })
    ],
    declarations: [
        LoginComponent,
        AppComponent,
        TopBarComponent,
        ListComponent,
        ListItemComponent,
        FilterPipe,
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