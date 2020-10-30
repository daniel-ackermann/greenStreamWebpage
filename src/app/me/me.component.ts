import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';


@Component({
    selector: 'app-me',
    templateUrl: './me.component.html',
    styleUrls: ['./me.component.css']
})
export class MeComponent {
    selectedLanguage = new FormControl(this.loginService.user.language);
    languages = [{
        name: "Deutsch",
        value: "de"
    },
    {
        name: "English",
        value: "en"
    }]
    form: FormGroup;


    get ordersFormArray() {
        return this.form.controls.orders as FormArray;
    }

    constructor(private formBuilder: FormBuilder, public loginService: LoginService, private location: Location, public router: Router) {
        this.form = this.formBuilder.group({
            orders: new FormArray([])
        });
        this.addCheckboxes();
    }

    private addCheckboxes() {
        this.languages.forEach((lang) => {
            if (this.loginService.user.language.split(',').includes(lang.value)) {
                this.ordersFormArray.push(new FormControl(true))
            } else {
                this.ordersFormArray.push(new FormControl(false))
            }
        });
    }

    submit() {
        const selectedOrderIds = this.form.value.orders
            .map((checked, i) => checked ? this.languages[i].value : null)
            .filter(v => v !== null);

        this.loginService.setUserLanguage(selectedOrderIds.toString() || "en");
        this.location.back();
    }

    deleteAccount() {
        this.loginService.deleteAccount().then(() => {
            this.location.back();
        })
    }
    close() {
        this.location.back();
    }
}
