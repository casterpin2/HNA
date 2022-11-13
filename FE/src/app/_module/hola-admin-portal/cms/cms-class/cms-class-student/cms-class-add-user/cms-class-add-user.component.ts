import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TYPE_COLUMNS } from '@models/constant.model';
import { ControlDynamic, DataSource, ValuesSystem } from '@models/shared-component.model';
import { CmsService } from '@services/cms.service';
import { MODULE } from '@share/_constant/service-url.constant';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-cms-class-add-user',
  templateUrl: './cms-class-add-user.component.html',
  styleUrls: ['./cms-class-add-user.component.scss']
})
export class CmsClassAddUserComponent implements OnInit {
  @Input() idClass: string;
  @Input() visibleForm: boolean = false;
  @Output() closeModal = new EventEmitter<any>();
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
  headerBreadCurm :string ="";
  userId :string[] = [];
  public categoryDataSource: DataSource[] = [];
  isRouteNew = false;
  constructor(private router: Router, private cmsService: CmsService, private activatedRoute: ActivatedRoute,
    private message: NzMessageService) { 

    }

  ngOnInit(): void {
   
    
    const idGetParams = this.activatedRoute.snapshot.params['id'];
    this.urlFree = 'class/studentOther/'+idGetParams;
    this.getClassById();
  
    
  }
  routeManage() {
    this.router.navigate(['setting/news/crud']);
  }
  
  routeCategory() {
    this.router.navigate(['setting/news-category']);
  }
 

  deleteEvent(data: any) {
    
  }
  
  public getClassById(){
    const idGetParams = this.activatedRoute.snapshot.params['id'];
    this.cmsService.getAllFreeUrl(`class/${idGetParams}`).subscribe((res:any)=>{
      this.headerBreadCurm = res.data[0].name
    })
  }
  cancelPopup(){
    this.visibleModal();
  }
  handleOk(){

    const postData = {
      "userId": this.userId,
    }
    this.isUpdate = true;
    let url = 'clas/addUser/'+this.activatedRoute.snapshot.params['id'];
    this.cmsService.postDataFreeURL(postData, url).subscribe(res => {
      this.message.success("Thêm học sinh thành công");
      this.visibleModal();
    }, (err) => {
      this.message.success("Thêm học sinh không thành công");
    })
  }
  getUserSelected(data:any){
    this.userId = data;
  }
  public visibleModal() {
    this.visibleForm = false;
    this.closeModal.emit();
  }

}