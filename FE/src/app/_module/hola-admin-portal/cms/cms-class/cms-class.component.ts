

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DATE_FOMAT, DEFAULT_IMG } from '@models/constant.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { takeUntil } from 'rxjs/operators';
import { CmsService } from 'src/app/_services/cms.service';


@Component({
  selector: 'app-cms-class',
  templateUrl: './cms-class.component.html',
  styleUrls: ['./cms-class.component.scss']
})
export class CmsClassComponent implements OnInit {
  total = 1;
  listOfCourse: any[];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  filterGender = [
    { text: "male", value: "male" },
    { text: "female", value: "female" }
  ];
  categories: any[] = [];
  isShowCategories = false;
  queryForm = {
    pageNo :1,
    pageSize : 10,
    language : '',
  } as any;

  defaultImg = DEFAULT_IMG.url;
  searchValue = '';
  visible = false;
  form:FormGroup;
  searchObject :any;
  selectedValue: string = ''
  dateFormat = DATE_FOMAT;
  classId:string;
  isShowCreate : boolean = true;
  isShowUpdate : boolean = true;
  isShowDelete : boolean = true;
  visibleForm = false;
  constructor(private messageService: NzMessageService,
    private cmsService: CmsService,
    private router: Router) {

     }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);

    this.form = new FormGroup({
      searchName: new FormControl('')
   });
  }
  loadDataFromServer(pageIndex: number, pageSize: number, sortField: string | null, sortOrder: string | null, filter: Array<{ key: string; value: string[] }>, searchStr? : string): void {
    this.loading = true;
    const inputArray = [pageIndex, pageSize, sortField, sortOrder, filter];
    this.queryForm.pageNo = pageIndex,
    this.queryForm.pageSize = pageSize;
    this.queryForm.language = this.selectedValue || '';
    if(sortOrder){      
        this.queryForm.sortDirection = sortOrder === 'ascend' ? 'ASC' : 'DESC';      
    }
    if(sortField){
      this.queryForm.sortField = sortField;
    }    
    if(searchStr){
      this.queryForm.searchStr = searchStr;
    }else{
      this.queryForm.searchStr = '';
    }
    const postData = {
      "pageNo":pageIndex,
      "pageSize":pageSize
    }
    const url = `class/show`;
    this.cmsService.postDataFreeURL(postData,url).subscribe((res: any) => {
      this.listOfCourse = res.data.items;
      this.loading = false;
      this.total = res.totalRecords;
     
    });
  }
  onQueryParamsChange(params: NzTableQueryParams, dataStr?: any): void {
    this.searchObject = params;
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }
  updateUser(item: any) {
    this.classId =item.id;
    this.visibleForm = true;
  }
  addUser(){
    this.visibleForm = true;
  }

  
  viewClass(item:any){
   this.router.navigate(['cms/class/student/'+ item.id]); 

   
  }
  reset(): void {
    this.form.reset();
    this.search();
  }

  search(): void {
    this.visible = false;
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, [], this.form.getRawValue().searchName);
   // this.onQueryParamsChange();
   // this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }

  filterCategoryLang(env: any){
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
  }
  deleteCourse(item :any){
  
  }
  closeModal(){    
    this.classId = "";
    this.visibleForm = false; 
    this.search();
  }
 
}
