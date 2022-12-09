import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ControlDynamic, IBreakCrumb } from '@models/shared-component.model';
import { CmsService } from '@services/cms.service';

import { MODULE } from '@share/_constant/service-url.constant';
import { NEWS_CATEGORY, SYSTEM_COLUMNS } from '@share/_constant/table-columns';
import { FormHelper } from '@share/_helper/form-helper';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-news-category-crud',
  templateUrl: './news-category-crud.component.html',
  styleUrls: ['./news-category-crud.component.scss']
})
export class NewsCategoryCrudComponent  implements OnInit  {

  public breadcrumbData: IBreakCrumb;
  public systemForm: FormGroup;
  public arrayColumns: ControlDynamic[];
  public isUpdated = false;
  public positionDisplay :string[] =[ "Home", "Footer" ];
  public displayDomain :string[] =[ "All", "PRIMARY", "SUBDOMAIN1", "SUBDOMAIN2" ];
  public id : string;
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
          routerLink: 'cms-portal/setting/news-category'
        },
      ]
    }
    this.id = this.activatedRoute.snapshot.params['id'];
    this.initForm();
    this.getDetail();
  }
  private getDetail(){
    this.service.getDetail(this.id, "ArticleCategory").subscribe(res => {
      
      this.systemForm.patchValue({
        amountDisplay: res.amountDisplay,
        amountInLine: res.amountInLine,
        description: res.description,
        displayDomain: res.displayDomain,
        name: res.name,
        position: res.position,
        status:res.status,
        tag: res.tag,
      })
      console.log(this.systemForm.getRawValue())
    });
  }
  private initForm() {
    this.arrayColumns = JSON.parse(JSON.stringify(NEWS_CATEGORY)) as ControlDynamic[];;
    this.systemForm = this.fb.group({
      amountDisplay:this.fb.control(0),
      amountInLine:this.fb.control(0),
      displayDomain:this.fb.control("Home"),
      position:this.fb.control("All"),
      status:this.fb.control("Active"),
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
      this.service.updateFreeUrl('ArticleCategory/'+ this.id,postData).subscribe(res => {
        this.message.success('Cập nhật danh mục bài viết thành công');
        this.routeHome();
      }, (err => {
        this.message.error(err.errListCode.message);
      }))
    } else {
      this.service.create(postData, 'ArticleCategory').subscribe(res => {
        this.message.success('Thêm mới danh mục bài viết thành công');
        this.routeHome();
      }, (err => {
        this.message.error(err.errListCode.message);
      }))
    }
  }
 
  cancel(){
    this.routeHome();
  }
  routeHome() {
    this.router.navigate(['cms-portal/setting/news-category']);
  }
}
