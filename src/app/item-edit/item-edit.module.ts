import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemEditComponent } from './item-edit.component';
import { RouterModule } from '@angular/router';
import { GlobalStatus } from '../globalStatus';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from '../list/list.component';



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
    exports: [
        ItemEditComponent
    ],
    providers: [GlobalStatus],
    bootstrap: [ItemEditComponent]
})
export class ItemEditModule { }