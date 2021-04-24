import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review.component';
import { ListItemModule } from '../list-item/list-item.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ReviewComponent],
  imports: [
    CommonModule,
    ListItemModule,
    RouterModule.forChild([
        { path: '**', component: ReviewComponent}
    ])
  ]
})
export class ReviewModule { }
