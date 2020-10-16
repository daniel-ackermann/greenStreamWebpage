import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpressumComponent } from './impressum.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ImpressumComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
            path: '',
            component: ImpressumComponent
        }, {
            path: '**',
            component: ImpressumComponent
        }
    ])
  ],
  exports: [ImpressumComponent],
  bootstrap: [ImpressumComponent]
})
export class ImpressumModule { }
