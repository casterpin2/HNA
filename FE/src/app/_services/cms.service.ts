import { HttpBackend, HttpClient, HttpEvent, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServiceUrl } from "@share/_constant/service-url.constant";
import { NzUploadFile } from "ng-zorro-antd/upload";
import { Observable } from 'rxjs';
import { BaseApiService } from "./base-api.service";

@Injectable()

export class CmsService {
    constructor(
        private baseApiService: BaseApiService,
        private handler: HttpBackend, private httpAws: HttpClient
    ) {
    }
    postData(postData: any, module: string): Observable<any> {
        return this.baseApiService.post(ServiceUrl.APIURL[module].Update, postData);
    }

    postDataFreeURL(postData: any, url: string, queryData?: any): Observable<any> {
        const queryDataForm = this.convertObjectToString(queryData);
        if (queryDataForm) {
            return this.baseApiService.post(url + queryDataForm, postData);
        } else {
            return this.baseApiService.post(url, postData);
        }

    }

    putDataFreeUrl(postData: any, freeUrl: string): Observable<any> {
        return this.baseApiService.put(freeUrl, postData);
    }

    deleteFreeUrl(url: string) {
        return this.baseApiService.deleteFreeUrl(url);
    }
    updateFreeUrl(url: string, data?: any) {
        return this.baseApiService.updateFreeUrl(url, data);
    }

    getAllFreeUrl(url: string, queryData?: any) {
        const queryDataForm = this.convertObjectToString(queryData);
        return this.baseApiService.get(url + queryDataForm);
    }
    create(postData: any, module: string) {
        return this.baseApiService.post(ServiceUrl.APIURL[module].Create, postData);
    }
    getImgUrl(link: string, file: NzUploadFile, isSound?: boolean) {
        return this.baseApiService.uploadfileAWSS3(link, file, isSound);
    }
    update(postData: any, module: string, id?: string) {
        if (!id) {
            id = postData.id;
        }
        return this.baseApiService.put(ServiceUrl.APIURL[module].Update, postData);
    }
    convertObjectToString(obj: any) {

        let str = '';
        // tslint:disable-next-line:forin
        for (const key in obj) {
            if (str !== '') {
                str += '&';
            }
            str += key + '=' + obj[key];
        }
        if (str == '') {
            return str;
        }
        return '?' + str;
    }
  
}