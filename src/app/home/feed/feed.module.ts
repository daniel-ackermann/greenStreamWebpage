import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed.component';
import { RouterModule } from '@angular/router';
import { ListItemModule } from '../list-item/list-item.module';



@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    ListItemModule,
    RouterModule.forChild([
        {
            path:'**', component: FeedComponent
        }
    ])
  ]
})
export class FeedModule { }
