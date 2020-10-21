import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService){
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({ headers: request.headers.set('Accept-Language', this.loginService.user.language || 'en') });
 
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
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