import { Component, OnInit } from '@angular/core';
import { ValuesSystem } from '@models/shared-component.model';
import { CmsService } from '@services/cms.service';

import { MODULE } from '@share/_constant/service-url.constant';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent  implements OnInit {
  searchText: string = '';
 
  arrayHeader: any[] = [
    {
      name: "Tên và mô tả",
      key: "td",
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
  module: string = MODULE.INFORMATION;
  addNewBanner: boolean = false;
  idOutput: string;
  isUpdate: boolean = false;

  arrayValues: ValuesSystem[] = [
    {
      name: "name",
      nameChild: "description",
      type: "Editor"
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
  constructor(
    private cmsService: CmsService,
    private message: NzMessageService) {
     
     }

  ngOnInit(): void {
  }
  routeManage() {
    this.addNewBanner = true;
  }
  
  addBannerGetValue(data: boolean) {
    this.addNewBanner = data;
  }
  emitDetail(data: string) {
    this.idOutput = data;
    this.addNewBanner = true;

  }

  
  getDeleteId(id:string){
    console.log(id);
    this.isUpdate = true;
    this.cmsService.delete(id,MODULE.INFORMATION).subscribe(res=>{
      this.message.success("Xóa thông tin thành công");
      this.isUpdate = false;
    }, (err) => {
      this.isUpdate = false;
    })
  }
}