import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlDynamic, DataSource, IBreakCrumb } from '@models/shared-component.model';
import { CmsService } from '@services/cms.service';
import { MODULE } from '@share/_constant/service-url.constant';
import { INFORMATION } from '@share/_constant/table-columns';

import { FormHelper } from '@share/_helper/form-helper';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-information-crud',
  templateUrl: './information-crud.component.html',
  styleUrls: ['./information-crud.component.scss']
})
export class InformationCrudComponent implements OnInit {
  public breadcrumbData: IBreakCrumb;
  public systemForm: FormGroup;
  public arrayColumns: ControlDynamic[];
  public isUpdated = false;
  @Input() id : string;
  public positionDisplay :DataSource[] =[ 
    {id:"HOME",name:"Trang Home"}, 
    {id:"FOOTER",name:"Trang tin tức"},
    {id:"ALL",name:"Cả 2"} ];
  public device :DataSource[] = [ 
    {id:"WEB",name:"WEB"}, 
    {id:"MOBILE",name:"MOBILE"},
    {id:"ALL",name:"Cả 2"} ]
  public avatarUrl:string;
  @Output() returnHome  = new EventEmitter<any>();
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
    
    this.initForm();
    this.getDetail();
  }
  private getDetail(){
    if(!this.id){
      return;
    }
    this.service.getDetail(this.id, MODULE.INFORMATION).subscribe(res => {
      let object  = {} as any;
      this.arrayColumns.forEach(item=>{
        object[item.name] = res[item.name];
      })

      this.systemForm.patchValue(object)
    });
  }
  private initForm() {
    this.arrayColumns = JSON.parse(JSON.stringify(INFORMATION)) as ControlDynamic[];

    this.systemForm = this.fb.group({
   
    })
    this.arrayColumns.forEach(item => {
      if (item.isRequired) {
        this.systemForm.addControl(item.name, this.fb.control(item.value, [Validators.required]));
      } else {
        this.systemForm.addControl(item.name, this.fb.control(item.value));
      }
    })
    this.systemForm.controls.description.setValidators([]);
    this.systemForm.updateValueAndValidity();
  }
  submitForm() {
    this.systemForm.controls.description.setValidators([Validators.required]);
    this.systemForm.updateValueAndValidity();
    if (!this.systemForm.valid) {
      FormHelper.markDirty(this.systemForm);
      return;
    }
    let postData = this.systemForm.getRawValue();
    if (this.id) {
      postData["id"] = this.id;
      this.service.update(postData, MODULE.INFORMATION, this.id).subscribe(res => {
        this.message.success('Cập nhật Thông tin thành công');
        this.returnHome.emit(false);
      }, (err => {
        this.message.error(err.errListCode.message);
      }))
    } else {
      this.service.create(postData, MODULE.INFORMATION).subscribe(res => {
        this.message.success('Thêm mới Thông tin thành công');
        this.returnHome.emit(false);
      }, (err => {
        this.message.error(err.errListCode.message);
      }))
    }
  }
  
  cancel(){
    this.routeHome();
  }
  routeHome() {
    this.returnHome.emit(false);
  }
  getAvatarUrl(type: string, data: string) {
    this.avatarUrl = data;
    console.log(this.avatarUrl);
  }

  eventFormInput(data:any){
    
    if(data.name =="name" && data.value){
      data.value = data.value.trim().replaceAll(" ","-").toLowerCase();
      this.systemForm.controls.tag.setValue(data.value);
    }
  }
}