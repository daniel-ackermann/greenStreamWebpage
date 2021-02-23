import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [AboutComponent],
  imports: [
    NgbModule,
    CommonModule,
    RouterModule.forChild([
        {
            path: '**',
            component: AboutComponent
        }
    ])
  ]
})
export class AboutModule { }
