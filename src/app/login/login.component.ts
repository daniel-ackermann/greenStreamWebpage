import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalStatus } from '../globalStatus';
import { ActivatedRoute, Router } from '@angular/router';
import { createFalse } from 'typescript';
import { InputError } from 'src/typings';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    title = "Einstellungen";
    registerError = "";
    loginError = "";
    register = 0;
    requested = false;
    email = new FormControl('');
    username = new FormControl('');
    password = new FormControl('');
    closeResult: string = '';
    constructor(private http: HttpClient, private modalService: NgbModal, public activeModal: NgbActiveModal, public globalStatus: GlobalStatus, private router: Router) { }

    doLogin() {
        const {valid, message} = this.validateInput();
        this.loginError = message;
        if(!valid){
            return;
        }
        const options = {
            username: this.globalStatus.username = this.username.value,
            password: this.password.value,
            email: this.email.value,
            role: 'admin'
        }
        let url = "http://localhost:4200/login";
        this.http.post(url, options).subscribe({
            error: (err) => {
                if (err.status == 200) {
                    console.log("Erfolgreich eingeloggt!");
                    this.globalStatus.loggedIn = true;
                    this.modalService.dismissAll();
                } else {
                    this.loginError = err.error;
                    console.log(err);
                }
            }
        });
    }
    createAccount(){
        const {valid, message} = this.validateInput();
        this.registerError = message;
        if(!valid){
            return;
        }
        const options = {
            username: this.globalStatus.username = this.username.value,
            password: this.password.value,
            email: this.email.value,
            role: 'admin'
        }
        let url = "http://localhost:4200/account";
        this.http.post(url, options).subscribe({
            error: (err) => {
                if (err.status == 200) {
                    console.log("Erfolgreich registriert!");
                    this.globalStatus.loggedIn = true;
                    this.modalService.dismissAll();
                } else {
                    this.registerError = err.error;
                    console.log(err);
                }
            }
        });

    }

    doLogout() {
        this.http.delete("http://localhost:4200/login").subscribe({
            error: (err: HttpErrorResponse) => {
                if (err.status != 200) {
                    console.log(err);
                }
                console.log("Abgemeldet");
                this.globalStatus.loggedIn = false;
                this.modalService.dismissAll();
                this.email.setValue('');
                this.username.setValue('');
                this.password.setValue('');
            },
            next: (data) => {
            }
        });
    }
    deleteAccount() {
        this.http.delete("http://localhost:4200/account").subscribe({
            error: (err) => {
                console.log(err);
                if (err.status == 200) {
                    console.log("Abgemeldet");
                    this.globalStatus.loggedIn = false;
                    this.modalService.dismissAll();
                }
            },
            next: (data) => {
                
                console.log(data);
            }
        });
    }
    requestPassword(){
        this.requested = true;
        this.http.get<string>("http://localhost:4200/account", {params:{user: this.email.value}}).subscribe({
            error: err => {
                console.error(err);
            },
            next: (data:string) => {
                setTimeout(() => {
                    this.modalService.dismissAll();
                }, 5 * 1000);
            }
        })
    }

    validateInput(): InputError{
        if(this.password.valid == false){
            return {
                valid: false,
                message: "Geben Sie ein Passwort an."
            };
        }
        if(this.email.valid == false){
            return {
                valid: false,
                message: "Geben Sie eine Email-Addresse an."
            }
        }
        return {
            valid: true,
            message: ""
        }
    }
}


@Component({
    template:``
})
export class LoginModal implements OnInit{
    constructor(private modalService: NgbModal, private location: Location){}
    ngOnInit(){
        this.modalService.open(LoginComponent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            
        }, (reason) => {
            this.location.back();
        });
    }
}