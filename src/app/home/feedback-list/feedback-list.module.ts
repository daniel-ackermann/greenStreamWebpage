import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeedbackListComponent } from './feedback-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
      FeedbackListComponent
  ],
  imports: [
    CommonModule,
    // ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
        {
            path: '**',
            component: FeedbackListComponent
        }
    ])
  ]
})
export class FeedbackListModule { }
