import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DEFAULT_IMG } from '@models/constant.model';
import { CmsService } from '@services/cms.service';

import { MODULE } from '@share/_constant/service-url.constant';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss'],
})
export class UploadImgComponent {
  @Input() avatarUrl: string;
  @Output() avatarEmit = new EventEmitter<any>();
  @Input() hideImg:boolean = false;
  defaultImg = DEFAULT_IMG.url;
  constructor(private msg: NzMessageService, private cmsService: CmsService) { }
  fileList: NzUploadFile[] = [];
  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      this.fileList = [];
      this.fileList = this.fileList.concat(file);
     
      this.handleUpload();
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
      
    });
    handleUpload() {
      const formData = new FormData();
      //console.log(this.fileList);
      this.fileList.forEach((file: any) => {
        formData.append('file', file);
      });
      this.cmsService.postData(formData,MODULE.UPLOAD).subscribe(res => {
       
      },(err)=>{
        this.avatarUrl = err.errListCode.text;
        this.avatarEmit.emit(err.errListCode.text);
      })
    }
}
