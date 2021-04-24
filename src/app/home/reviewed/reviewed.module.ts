import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListItemModule } from '../list-item/list-item.module';
import { ReviewedComponent } from './reviewed.component';



@NgModule({
  declarations: [ReviewedComponent],
  imports: [
    CommonModule,
    ListItemModule,
    RouterModule.forChild([
        { path: '**', component: ReviewedComponent}
    ])
  ]
})
export class ReviewedModule { }
