import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MODULE } from '@share/_constant/service-url.constant';
import { FormHelper } from '@share/_helper/form-helper';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzThMeasureDirective } from 'ng-zorro-antd/table';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';


import { takeUntil } from 'rxjs/operators';
import { ControlDynamic } from '@models/shared-component.model';
import { DEFAULT_IMG, TYPE_COLUMNS } from '@models/constant.model';
import { CmsService } from '@services/cms.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent  implements OnInit {
  accountForm!: FormGroup;
  loading = false;
  avatarUrl: string = '';
  defaultImg = DEFAULT_IMG.url;
  fileImg: NzUploadFile;
  controlArray: ControlDynamic[];
  controlArray2: ControlDynamic[];
  typeColumn = TYPE_COLUMNS;
  banner: ControlDynamic;

  fileList: NzUploadFile[];
  isUpdated = false;

  isShowPopup = false;
  expandKeys = ['100', '1001'];
  value?: string;

  roles: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private msg: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private cmsService: CmsService,
    private message: NzMessageService
  ) {

  }

  async ngOnInit() {
    this.renderForm();
    this.getDetail();
    
  }

  async renderForm() {
    this.accountForm = this.fb.group({});
    this.controlArray = [
      {
        name: 'username',
        type: this.typeColumn.TEXT,
        label: 'Tên tài khoản',
        order: 1,
        isRequired: true,
        msg: 'PRODUCT.MSG.EMPTY_COURSE',
        maxlength: 255,
      },
      {
        name: 'password',
        type: this.typeColumn.PASSWORD,
        label: 'Mật khẩu',
        order: 1,
        isRequired: true,
        msg: 'PRODUCT.MSG.EMPTY_COURSE',
        maxlength: 255,
      },
      {
        name: 'fullName',
        type: this.typeColumn.TEXT,
        label: 'Họ và tên',
        order: 1,
        isRequired: true,
        msg: 'PRODUCT.MSG.EMPTY_COURSE',
        maxlength: 255,
      },
     
      {
        name: 'role',
        type: this.typeColumn.SELECT,
        label: 'Vai trò',
        order: 1,
        isRequired: true,
        msg: 'PRODUCT.MSG.EMPTY_COURSE',
        maxlength: 255,
        dataSource: []
      },
      {
        name: 'phoneNumber',
        type: this.typeColumn.TEXT,
        label: 'Số điện thoại',
        order: 1,
        isRequired: true,
        msg: 'PRODUCT.MSG.EMPTY_COURSE',
        maxlength: 255,
      },
      {
        name: 'email',
        type: this.typeColumn.TEXT,
        label: 'Email',
        order: 1,
        isRequired: false,
        msg: 'PRODUCT.MSG.EMPTY_COURSE',
        maxlength: 255,
      },
      {
        name: 'address',
        type: this.typeColumn.TEXT,
        label: 'Địa chỉ',
        order: 1,
        isRequired: false,
        msg: 'PRODUCT.MSG.EMPTY_COURSE',
        maxlength: 255,
      },
    ];
    this.banner = {
      name: 'pImgBanner',
      type: this.typeColumn.FILE,
      label: 'PRODUCT.BANNER',
      order: 0,
    };
    this.controlArray.forEach((item) => {
      if (item.isRequired) {
        this.accountForm.addControl(
          item.name,
          this.fb.control(item.value, [Validators.required])
        );
      } else {
        this.accountForm.addControl(item.name, this.fb.control(item.value));
      }
    });
    this.getRole();
  }

  getDetail() {
    const idGetParams = this.activatedRoute.snapshot.params['id'];
    if (!idGetParams) {
      return;
    }
    const TYPE = this.activatedRoute.snapshot.params['type'];
    this.isUpdated = true;
    let url = `users/${idGetParams}`
    this.cmsService
      .getAllFreeUrl(url)
      .subscribe(
        (res: any) => {
          this.avatarUrl = res.avatar;
          res.password = "12345678";
          this.accountForm.patchValue(res);
          this.accountForm.controls.password.disable();
          this.accountForm.controls.username.disable();
          //console.log(this.accountForm);
        },
        (err:any) => {
          console.log(err);
        }
      );
  }
  submitForm() {
    if (!this.accountForm.valid) {
      FormHelper.markDirty(this.accountForm);

      return;
    }
    const formRawData = this.accountForm.getRawValue();
    formRawData.avatar  = this.avatarUrl;
    
    // console.log(formRawData);
    if (!this.isUpdated) {
      this.cmsService
        .create(formRawData, MODULE.USER)
  
        .subscribe(
          (res: any) => {
            
            this.message.success('Tạo mới tài khoản thành công');
            this.cancel();
          },
          (err:any) => {
            this.message.error(
              `Tạo mới tài khoản không thành công: ${err?.errListCode?.message?.toString()}`
            );
          }
        );
    } else {
      const idGetParams = this.activatedRoute.snapshot.params['id'];
      formRawData.id = idGetParams;
     
      this.cmsService
        .putDataFreeUrl(formRawData, `users/${idGetParams}`)
        .subscribe(
          (res) => {
            this.message.success('Cập nhật tài khoản thành công');
            this.cancel();
          },
          (err) => {
            this.message.error(
              'Cập nhật tài khoản không thành công',
              err?.errListCode?.message?.toString()
            );
          }
        );
    }
  }
  cancel() {
    if(localStorage.getItem("role") == "2"){
      this.router.navigate(['cms-portal']);
    }else{
      this.router.navigate(['cms-portal/cms/student']);
    }
    
  }

  getAvatarUrl(type: string, data: string) {
    this.avatarUrl = data;
  }
  async getRole(){
    this.cmsService.getAllFreeUrl('role').subscribe((res:any)=>{
      this.controlArray[3].dataSource = res;
    });
  }
}
