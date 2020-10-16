import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImportJSONComponent } from './import-json.component';



@NgModule({
    declarations: [
        // ImportJSONModule
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: ImportJSONComponent }
        ])
    ],
    // exports: [ImportJSONModule],
    //   providers: [GlobalStatus],
    bootstrap: [ImportJSONModule]
})
export class ImportJSONModule { }
