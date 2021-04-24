import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListItemModule } from '../list-item/list-item.module';
import { CreatedComponent } from './created.component';



@NgModule({
  declarations: [CreatedComponent],
  imports: [
    CommonModule,
    ListItemModule,
    RouterModule.forChild([
        {
            path:'', component: CreatedComponent
        }
    ])
  ]
})
export class CreatedModule { }
