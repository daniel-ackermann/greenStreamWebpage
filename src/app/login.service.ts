import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Language, User } from 'src/typings';

@Injectable()
export class LoginService {
    isLoggedIn: boolean = false;
    onStatusChange: Subject<boolean> = new Subject<boolean>();
    onLanguageChange: Subject<Language[]> = new Subject<Language[]>();
    onNameChange: Subject<string> = new Subject<string>();

    user: User = {
        id: -1,
        email: "",
        role: "visitor",
        languages: [],
        topics: [],
        username: ""
    };
    constructor(private http: HttpClient) { }

    async isSignedIn(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(`${environment.apiMainUrl}/${environment.loginPath}`).subscribe({
                error: (err) => {
                    reject();
                },
                next: (result: boolean | User) => {
                    console.log("isSignedIn", result);
                    if (result === false || result === null) {
                        this.isLoggedIn = false;
                        this.onStatusChange.next(false);
                        this.setUserLanguage([]);
                        reject();
                    } else {
                        this.user = result as User;
                        this.setUserLanguage(this.user.languages);
                        this.isLoggedIn = true;
                        this.onStatusChange.next(true);
                        resolve(this.user);
                    }
                }
            })
        });
    }
    doLogin(options: any) {
        return new Promise((resolve, reject) => {
            const url = `${environment.apiMainUrl}/${environment.loginPath}`;
            this.http.post(url, options).subscribe({
                error: (err) => {
                    reject(err);
                },
                next: (user: User) => {
                    console.log("Erfolgreich eingeloggt!");
                    this.onStatusChange.next(true);
                    this.isLoggedIn = true;
                    if (this.user.languages != user.languages) {
                        this.setUserLanguage(user.languages);
                    }
                    this.user = user;
                    console.log(user.languages);
                    resolve(user);
                }
            });
        });
    }

    async createAccount(options: any) {
        return new Promise<void>((resolve, reject) => {
            const url = `${environment.apiMainUrl}/${environment.registerPath}`;
            this.http.post(url, options).subscribe({
                error: (err) => {
                    if (err.status === 200) {
                        console.log("Erfolgreich registriert!");
                        this.isLoggedIn = true;
                        resolve();
                    } else {
                        reject(err);
                    }
                }
            });
        });
    }

    doLogout() {
        return new Promise<void>((resolve, reject) => {
            this.http.delete(`${environment.apiMainUrl}/${environment.logoutPath}`).subscribe(() => {
                console.log("Abgemeldet");
                this.onStatusChange.next(false);
                this.isLoggedIn = false;
                resolve()
            });
        });
    }
    
    deleteAccount() {
        return new Promise((resolve) => {
            this.http.delete(`${environment.apiMainUrl}/${environment.deregisterPath}/${this.user.email}`).subscribe((data) => {
                console.log(data);
                this.onStatusChange.next(false);
                this.isLoggedIn = false;
                resolve(data);
            });
        });
    }

    setUserLanguage(languages: Language[]) {
        console.log("set language to ", languages);
        this.user.languages = languages;
        this.onLanguageChange.next(languages);
    }

    setUserName(username: string) {
        this.user.username = username;
        this.onNameChange.next(username);
    }
}