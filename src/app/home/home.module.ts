import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TitleService } from '../title.service';
import { CollectionModule } from './collection/collection.module';



@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        SharedModule,
        CollectionModule,
        CommonModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: 'item', outlet: 'itemModal', loadChildren: () => import('./item/item.module').then(m => m.ItemModule) },
            { path: 'edit', outlet: 'itemModal', loadChildren: () => import('../item-edit/item-edit.module').then(m => m.ItemEditModule) },
            {
                path: '', component: HomeComponent, children: [
                    { path: 'feedback', loadChildren: () => import('./feedback-list/feedback-list.module').then(m => m.FeedbackListModule) },
                    { path: 'liked', loadChildren: () => import('./liked/liked.module').then(m => m.LikedModule) },
                    { path: 'created', loadChildren: () => import('./created/created.module').then(m => m.CreatedModule) },
                    { path: 'all', loadChildren: () => import('./feed/feed.module').then(m => m.FeedModule) },
                    { path: 'watchlist', loadChildren: () => import('./watchlist/watchlist.module').then(m => m.WatchlistModule) },
                    { path: 'history', loadChildren: () => import('./watched/watched.module').then(m => m.WatchedModule) },
                    { path: 'review', loadChildren: () => import('./review/review.module').then(m => m.ReviewModule) },
                    { path: 'reviewed', loadChildren: () => import('./reviewed/reviewed.module').then(m => m.ReviewedModule) },
                    {
                        path: '**', redirectTo: 'all', pathMatch: 'full'
                    }
                ]
            },
            {
                path: '**',
                redirectTo: '',
                pathMatch: 'full'
            }
        ])
    ],
    bootstrap: [],
    providers: [TitleService],
    exports: []
})
export class HomeModule { }
