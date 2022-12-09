import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CmsService } from '@services/cms.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-cms-class-fee',
  templateUrl: './cms-class-fee.component.html',
  styleUrls: ['./cms-class-fee.component.scss']
})
export class CmsClassFeeComponent implements OnInit {
  addNew: boolean = false;
  queryForm = {
    pageNo :1,
    pageSize : 10,
    language : '',
  } as any;
  total = 1;
  pageSize = 10;
  pageIndex = 1;
  searchObject :any;
  feeData:any[] = [];
  loading = false;
  editCache: { [key: string]: { edit: boolean; data: any } } = {};
  userId :string ='';
  public form = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    price: this.fb.control('', [Validators.required]),
  })
  roleStudent : boolean = false;
  public visibleForm = false;
  constructor(
    private cmsService : CmsService,
    private fb : FormBuilder,
    private activatedRoute: ActivatedRoute,
    private message: NzMessageService) { }

  ngOnInit(): void {
  }
  getEventEmit(data: any) {

    this.addNew = false;
    this.onQueryParamsChange(this.searchObject);
  }
  addNode(item?:any){
    this.addNew = true;

  }
  loadDataFromServer(pageIndex: number, pageSize: number, sortField: string | null, sortOrder: string | null, filter: Array<{ key: string; value: string[] }>, searchStr? : string): void {
    this.loading = false;
    this.roleStudent = localStorage.getItem("role") == "2"?true:false;
    const inputArray = [pageIndex, pageSize, sortField, sortOrder, filter];
    this.queryForm.pageNo = pageIndex,
    this.queryForm.pageSize = pageSize;

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
      "pageSize":pageSize,
      "isPagging":true
    }
    const url = `class/class-fee/${this.activatedRoute.snapshot.params['id']}`;
    this.cmsService.getAllFreeUrl(url,postData).subscribe((res: any) => {
      
      this.feeData = res.data;
      this.updateEditCache();
      this.total = res.totalRecords;
      this.loading = true;
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
  startEdit(object: any): void {
    this.editCache[object.id].edit = true;
    this.form.patchValue({
      name:object.name,
      price:object.price
    })
  }
  saveEdit(id: string): void {
    const index = this.feeData.findIndex(item => item.id === id);



    let postData = this.form.getRawValue();
    postData.id = id;
    this.cmsService.updateFreeUrl( `class/class-fee/${id}`, postData).subscribe(res => {
      this.message.success('Cập nhật học phí thành công');
      this.editCache[id].data = res;
      Object.assign(this.feeData[index], this.editCache[id].data);
      this.editCache[id].edit = false;
      this.onQueryParamsChange(this.searchObject);
    }, (err => {
      this.message.error(err.errListCode.message);
    }))

  }
  deleteUser(userId:string){
   
    this.cmsService.deleteFreeUrl(`class/class-fee/${userId}`).subscribe(res=>{
      this.message.success('Xóa học phí thành công');
      this.onQueryParamsChange(this.searchObject);
    })
  }

  updateUser(userId:string){
    this.userId = userId;
    console.log(this.userId);
    this.visibleForm = true;

  }
  cancelEdit(id: string): void {
    const index = this.feeData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.feeData[index] },
      edit: false
    };
  }
  updateEditCache(): void {
    this.feeData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

}
