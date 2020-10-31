import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeIconPipe } from './like-icon.pipe';



@NgModule({
  declarations: [LikeIconPipe],
  imports: [
    CommonModule
  ],
  exports: [
      LikeIconPipe
  ]
})
export class SharedModule { }
