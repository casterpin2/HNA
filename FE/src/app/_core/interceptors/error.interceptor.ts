import { NzMessageService } from 'ng-zorro-antd/message';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { SSOService } from '../../_services';
import { Router } from '@angular/router';
import { environment } from "../../../environments/environment";
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router,
        private message: NzMessageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        return next.handle(request).pipe(catchError(err => {            
            if (err.status === 401 || err.status === 403 || err.status === 408) {
                // logout 
                this.router.navigate(['/access-denied']);
            }
            if (err.status === 400) {
                this.message.error(err.error.toString());
            }
            if (err.status === 500) {
                this.message.error(err.error.toString());
            }

            const error = {
                status: err.status,
                statusText: err.statusText,
                errListCode: err.error
            } 
            //err.error.message || err.statusText;
            return throwError(error);
        }))
    }
    
}
