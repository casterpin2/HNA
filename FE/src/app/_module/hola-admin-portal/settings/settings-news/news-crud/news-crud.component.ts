
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ControlDynamic, DataSource, IBreakCrumb } from '@models/shared-component.model';
import { CmsService } from '@services/cms.service';

import { MODULE } from '@share/_constant/service-url.constant';
import { NEWS } from '@share/_constant/table-columns';
import { FormHelper } from '@share/_helper/form-helper';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-news-crud',
  templateUrl: './news-crud.component.html',
  styleUrls: ['./news-crud.component.scss']
})
export class NewsCrudComponent implements OnInit {
  public breadcrumbData: IBreakCrumb;
  public systemForm: FormGroup;
  public arrayColumns: ControlDynamic[];
  public isUpdated = false;
  public id : string;
  public positionDisplay :DataSource[] =[ 
    {id:"Home",name:"Trang Home"}, 
    {id:"News",name:"Trang tin tức"},
    {id:"All",name:"Cả 2"} ];
  public device :DataSource[] = [ 
    {id:"WEB",name:"WEB"}, 
    {id:"MOBILE",name:"MOBILE"},
    {id:"All",name:"Cả 2"} ]
  public categoryDataSource : DataSource[] =[];
  public contentOfCategory : DataSource[] =[];
  public attentionOfCategory : DataSource[] =[];
  public isShowNewsRelated : boolean = false;
  public isAttentionArticleIds : boolean = false;
  public isUpdate:boolean = true;
  public urlAvatar:string ;
  urlImgContent:string;
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
          routerLink: 'cms-portal/setting/news'
        },
        {
          title: 'Thêm mới bài viết',
          routerLink: ''
        }
      ]
    }
    this.id = this.activatedRoute.snapshot.params['id'];

    this.initForm();
    this.getDetail();
    this.getCategory();
  }
  private getDetail(){
    if(!this.id){
      return;
    }
    this.service.getDetail(this.id, MODULE.ARITCLE).subscribe(res => {
      let object  = {} as any;
      this.arrayColumns.forEach(item=>{
        object[item.name] = res[item.name];
      })
      object.status= res.status;
      object.imgLink= res.imgLink;
      object.videoTag= res.videoTag;
      object.keyWord= res.keyWord;
      object.positionDisplay= res.positionDisplay;
      object.deviceDisplay= res.deviceDisplay;
      console.log(res);
       object.articleCategoryIds= res.articleCategorys[0].id;
      // object.realtedArticleIds= res.realtedArticleIds;
      // object.attentionArticleIds= res.attentionArticleIds;
    
      this.urlAvatar = res.imgArticleUrl;
      this.systemForm.patchValue(object)
      console.log(this.systemForm.getRawValue());
      
    });
  }
  private initForm() {
    this.arrayColumns = JSON.parse(JSON.stringify(NEWS)) as ControlDynamic[];;
    
    this.systemForm = this.fb.group({
      status:this.fb.control("Active"),
      imgLink:this.fb.control(""),
      videoTag:this.fb.control(""),
      keyWord:this.fb.control(""),
      positionDisplay:this.fb.control("Footer"),
      deviceDisplay:this.fb.control("All"),
      articleCategoryIds:this.fb.control('',[Validators.required]),
      realtedArticleIds:this.fb.control(""),
      attentionArticleIds:this.fb.control("")
    })
    this.arrayColumns.forEach(item => {
      if (item.isRequired) {
        this.systemForm.addControl(item.name, this.fb.control(item.value, [Validators.required]));
      } else {
        this.systemForm.addControl(item.name, this.fb.control(item.value));
      }
    })
    console.log(this.systemForm);
    this.systemForm.controls.content.setValidators([]);
    this.systemForm.updateValueAndValidity();
  }
  submitForm() {
    this.systemForm.controls.content.setValidators([Validators.required]);
    this.systemForm.updateValueAndValidity();
    if (!this.systemForm.valid) {
      FormHelper.markDirty(this.systemForm);
      return;
    }
    let postData = this.systemForm.getRawValue();
    postData.imgArticleUrl = this.urlAvatar;
    postData.attentionArticleIds = this.getIds(this.attentionOfCategory.filter(x=>x.checked).map(x=>x.id),postData.attentionArticleIds);
    postData.articleCategoryIds = [{id:postData.articleCategoryIds}]
    postData.realtedArticleIds =  this.getIds(this.contentOfCategory.filter(x=>x.checked).map(x=>x.id),postData.attentionArticleIds);
    if(this.id){
      postData.id = this.id;
      this.service.updateFreeUrl(`Article/${this.id}`,postData).subscribe(res=>{
        this.message.success('Cập nhật bài viết thành công');
        this.routeNews();
      });
    }else{
      this.service.postDataFreeURL(postData,"Article").subscribe(res=>{
        this.message.success('Tạo mới bài viết thành công');
        this.routeNews();
      })
    }
    
  }
 
  cancel(){
    this.router.navigate(['cms-portal/setting/news']);
  }
  routeHome() {
   
  }
  getAvatarUrl(type: string, data: string) {
    this.urlAvatar = data;
  }
  getUrlImg(type: string, data: string) {
    this.urlImgContent = data;
  }
  getCategory(){
    this.service.getAllFreeUrl(MODULE.ARTIClE_CATEGORY).subscribe((res:any)=>{
      let data = res.data as any[];
      data.forEach(item=>{
        this.categoryDataSource.push({id:item.id,name:item.name});
      })
     
    })
  }
  changeCategory(isAttentionArticleIds? :boolean){
    console.log(1);
    let id  = isAttentionArticleIds? this.systemForm.controls.attentionArticleIds.value : this.systemForm.controls.realtedArticleIds.value;
    this.service.getAllFreeUrl('Article/getByCategory/'+id).subscribe((res:any)=>{
      let data = res.data as any[];
      data.forEach(item=>{
        if(isAttentionArticleIds){
          this.attentionOfCategory.push({id:item.id,name:item.title});
          this.attentionOfCategory = this.attentionOfCategory.filter(x=>x.id != this.id);
        }else{
          this.contentOfCategory.push({id:item.id,name:item.title});
          this.contentOfCategory = this.contentOfCategory.filter(x=>x.id != this.id);
        }
        
      })
     
    })
  }
  showContentRelated(){
    this.isShowNewsRelated = !this.isShowNewsRelated;
    if(this.isShowNewsRelated){
      this.systemForm.controls.realtedArticleIds.setValue(this.categoryDataSource[0].id);
      this.changeCategory();
    }
    
  }
  showContent(){
    this.isAttentionArticleIds = !this.isAttentionArticleIds;
    if(this.isAttentionArticleIds){
      this.systemForm.controls.attentionArticleIds.setValue(this.categoryDataSource[0].id);
      this.changeCategory(true);
    }
    
  }
  eventFormInput(data:any){
    
    if(data.name =="title" && data.value){
      data.value = data.value.trim().replaceAll(" ","-").toLowerCase();
      this.systemForm.controls.tag.setValue(data.value);
    }
  }

  getIds(data:any[],id?:string){
    let result = [] as any;
    data.forEach(item=>{
      if(id){
        let object = {id:item,articleCategoryId:id} as any;
        result.push(object);
      }else{
        result.push({id:item});
      }
 
    })
    return result;
  }
  routeNews() {
    this.router.navigate(['cms-portal/setting/news']);
  }
}