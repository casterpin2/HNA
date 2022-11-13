import { Injectable } from '@angular/core';
import { BaseApiService } from "./base-api.service";

@Injectable({
    providedIn: 'root',
})
export class TestService {
    
    constructor(
        private baseApiService: BaseApiService,
    ) {}

    getData( pageIndex: number,
        pageSize: number,
        sortField: string | null,
        sortOrder: string | null,
        filters: Array<{ key: string; value: string[] }>){

        let randomUserUrl = "https://randomuser.me/api";
        let filterData= '';
        if(filters){
             filterData = '&' + filters[0].key + '=' + filters[0].value;
        }
        return this.baseApiService.get(`/api?page=${pageIndex}&results=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}${filterData}`);
    }
}