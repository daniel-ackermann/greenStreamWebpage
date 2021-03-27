import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item.component';
import { FilterPipe } from './filter.pipe';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
    declarations: [
        FilterPipe,
        ListItemComponent
    ],
    imports: [
        SharedModule,
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
