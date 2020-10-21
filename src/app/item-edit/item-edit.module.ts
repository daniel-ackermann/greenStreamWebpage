import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemEditComponent } from './item-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        ItemEditComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: ':id',
                component: ItemEditComponent
            }, {
                path: '',
                component: ItemEditComponent
            }
        ])
    ],
    exports: [ItemEditComponent],
    bootstrap: [ItemEditComponent]
})
export class ItemEditModule { }