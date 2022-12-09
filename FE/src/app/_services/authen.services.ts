import { EventEmitter, Injectable } from "@angular/core";
@Injectable()
export class AuthenticationService {

    public currentUserValue: string;



    constructor() {
        this.currentUserValue = localStorage.getItem('current_user') || '';
    }

    public setToken(token: string, account: string,role:string,userId:string) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('current_user', account);
        localStorage.setItem('role', role);
        localStorage.setItem('userId',userId)
        this.currentUserValue = account;
    }
   

    public logout() {
        localStorage.clear();
    }
}
