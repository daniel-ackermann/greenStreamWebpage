import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeIconPipe } from './like-icon.pipe';
import { WatchListPipe } from './watch-list.pipe';



@NgModule({
    declarations: [LikeIconPipe, WatchListPipe],
    imports: [
        CommonModule
    ],
    exports: [
        LikeIconPipe,
        WatchListPipe
    ]
})
export class SharedModule { }
