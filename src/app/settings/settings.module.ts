import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
    imports: [
        NgbModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', component: SettingsComponent }
        ])
    ],
    declarations: [SettingsComponent],
    exports: [SettingsComponent],
    bootstrap: [SettingsComponent]
})
export class SettingsModule { }
