import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValuesSystem } from '@models/shared-component.model';
import { CmsService } from '@services/cms.service';

import { MODULE } from '@share/_constant/service-url.constant';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-course-home',
  templateUrl: './course-home.component.html',
  styleUrls: ['./course-home.component.scss']
})
export class CourseHomeComponent implements OnInit {
  searchText: string = '';
  arrayHeader: string[] = [
    "Tiêu đề",
    "Thứ tự xuất hiện",
    "Trạng thái",
    "Cập nhật lần cuối"
  ];
  module: string = MODULE.COURSE_HOMEPAGE;
  addNewBanner: boolean = false;
  idOutput :string;
  isUpdate:boolean = false;

  arrayValues: ValuesSystem[] = [
    {
      name: "name",
      nameChild: "descriptionShort",
      type:"Text"
    },
    {
      name: "priorityOnHomePage",
      type:"Text"
    },
    {
      name: "status",
      type:"Text"
    },
    {
      name: "updatedAt",
      type:"Date"
    }
  ]
  constructor(
    private cmsService: CmsService,
    private message: NzMessageService,
    private router: Router,) {
     
     }

  ngOnInit(): void {
  }
  routeManage() {
    this.router.navigate(['cms/cms-product/crud' ]);
  }
  eventChangeLocation(data: any) {
    let objectIds =[] as any;
    data.forEach((item:any)=>{
      objectIds.push({id:item.id});
    })
    const postData = {
      "courses": objectIds,
      "removeFromHomePageCourse": [
      ] as any
    }
    this.cmsService.putDataFreeUrl(postData, 'courses/on-homepage/priorities').subscribe(res => {
      this.message.success("Đổi vị trí khóa học thành công");
    })
  }
  addBannerGetValue(data:boolean){
    this.addNewBanner = data;
  }
  emitDetail(data : string){
    this.idOutput = data;
    this.router.navigate(['cms/cms-product/crud/' + data]);
  
  }
 
  deleteEvent(data:any){
    let objectIds =[] as any;
    data.forEach((item:string)=>{
      objectIds.push({id:item});
    })
    const postData  = {
      "courses": [] as any,
      "removeFromHomePageCourse": objectIds
    }
    this.isUpdate = true;
    this.cmsService.postDataFreeURL(postData, 'courses/on-homepage/priorities').subscribe(res => {
      this.message.success("Xóa Khóa học khỏi màn hình chính thành công");
      this.isUpdate = false;
    },(err)=>{
      this.isUpdate = false;
    })
  }
}