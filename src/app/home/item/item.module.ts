import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemComponent } from './item.component';


@NgModule({
    declarations: [
        ItemComponent
    ],
    imports: [
        CommonModule,
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
