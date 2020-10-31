import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-me',
    templateUrl: './me.component.html',
    styleUrls: ['./me.component.css']
})
export class MeComponent {
    languages = [{
        name: "Deutsch",
        value: "de"
    },
    {
        name: "English",
        value: "en"
    }]
    settings: FormGroup;


    get ordersFormArray() {
        return this.settings.get('selectedLanguage') as FormArray;
    }

    constructor(private http: HttpClient, public loginService: LoginService, private location: Location, public router: Router) {
        this.settings = new FormGroup({
            username: new FormControl(this.loginService.user.username || ''),
            selectedLanguage: new FormArray([]),
            email: new FormControl(this.loginService.user.email),
            role:  new FormControl(this.loginService.user.role)
        });
        this.addCheckboxes();
    }

    private addCheckboxes() {
        const checkArray: FormArray = this.settings.get('selectedLanguage') as FormArray;
        this.languages.forEach((lang) => {
            if (this.loginService.user.language.split(',').includes(lang.value)) {
                checkArray.push(new FormControl(true))
            } else {
                checkArray.push(new FormControl(false))
            }
        });
    }

    submit() {
        const selectedOrderIds = this.settings.value.selectedLanguage
            .map((checked:boolean, i:number) => checked ? this.languages[i].value : null)
            .filter(v => v !== null);

        this.loginService.setUserLanguage(selectedOrderIds.toString() || "en");
        this.loginService.setUserName(this.settings.value.username);
        let user = {
            username: this.settings.value.username,
            language: selectedOrderIds.toString(),
        }

        this.http.put(`${environment.apiMainUrl}/${environment.userPath}/${this.loginService.user.email}`, user).subscribe((data) => {
            console.log(data);
        });
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