import { timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../../environments/environment'
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  constructor(private http: HttpClient, private handler: HttpBackend,private httpAws: HttpClient) { }
  get<T>(uri: string, data?: any): Observable<T> {
    return this.http.get<T>(environment.api.baseUrl + uri, { params: data });
  }
  post<T>(uri: string, data?: any): Observable<T> {
    return this.http.post<T>(environment.api.baseUrl + uri, data);
  }
  put<T>(uri: string, data?: any): Observable<T> {
    return this.http.put<T>(environment.api.baseUrl + uri, data);
  }
  delete<T>(uri: string, id: string): Observable<T> {
    return this.http.delete<T>(environment.api.baseUrl + uri + "/" + id);
  }
  deleteFreeUrl<T>(uri: string): Observable<T> {
    return this.http.delete<T>(environment.api.baseUrl + uri);
  }
  deleteSingle<T>(uri: string, id: string): Observable<T> {
    return this.http.delete<T>(environment.api.baseUrl + uri + id);
  }
  updateFreeUrl<T>(uri: string,data?:any): Observable<T> {
    return this.http.put<T>(environment.api.baseUrl + uri,data);
  }
  postFile<T>(uri: string, data?: any): Observable<T> {
    return this.http.post<T>(environment.api.baseUrl + uri, data);
  }
  getQueryString<T>(uri: string, key?: any, format?: string, id?: string): Observable<T> {
    return this.http.get<T>(environment.api.baseUrl + uri + "/" + id + "/?" + key + "=" + format);
  }
  uploadfileAWSS3(fileuploadurl: string, file: NzUploadFile,isSound?:boolean): Observable<HttpEvent<{}>> {
    
    this.httpAws = new HttpClient(this.handler); // to reset the header
    let object = { 'Content-Type': file.type} as any;
    if(isSound){
      object['ACL'] = 'public-read';
    }
    const headers = new HttpHeaders(object);
    const req = new HttpRequest('PUT', fileuploadurl, file, { headers: headers, reportProgress: true })
    return this.httpAws.request(req);
  }
}
