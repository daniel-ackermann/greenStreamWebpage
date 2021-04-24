import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistComponent } from './watchlist.component';
import { RouterModule } from '@angular/router';
import { ListItemModule } from '../list-item/list-item.module';



@NgModule({
  declarations: [WatchlistComponent],
  imports: [
    CommonModule,
    ListItemModule,
    RouterModule.forChild([
        {
            path:'**', component: WatchlistComponent
        }
    ])
  ]
})
export class WatchlistModule { }
