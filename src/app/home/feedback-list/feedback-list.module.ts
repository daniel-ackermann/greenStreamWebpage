import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeedbackListComponent } from './feedback-list.component';
import { FormsModule } from '@angular/forms';
import { FeedbackListItemComponent } from './feedback-list-item/feedback-list-item.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
      FeedbackListComponent,
      FeedbackListItemComponent
  ],
  imports: [
    CommonModule,
    NgbCollapseModule,
    FormsModule,
    RouterModule.forChild([
        {
            path: '**',
            component: FeedbackListComponent
        }
    ])
  ],
  bootstrap: [FeedbackListItemComponent]
})
export class FeedbackListModule { }
