import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlDynamic, DataSource, IBreakCrumb } from '@models/shared-component.model';
import { CmsService } from '@services/cms.service';

import { MODULE } from '@share/_constant/service-url.constant';
import { BANNER, CUSTOMER, NEWS } from '@share/_constant/table-columns';
import { FormHelper } from '@share/_helper/form-helper';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-customer-feedback-crud',
  templateUrl: './customer-feedback-crud.component.html',
  styleUrls: ['./customer-feedback-crud.component.scss']
})
export class CustomerFeedbackCrudComponent implements OnInit {
  public breadcrumbData: IBreakCrumb;
  public systemForm: FormGroup;
  public arrayColumns: ControlDynamic[];
  public isUpdated = false;
  @Input() id : string;
  public positionDisplay :DataSource[] =[ 
    {id:"Home",name:"Trang Home"}, 
    {id:"Footer",name:"Trang tin tức"},
    {id:"All",name:"Cả 2"} ];
  public device :DataSource[] = [ 
    {id:"WEB",name:"WEB"}, 
    {id:"MOBILE",name:"MOBILE"},
    {id:"ALL",name:"Cả 2"} ]
  public avatarUrl:string;
  isRender = false;
  @Output() returnBannerHome  = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private message: NzMessageService,
    private service :CmsService,
    private router: Router,
    ) {
 
  }

  ngOnInit() {
    this._onInit();
  }
  private _onInit() {
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
        },
        {
          title: 'Danh mục bài viết',
          routerLink: 'hola-portal/setting/news-category'
        },
      ]
    }
    this.initForm();
    this.getDetail();
  }
  private getDetail(){
    if(!this.id){
      this.isRender = true;
      return;
    }
    this.service.getAllFreeUrl(`client/customer/`+this.id).subscribe((res:any) => {
      let object  = {} as any;
      this.arrayColumns.forEach(item=>{
        object[item.name] = res[item.name];
      })
      object.status=res.status;
      object.avatar=res.avatar;
      this.avatarUrl = res.avatar;
      this.systemForm.patchValue(object)
      console.log(this.systemForm.getRawValue());
      this.isRender = true;
    });
  }
  private initForm() {
    this.arrayColumns = JSON.parse(JSON.stringify(CUSTOMER)) as ControlDynamic[];

    this.systemForm = this.fb.group({
      status:this.fb.control("Active"),
      avatar:this.fb.control(""),
 
    })
    this.arrayColumns.forEach(item => {
      if (item.isRequired) {
        this.systemForm.addControl(item.name, this.fb.control(item.value, [Validators.required]));
      } else {
        this.systemForm.addControl(item.name, this.fb.control(item.value));
      }
    })

  }
  submitForm() {
    
    if (!this.systemForm.valid) {
      FormHelper.markDirty(this.systemForm);
      return;
    }
    let postData = this.systemForm.getRawValue();
    if (this.id) {
      postData["id"] = this.id;
      this.service.updateFreeUrl(`client/customer/${this.id}`,postData).subscribe(res => {
        this.message.success('Cập nhật Feedback thành công');
        this.returnBannerHome.emit(false);
      }, (err => {
        this.message.error(err.errListCode.message);
      }))
    } else {
      this.service.postDataFreeURL(postData,'client/customer').subscribe(res => {
        this.message.success('Thêm mới Feedback viết thành công');
        this.returnBannerHome.emit(false);
      }, (err => {
        this.message.error(err.errListCode.message);
      }))
    }
  }
  
  cancel(){
    this.routeHome();
  }
  routeHome() {
    this.returnBannerHome.emit(false);
  }
  getAvatarUrl(type: string, data: string) {
    this.avatarUrl = data;
    this.systemForm.controls.avatar.setValue(data);
  }

  eventFormInput(data:any){
    
    if(data.name =="name" && data.value){
      data.value = data.value.trim().replaceAll(" ","-").toLowerCase();
      this.systemForm.controls.tag.setValue(data.value);
    }
  }
}
