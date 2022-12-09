import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ControlDynamic, IBreakCrumb } from '@models/shared-component.model';
import { CmsService } from '@services/cms.service';

import { MODULE } from '@share/_constant/service-url.constant';
import { SYSTEM_COLUMNS } from '@share/_constant/table-columns';
import { FormHelper } from '@share/_helper/form-helper';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-settings-system',
  templateUrl: './settings-system.component.html',
  styleUrls: ['./settings-system.component.scss']
})
export class SettingsSystemComponent implements OnInit {
  public breadcrumbData: IBreakCrumb;
  public systemForm: FormGroup;
  public arrayColumns: ControlDynamic[];
  public isUpdated = false;
  public id: string;
  public logoImg: string;
  public bannerImg: string;
  public avatarImg: string;
  constructor(private fb: FormBuilder, private service: CmsService, private message: NzMessageService) {
    
  }

  ngOnInit() {
    this._onInit();
  }
  private _onInit() {
    this.breadcrumbData = {
      header: 'Cài đặt hệ thống',
      bItem: [
        {
          title: 'Cài đặt',
          routerLink: ''
        },
        {
          title: 'Cài đặt hệ thống',
          routerLink: 'cms-portal/setting/system'
        },
      ]
    }
    this.initForm();
    this.getSetting();
  }
  private initForm() {
    this.arrayColumns = SYSTEM_COLUMNS as ControlDynamic[];;
    this.systemForm = this.fb.group({

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
    postData.faviconUrl = this.avatarImg;
    postData.logoUrl = this.logoImg;
    postData.imgShareUrl = this.bannerImg;
    this.service.updateFreeUrl(`${MODULE.SETTING}/${this.id}`,postData).subscribe(res => {
      this.message.success('Cập hệ thống thành công');

    }, (err => {
      this.message.error(err.errListCode.message);
    }))
  }
  getAvatarUrl(type: string, data: string) {
    switch (type) {
      case "avatar":
        this.avatarImg = data;
        break;
      case "logo":
        this.logoImg = data;
        break;
      case "banner":
        this.bannerImg = data;
        break;
    }
  }
  cancel() {

  }

  getSetting() {
    this.service.getAllFreeUrl("Setting").subscribe((res: any) => {
      let object = {} as any;
      this.id = res.id
      this.arrayColumns.forEach(item => {
        object[item.name] = res[item.name];
      })
      this.systemForm.patchValue(object);
      this.avatarImg = res.faviconUrl;
      this.logoImg = res.logoUrl;
      this.bannerImg = res.imgShareUrl;
    })
  }
}
