import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSource, ValuesSystem } from '@models/shared-component.model';
import { CmsService } from '@services/cms.service';
import { MODULE } from '@share/_constant/service-url.constant';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-cms-class-student',
  templateUrl: './cms-class-student.component.html',
  styleUrls: ['./cms-class-student.component.scss']
})
export class CmsClassStudentComponent implements OnInit {
  @Input() idCategory: string;
  searchText: string = '';
  arrayHeader: any[] = [
    {
      name: "Avatar",
      key: "avatar",
    },
    {
      name: "Tên học sinh",
      key: "fullName",
    },
    {
      name: "Tài khoản",
      key: "username",
    },
  ]
  visibleForm = false;
  public urlFree: string;
  arrayValues: ValuesSystem[] = [
    {
      name: "avatar",
      type: "Img",
    },
    {
      name: "fullName",
      type: "Text",
    },
    {
      name: "username",
      type: "Text",
    }
  ]

  isUpdate = false;
  module = MODULE.CLASS;
  headerBreadCurm: string = "";
  public categoryDataSource: DataSource[] = [];
  isRouteNew = false;
  actionDelete = false;
  renderData = false;
  constructor(private router: Router, private cmsService: CmsService, private activatedRoute: ActivatedRoute,
    private message: NzMessageService) {

  }

  ngOnInit(): void {


    const idGetParams = this.activatedRoute.snapshot.params['id'];
    this.urlFree = 'class/student/' + idGetParams;
    this.getClassById();
    this.renderData = false;

  }
  routeManage() {
    this.router.navigate(['setting/news/crud']);
  }

  routeCategory() {
    this.router.navigate(['setting/news-category']);
  }
  getIdCategory(data: any) {
    this.idCategory = data;
    this.urlFree = `Article/getByCategory/${data}`;
  }
  eventChangeLocation(data: any) {
    this.cmsService.postDataFreeURL(data, `Article/displayOrder/${this.idCategory}`).subscribe(res => {
      this.message.success("Đổi vị trí thành công");
    })
  }
  clearId() {
    this.idCategory = '';
    this.urlFree = '';
    if (this.isRouteNew) {
      this.router.navigate(['setting/news']);
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
    // let objectIds = [] as any;
    // data.forEach((item: string) => {
    //   objectIds.push({ id: item });
    // })
    // const postData = {
    //   "articleIds": objectIds
    // }
    // this.isUpdate = true;
    // this.cmsService.postDataFreeURL(postData, 'Article/deleteMultipe').subscribe(res => {
    //   this.message.success("Xóa bài viết thành công");
    //   this.isUpdate = false;
    // }, (err:any) => {
    //   this.isUpdate = false;
    // })
    let url = 'class/removeUser/' + this.activatedRoute.snapshot.params['id'];
    this.renderData = true;
    this.cmsService.postDataFreeURL({ userId: data }, url).subscribe(res => {
      this.message.success("Xóa học sinh thành công thành công");
      this.renderData = false;
    
    }, (err: any) => {
      this.isUpdate = false;
    })
  }

  public getClassById() {
    const idGetParams = this.activatedRoute.snapshot.params['id'];
    this.cmsService.getAllFreeUrl(`class/${idGetParams}`).subscribe((res: any) => {
      this.headerBreadCurm = res.data[0].name
    })
  }
  closeModal() {
    this.visibleForm = false;
    this.renderData = false;
  }
  addUser() {
    this.renderData = true;
    this.visibleForm = true;
  }
}

