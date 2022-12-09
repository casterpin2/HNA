import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlDynamic, DataSource, IBreakCrumb } from '@models/shared-component.model';
import { CmsService } from '@services/cms.service';
import { DATA_BANNER } from '@share/_constant/model.constant';

import { MODULE } from '@share/_constant/service-url.constant';
import { BANNER, NEWS } from '@share/_constant/table-columns';
import { FormHelper } from '@share/_helper/form-helper';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-banner-crud',
  templateUrl: './banner-crud.component.html',
  styleUrls: ['./banner-crud.component.scss']
})
export class BannerCrudComponent implements OnInit {
  public breadcrumbData: IBreakCrumb;
  public systemForm: FormGroup;
  public arrayColumns: ControlDynamic[];
  public isUpdated = false;
  @Input() id : string;
  public positionDisplay :DataSource[] =DATA_BANNER
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
    this.service.getDetail(this.id, MODULE.BANNER).subscribe(res => {
      let object  = {} as any;
      this.arrayColumns.forEach(item=>{
        object[item.name] = res[item.name];
      })
      object.status=res.status;
      object.imgUrl=res.imgUrl;
      object.positionDisplay=res.positionDisplay;

      this.avatarUrl = res.imgUrl;
      this.systemForm.patchValue(object)
      console.log(this.systemForm.getRawValue());
      this.isRender = true;
    });
  }
  private initForm() {
    this.arrayColumns = JSON.parse(JSON.stringify(BANNER)) as ControlDynamic[];

    this.systemForm = this.fb.group({
      status:this.fb.control("Active"),
      imgUrl:this.fb.control(""),
      positionDisplay:this.fb.control("Home",[Validators.required]),

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
    if(!this.avatarUrl){
      this.message.warning("Ảnh banner không được để rỗng");
      return;
    }
    let postData = this.systemForm.getRawValue();
    if (this.id) {
      postData["id"] = this.id;
      this.service.updateFreeUrl(`${MODULE.BANNER}/${this.id}`,postData).subscribe(res => {
        this.message.success('Cập nhật Banner thành công');
        this.returnBannerHome.emit(false);
      }, (err => {
        this.message.error(err.errListCode.message);
      }))
    } else {
      this.service.create(postData, MODULE.BANNER).subscribe(res => {
        this.message.success('Thêm mới Banner viết thành công');
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
    this.systemForm.controls.imgUrl.setValue(data);
  }

  eventFormInput(data:any){
    
    if(data.name =="name" && data.value){
      data.value = data.value.trim().replaceAll(" ","-").toLowerCase();
      this.systemForm.controls.tag.setValue(data.value);
    }
  }
}