import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImportJSONComponent } from './import-json.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        ImportJSONComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild([
            { path: '', component: ImportJSONComponent }
        ])
    ],
    exports: [ImportJSONComponent],
    bootstrap: [ImportJSONComponent]
})
export class ImportJSONModule { }
