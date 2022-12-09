import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValuesSystem } from '@models/shared-component.model';
import { CmsService } from '@services/cms.service';

import { MODULE } from '@share/_constant/service-url.constant';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-customer-feedback',
  templateUrl: './customer-feedback.component.html',
  styleUrls: ['./customer-feedback.component.scss']
})
export class CustomerFeedbackComponent implements OnInit {
  searchText: string = '';
 
  arrayHeader: any[] = [
    {
      name: "Khách hàng",
      key: "td",
    },
    {
      name: "Ảnh đại diện",
      key: "tt",
    },
    {
      name: "Nội dung",
      key: "dm",
    },
  
    {
      name: "Cập nhật lần cuối",
      key: "cn",
    },
  ]
  module: string = MODULE.BANNER;
  addNewBanner: boolean = false;
  idOutput :string;
  isUpdate:boolean = false;

  arrayValues: ValuesSystem[] = [
    {
      name: "customerName",
      nameChild: "descriptionShort",
      type:"Text"
    },
    {
      name: "avatar",
      type:"Img"
    },
    {
      name: "content",
      type:"Text"
    },
    {
      name: "updatedAt",
      type:"Date"
    }
  ]
  constructor(
    private cmsService: CmsService,
    private message: NzMessageService) { 
      
    }

  ngOnInit(): void {
  }
  routeManage() {
    this.addNewBanner = true;
  }
  eventChangeLocation(data: any) {
    this.cmsService.postDataFreeURL(data, 'Banner/displayOrder').subscribe(res => {
      this.message.success("Đổi vị trí Banner thành công");
    })
  }
  addBannerGetValue(data:boolean){
    this.addNewBanner = data;
  }
  emitDetail(data : string){
    this.idOutput = data;
    this.addNewBanner = true;
    console.log(this.idOutput);
  }
  updateStatus(result:any){
    let objectIds =[] as any;
    result.data.forEach((item:string)=>{
      objectIds.push({id:item});
    })
    const postData  = {
      "bannerIds": objectIds,
      "status": result.value
    }
    this.isUpdate = true;
    this.cmsService.postDataFreeURL(postData, 'Banner/updatestatus').subscribe(res => {
      this.message.success("Đổi vị trí Banner thành công");
      this.isUpdate = false;
    },(err)=>{
      this.isUpdate = false;
    })
  }
  deleteEvent(data:any){
    let objectIds =[] as any;
    data.forEach((item:string)=>{
      objectIds.push({id:item});
    })
    const postData  = {
      "bannerIds": objectIds
    }
    this.isUpdate = true;
    this.cmsService.postDataFreeURL(postData, 'Banner/deleteMultipe').subscribe(res => {
      this.message.success("Xóa Banner thành công");
      this.isUpdate = false;
    },(err)=>{
      this.isUpdate = false;
    })
  }
}
