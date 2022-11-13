import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        let access_token = localStorage.getItem('auth_token');
        let headerOptions : any = {
            'Access-Control-Allow-Origin': '*',
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            'Authorization':'Bearer '+ `${access_token}`          
        };

        if (request.method === 'GET') {
            headerOptions["Cache-Control"] = 'no-cache';
            headerOptions["Pragma"] = 'no-cache';
        }
        if (access_token) {
            request = request.clone({
                setHeaders: headerOptions
            });
        }

        return next.handle(request);
    }
}
