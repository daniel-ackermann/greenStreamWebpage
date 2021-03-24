import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListItemComponent } from './list-item/list-item.component';
import { FilterPipe } from './list-item/filter.pipe';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';



@NgModule({
    declarations: [
        HomeComponent,
        ListItemComponent,
        FilterPipe
    ],
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: 'item', outlet: 'itemModal', loadChildren: () => import('./item/item.module').then(m => m.ItemModule) },
            { path: 'edit', outlet: 'itemModal', loadChildren: () => import('../item-edit/item-edit.module').then(m => m.ItemEditModule) },
            { path: 'feedback', loadChildren: () => import('./feedback-list/feedback-list.module').then(m => m.FeedbackListModule) },
            {
                path: ':topic',
                component: HomeComponent,
            },
            {
                path: '**',
                redirectTo: 'all',
                pathMatch: 'full'
            }
        ])
    ],
    bootstrap: [],
    exports: []
})
export class HomeModule { }
