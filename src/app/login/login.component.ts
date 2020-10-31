import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { InputError, User } from 'src/typings';
import { LoginService } from '../login.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    title = "Login";
    registerError = "";
    loginError = "";
    requested = false;
    email = new FormControl('');
    username = new FormControl('');
    password = new FormControl('');
    closeResult: string = '';
    
    @Input() register: number;

    constructor(
        private http: HttpClient,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        public loginService: LoginService
    ) { }

    doLogin() {
        const { valid, message } = this.validateInput();
        this.loginError = message;
        if (!valid) {
            return;
        }
        const options = {
            username: this.username.value,
            password: this.password.value,
            email: this.email.value,
            role: 'member'
        }
        this.loginService.doLogin(options).then((data:User) => {
            // this.modalService.dismissAll();
            this.activeModal.close();
            console.log(data);
        }).catch((err) => {
            this.loginError = err.error;
        });
    }
    createAccount() {
        const { valid, message } = this.validateInput();
        this.registerError = message;
        if (!valid) {
            return;
        }
        const options = {
            username: this.username.value,
            password: this.password.value,
            email: this.email.value,
            role: 'member'
        }
        this.loginService.createAccount(options).then(() => {
            this.modalService.dismissAll();
        }).catch((err) => {
            this.registerError = err.error;
        });
    }

    doLogout() {
        this.loginService.doLogout().then(() => {
            this.email.setValue('');
            this.username.setValue('');
            this.password.setValue('');
            this.modalService.dismissAll();
        }).catch((err) => {
            console.log(err);
        });
    }
    requestPassword() {
        this.requested = true;
        this.http.get<string>(`${environment.apiMainUrl}/${environment.requestPasswordPath}`, { params: { user: this.email.value } }).subscribe({
            error: err => {
                console.error(err);
            },
            next: (data: string) => {
                setTimeout(() => {
                    this.modalService.dismissAll();
                }, 5 * 1000);
            }
        })
    }

    validateInput(): InputError {
        if (this.password.valid === false) {
            return {
                valid: false,
                message: "Geben Sie ein Passwort an."
            };
        }
        if (this.email.valid === false) {
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


