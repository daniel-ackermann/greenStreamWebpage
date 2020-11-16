import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeIconPipe } from './like-icon.pipe';
import { WatchListPipe } from './watch-list.pipe';
import { TypeIconPipe } from './type-icon.pipe';
import { ReviewedPipe } from './reviewed.pipe';



@NgModule({
    declarations: [LikeIconPipe, WatchListPipe, TypeIconPipe, ReviewedPipe],
    imports: [
        CommonModule
    ],
    exports: [
        LikeIconPipe,
        WatchListPipe,
        TypeIconPipe,
        ReviewedPipe
    ]
})
export class SharedModule { }
