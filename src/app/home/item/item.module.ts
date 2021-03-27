import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemComponent } from './item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations: [
        ItemComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        NgbButtonsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: ':id',
                component: ItemComponent
            }, {
                path: '',
                component: ItemComponent
            }
        ])
    ],
    exports: [ItemComponent],
    bootstrap: [ItemComponent]
})
export class ItemModule { }
