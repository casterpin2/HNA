import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IBreakCrumb, ValuesSystem } from '@models/shared-component.model';
import { CmsService } from '@services/cms.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-news-category',
  templateUrl: './news-category.component.html',
  styleUrls: ['./news-category.component.scss']
})
export class NewsCategoryComponent implements OnInit {
  searchText: string = '';
  arrayHeader : any[] = [
    {
      name: "Tiêu đề",
      key: "td",
    },
    {
      name: "Thứ tự xuất hiện",
      key: "td",
    },
    {
      name: "Trạng thái",
      key: "td",
    },
    {
      name: "Xem bài viết",
      key: "td",
    }
  ]
  arrayValues:ValuesSystem[]=[
    {
      name:"name",
      nameChild:"description",
      type:"Text"
    },
    {
      name:"displayOrder",
      type:"Text"
    },
    {
      name:"status",
      type:"Status"
    }
  ]
  public breadcrumbData: IBreakCrumb;
  constructor( private router: Router,private cmsService : CmsService,private message: NzMessageService) { 

  }

  ngOnInit(): void {
    this.breadcrumbData = {
      header: 'Danh mục bài viết',
      bItem: [
        {
          title: 'Cài đặt',
          routerLink: ''
        },
        {
          title: 'Bài viết',
          routerLink: 'cms-portal/setting/news'
        },
        {
          title: 'Danh mục',
          routerLink: ''
        }
      ]
    }
  }
  routeManage() {
    this.router.navigate(['cms-portal/setting/news-category-curd']);
  }
  routeNews() {
    this.router.navigate(['cms-portal/setting/news']);
  }
  eventChangeLocation(data:any){
    this.cmsService.postDataFreeURL(data,'ArticleCategory/displayOrder').subscribe(res=>{
      this.message.success("Đổi vị trí danh mục bài viết thành công");
     
    })
  }
  getIdCategory(data:any){
    this.router.navigate(['cms-portal/setting/news/category/'+data.value]);
  }
}
