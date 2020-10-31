import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemComponent } from './item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        ItemComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
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
