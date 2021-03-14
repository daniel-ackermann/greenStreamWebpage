import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login.service';

@Component({
    selector: 'app-password-restore',
    templateUrl: './password-restore.component.html',
    styleUrls: ['./password-restore.component.css']
})
export class PasswordRestoreComponent {
    token: boolean = false;
    displayResponse: boolean = false;
    isCollapsed: boolean = true;
    showInput: boolean = true;
    message: string = "";
    error: string = "";
    body: string = "";
    type: string = "";
    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private loginService: LoginService,
        private router: Router
    ) {
        this.showInput = this.token = this.route.snapshot.paramMap.has('token');
        this.loginService.onStatusChange.subscribe(status => {
            if (status) {
                this.router.navigate(['']);
            }
        })
    }

    password = new FormControl('', [
        Validators.required,
        Validators.minLength(4)
    ]);

    save() {
        this.showInput = false;
        this.http.post(`${environment.apiMainUrl}/${environment.setPassword}`, {
            token: this.route.snapshot.paramMap.get('token'),
            password: this.password.value
        }).subscribe({
            error: (err: any) => {
                this.displayResponse = true;
                if (err.status == 200) {
                    console.log("Erfolgreich gespeichert!");
                    this.type = "alert-success";
                    this.message = "Sie können sich jetzt mit dem neuen Passwort einloggen. Sie werden in 5 Sekunden weitergeleitet...";
                    setTimeout(() => {
                        this.router.navigate(['']);
                    }, 5 * 1000);
                } else {
                    this.type = "alert-danger";
                    this.message = err.error.text;
                    this.error = JSON.stringify(err);
                }
            }
        });
    }
}
