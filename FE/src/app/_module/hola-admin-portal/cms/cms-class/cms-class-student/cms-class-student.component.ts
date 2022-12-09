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
  visibleModalFee =false;
  visibleModalAttendence =false;
  userId:string;
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
  hideBtn = false;
  constructor(private router: Router, private cmsService: CmsService, private activatedRoute: ActivatedRoute,
    private message: NzMessageService) {

  }

  ngOnInit(): void {


    const idGetParams = this.activatedRoute.snapshot.params['id'];
    this.urlFree = 'users/getStudentOfClass/' + idGetParams;
    this.getClassById();
    this.hideBtnByRole();
    this.renderData = false;

  }
  routeManage() {
    this.router.navigate(['setting/news/crud']);
  }


 
 
  
  deleteEvent(data: any) {
   
    let url = `users/deleteUserClass/` + this.activatedRoute.snapshot.params['id'];
    this.renderData = true;
    this.cmsService.postDataFreeURL(data, url).subscribe(res => {
      this.message.success("Xóa học sinh thành công thành công");
      this.renderData = false;
    
    }, (err: any) => {
      this.isUpdate = false;
    })
  }

  public getClassById() {
    const idGetParams = this.activatedRoute.snapshot.params['id'];
    this.cmsService.getAllFreeUrl(`class/${idGetParams}`).subscribe((res: any) => {
      this.headerBreadCurm = res.name
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
  modalFeeData(data:boolean){
    this.visibleModalFee = false;
  }
  getEmitFeeBtn(data:string){
    this.userId = data;
    this.visibleModalFee = true;
  }
  modalAttendenceData(data:string){
    this.userId = data;
    this.visibleModalAttendence = true;
  }
  modalAttendenceCloseData(data:boolean){
    console.log(data);
    this.visibleModalAttendence = false;
  }
  hideBtnByRole(){
    this.hideBtn = localStorage.getItem('role') == "2"? true : false;
  }
}

