import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ListComponent } from './list/list.component';
import { CreatedComponent } from './created/created.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewComponent } from './review/review.component';
import { ReviewedComponent } from './reviewed/reviewed.component';
import { ListItemComponent } from './list-item/list-item.component';
import { FilterPipe } from './list-item/filter.pipe';



@NgModule({
    declarations: [
        HomeComponent,
        ListComponent,
        CreatedComponent,
        ReviewComponent,
        ReviewedComponent,
        ListItemComponent,
        FilterPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: 'item', outlet: 'itemModal', loadChildren: () => import('./item/item.module').then(m => m.ItemModule) },
            { path: 'edit', outlet: 'itemModal', loadChildren: () => import('./item-edit/item-edit.module').then(m => m.ItemEditModule) },
            { path: 'new', outlet: 'itemModal', loadChildren: () => import('./item-edit/item-edit.module').then(m => m.ItemEditModule) },
            {
                path: '',
                component: HomeComponent,
                children: [
                    {
                        path: 'reviewed',
                        component: ReviewedComponent
                    },
                    {
                        path: 'created',
                        component: CreatedComponent
                    },
                    {
                        path: 'review',
                        component: ReviewComponent
                    },
                    {
                        path: 'all',
                        component: ListComponent
                    },
                    {
                        path: '**',
                        redirectTo: 'all',
                        pathMatch: 'full'
                    }
                ],
            }
        ])
    ],
    bootstrap: [HomeComponent],
    exports: [HomeComponent]
})
export class HomeModule { }
