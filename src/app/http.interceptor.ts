import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from './login.service';
import { LoginRequestService } from './loginRequest.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService, private loginRequestService: LoginRequestService, private router: Router){
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.loginService.user.languages.length != 0){
            request = request.clone({ headers: request.headers.set('Accept-Language', this.loginService.user.languages.map((lang) => {return lang.code}).toString()) });
        }
 
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if(error.status == 401 && this.loginService.isLoggedIn ){
                        console.log("Sie wurden ausgeloggt!");
                        this.loginRequestService.setUserMessage("Sie wurden ausgeloggt. Bitte melden Sie sich erneut an!");
                        this.loginRequestService.requestLogin().catch(() => {
                            this.loginService.doLogout();
                            this.router.navigate(['/list']);
                        });
                    }
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                    }
                    // window.alert(errorMessage);
                    return throwError(error);
                })
            )
    }
}