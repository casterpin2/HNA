import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class HeaderService{
    public header = new BehaviorSubject(false);
    public getHeader = this.header.asObservable();
    public setHeader(headerChange: boolean) {
        this.header.next(headerChange);
    }
}