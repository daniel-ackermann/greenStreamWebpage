import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item.component';
import { FilterPipe } from './filter.pipe';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [
        FilterPipe,
        ListItemComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ListItemComponent
            },
            {
                path: '**',
                component: ListItemComponent
            }
        ]),
    ],
    exports: [
        ListItemComponent
    ]
})
export class ListItemModule { }
