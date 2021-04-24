import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListItemModule } from '../list-item/list-item.module';
import { WatchedComponent } from './watched.component';



@NgModule({
  declarations: [WatchedComponent],
  imports: [
    CommonModule,
    ListItemModule,
    RouterModule.forChild([
        {
            path:'**', component: WatchedComponent
        }
    ])
  ]
})
export class WatchedModule { }
