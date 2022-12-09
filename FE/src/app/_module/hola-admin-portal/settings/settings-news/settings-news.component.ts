import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataSource, IBreakCrumb, ValuesSystem } from '@models/shared-component.model';
import { CmsService } from '@services/cms.service';
import { MODULE } from '@share/_constant/service-url.constant';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-settings-news',
  templateUrl: './settings-news.component.html',
  styleUrls: ['./settings-news.component.scss']
})
export class SettingsNewsComponent  implements OnInit {
  @Input() idCategory: string;
  searchText: string = '';
  arrayHeader: any[] = [
    {
      name: "Tiêu đề",
      key: "td",
    },
    {
      name: "Thuộc danh mục",
      key: "dm",
    },
    {
      name: "Trạng thái",
      key: "tt",
    },
    {
      name: "Cập nhật lần cuối",
      key: "cn",
    },
  ]
  arrayHeader2: any[] = [
    {
      name: "Tiêu đề",
      key: "td",
    },
    {
      name: "Thứ tự xuất hiện",
      key: "dm",
    },
    {
      name: "Thuộc danh mục",
      key: "tt",
    },
    {
      name: "Cập nhật lần cuối",
      key: "cn",
    }

  ]
  public urlFree: string;
  arrayValues: ValuesSystem[] = [
    {
      name: "title",
      type: "Text",
      nameChild: "ta"
    },
    {
      name: "articleCategorys",
      type: "Array"
    },
    {
      name: "status",
      type: "Status"
    },

    {
      name: "updatedAt",
      type: "Date"
    }
  ]
  arrayValues2: ValuesSystem[] = [
    {
      name: "title",
      type: "Text",
      nameChild: "ta"
    },

    {
      name: "displayOrder",
      type: "Text"
    },
    {
      name: "articleCategorys",
      type: "Array"
    },
    {
      name: "updatedAt",
      type: "Date"
    }
  ]
  isUpdate = false;
  module = MODULE.ARITCLE;
  public breadcrumbData: IBreakCrumb;
  public categoryDataSource: DataSource[] = [];
  isRouteNew = false;
  constructor(private router: Router, private cmsService: CmsService, private activatedRoute: ActivatedRoute,
    private message: NzMessageService) { 
    
    }

  ngOnInit(): void {
   
    this.urlFree="Article"
    if(this.activatedRoute.snapshot.params['id']){
      this.idCategory = this.activatedRoute.snapshot.params['id'];
      this.urlFree = `Article/getByCategory/${this.idCategory}`;
      this.isRouteNew = true;
    }
    
    this.isUpdate = true;
    this.breadcrumbData = {
      header: 'Danh mục bài viết',
      bItem: [
        {
          title: 'Cài đặt',
          routerLink: ''
        },
        {
          title: 'Bài viết',
          routerLink: ''
        }

      ]
    }
    this.getCategory();
  }
  routeManage() {
    this.router.navigate(['cms-portal/setting/news/crud']);
  }
  
  routeCategory() {
    this.router.navigate(['cms-portal/setting/news-category']);
  }
  getIdCategory(data: any) {
    this.idCategory = data;
    console.log(data);
    this.urlFree = `Article/getByCategory/${data}`;
  }
  eventChangeLocation(data: any) {
    this.cmsService.postDataFreeURL(data, `Article/displayOrder/${this.idCategory}`).subscribe(res => {
      this.message.success("Đổi vị trí thành công");
    })
  }
  clearId() {
    this.idCategory = '';
    this.urlFree="Article";
    if(this.isRouteNew){
      this.router.navigate(['cms-portal/setting/news']);
    }
  }
  updateStatus(result: any) {
    let objectIds = [] as any;
    result.data.forEach((item: string) => {
      objectIds.push({ id: item });
    })
    const postData = {
      "articleIds": objectIds,
      "status": result.value
    }
    this.isUpdate = true;
    this.cmsService.postDataFreeURL(postData, 'Article/updatestatus').subscribe(res => {
      this.message.success("Đổi trạng thái bài viết thành công");
      this.isUpdate = false;
    }, (err) => {
      this.isUpdate = false;
    })
  }
  deleteEvent(data: any) {
    let objectIds = [] as any;
    data.forEach((item: string) => {
      objectIds.push({ id: item });
    })
    const postData = {
      "articleIds": objectIds
    }
    this.isUpdate = true;
    this.cmsService.postDataFreeURL(postData, 'Article/deleteMultipe').subscribe(res => {
      this.message.success("Xóa bài viết thành công");
      this.isUpdate = false;
    }, (err) => {
      this.isUpdate = false;
    })
  }
  updateCategory(result: any) {
    let objectIds = [] as any;
    result.data.forEach((item: string) => {
      objectIds.push({ id: item });
    })
    const postData = {
      "articleIds": objectIds
    }
    this.isUpdate = true;
    this.cmsService.putDataFreeUrl(postData, 'Article/addtoCategory/' + result.value).subscribe(res => {
      this.message.success("Thêm vào danh mục bài viết thành công");
      this.isUpdate = false;
    }, (err) => {
      this.isUpdate = false;
    })
  }
  getCategory() {
    this.cmsService.getAllFreeUrl("ArticleCategory").subscribe((res: any) => {
      let data = res.data as any[];
      data.forEach(item => {
        this.categoryDataSource.push({ id: item.id, name: item.name });
      })
      this.isUpdate = false;
    })
  }
}
