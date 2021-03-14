import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordRestoreComponent } from './password-restore.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [PasswordRestoreComponent],
    imports: [
        NgbModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: ":token",
                component: PasswordRestoreComponent
            },
            {
                path: "",
                component: PasswordRestoreComponent
            }
        ])
    ],
    exports: [PasswordRestoreComponent],
    bootstrap: [PasswordRestoreComponent]
})
export class PasswordRestoreModule { }
