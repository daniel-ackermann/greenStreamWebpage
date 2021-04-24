import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [
        ListItemComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        RouterModule
    ],
    exports: [
        ListItemComponent
    ],
    providers: [RouterModule]
})
export class ListItemModule { }
