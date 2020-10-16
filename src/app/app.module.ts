import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ListComponent } from './list/list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent, LoginModal } from './login/login.component';
import { GlobalStatus } from './globalStatus';
import { ListItemComponent } from './list-item/list-item.component';
import { ImportJSONComponent } from './import-json/import-json.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
    imports: [
        NgbModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', component: ListComponent },
            { path: 'item', outlet: 'itemModal', loadChildren: () => import('./item/item.module').then(m => m.ItemModule)},
            { path: 'edit', outlet: 'itemModal', loadChildren: () => import('./item-edit/item-edit.module').then(m => m.ItemEditModule)},
            { path: 'new', outlet: 'itemModal', loadChildren: () => import('./item-edit/item-edit.module').then(m => m.ItemEditModule)},
            { path: 'impressum', loadChildren: () => import('./impressum/impressum.module').then(m => m.ImpressumModule)},
            { path: 'import', loadChildren: () => import('./import-json/import-json.module').then(m => m.ImportJSONModule)},
            { path: 'login', outlet: 'modal', component:LoginModal },
            {
              path: '**',
              redirectTo: '',
              pathMatch: 'full'
            }
        ], { useHash: true })
    ],
    declarations: [
        LoginComponent,
        AppComponent,
        TopBarComponent,
        ListComponent,
        ListItemComponent,
        ImportJSONComponent,
        FilterPipe
    ],
    exports: [RouterModule],
    providers: [GlobalStatus],
    bootstrap: [ AppComponent ]
})
export class AppModule { }