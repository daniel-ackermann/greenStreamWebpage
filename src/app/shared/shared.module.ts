import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeIconPipe } from './like-icon.pipe';
import { WatchListPipe } from './watch-list.pipe';
import { ReviewedPipe } from './reviewed.pipe';



@NgModule({
    declarations: [LikeIconPipe, WatchListPipe, ReviewedPipe],
    imports: [
        CommonModule
    ],
    exports: [
        LikeIconPipe,
        WatchListPipe,
        ReviewedPipe
    ]
})
export class SharedModule { }
