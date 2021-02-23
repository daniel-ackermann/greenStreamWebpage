import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
    declarations: [IndexComponent],
    imports: [
        NgbModule,
        CommonModule,
        RouterModule.forChild([
            {
                path: '**',
                component: IndexComponent
            }
        ])
    ],
})
export class IndexModule { }
