import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemModule } from '../list-item/list-item.module';
import { LikedComponent } from './liked.component';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [LikedComponent],
    imports: [
        CommonModule,
        ListItemModule,
        RouterModule.forChild([{path:'', component: LikedComponent}])
    ]
})
export class LikedModule { }
