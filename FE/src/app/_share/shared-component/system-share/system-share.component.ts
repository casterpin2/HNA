

import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DATE_FOMAT, DATE_TIME_FORMAT, DEFAULT_IMG } from '@models/constant.model';
import { DataSource, ValuesSystem } from '@models/shared-component.model';
import { AuthenticationService } from '@services/authen.services';
import { CmsService } from '@services/cms.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'underscore';

@Component({
  selector: 'app-system-share',
  templateUrl: './system-share.component.html',
  styleUrls: ['./system-share.component.scss']
})
export class SystemShareComponent implements OnInit {
  @Input() module: string;
  @Input() actionColumns: string;
  @Input() arrayHeader: any[];
  @Input() arrayValues: ValuesSystem[];
  @Input() routerNameCurd: string;
  @Input() routerNameDetail: string;
  @Input() isPagging: boolean = true;
  @Input() isDrag: boolean = false;
  @Output() emitChangeLocation = new EventEmitter<any>();
  @Output() emitDetail = new EventEmitter<any>();
  @Input() isEmit: boolean = false;
  @Output() emitDelete = new EventEmitter<any>();
  @Output() emitChangeStatus = new EventEmitter<any>();
  @Input() isShowDropdownStatus: boolean = false;
  @Input() sortField: string;
  @Output() emitChooseCategory = new EventEmitter<any>();
  @Input() isEditor: boolean = false;
  @Input() isNoCheckStatus: boolean = false;
  @Input() isAction: boolean = false;
  @Input() isGetFreeUrl: boolean = true;
  @Input() urlFree: string;
  @Input() idCategory: string;
  @Input() isShowDropdownCategory: boolean = false;
  @Input() dataSourceCategory: DataSource[] = [];
  @Output() emitChangeCatgegory = new EventEmitter<any>();
  @Input() modulePermission: string;
  @Input() hideHeader = false;
  @Output() emitChangeItem = new EventEmitter<any>();
  @Input() hideSearch = false;
  @Input() actionDelete = false;
  @Input() usdBtn = false;
  @Input() calenderBtn = false;
  isLoading = false;
  @Output() feeModal = new EventEmitter<any>();
  @Input() dataSelectedOutSide: string;
  @Input() isRoleUserStudent = false;
  @Output() calendarEmit = new EventEmitter<any>();
  @Input() hideCheckBox :boolean = false;
  public status: DataSource[] = [
    { id: "Active", name: "Hiển thị" },
    { id: "Hide", name: "Ẩn" }]
  editCache: { [key: string]: { edit: boolean; data: any } } = {};
  listOfData: any[] = [];
  queryForm = {
    pageNo: 1,
    pageSize: 10,
    language: '',
  } as any;
  total = 1;
  pageSize = 10;
  pageIndex = 1;
  userId: string = '';
  public visibleForm = false;
  searchObject: any;
  searchText = "";
  isChangeLocation = true;
  isActionSort = false;
  arrayTemp: any = [];
  arrayCheckBox: any = [];
  dateFormat = DATE_FOMAT;
  stausChangeValues: string;
  categoryChangeValues: string;
  checkBoxAll: boolean = false;
  defaultImg = DEFAULT_IMG.url;
  visible = false;
  searchValue = '';
  form = new FormGroup({
    searchName: new FormControl('')
  });
  @Input() emptyQueryString:boolean = false;
  constructor(private cmsService: CmsService, private message: NzMessageService, private router: Router, private autService: AuthenticationService) {

  }

  ngOnInit(): void {
    //this.loadDataFromServer(this.pageIndex, this.pageSize);
  }
  onQueryParamsChange(params: NzTableQueryParams, dataStr?: any): void {
    this.searchObject = params;
    const { pageSize, pageIndex, sort, filter } = params;
    this.loadDataFromServer(pageIndex, pageSize);
  }
  loadDataFromServer(pageIndex: number, pageSize: number, searchStr?: string): void {
    this.isRoleUserStudent = localStorage.getItem("role") == '2' ? true : false;
    if(localStorage.getItem("role") == '2' ){
      this.isNoCheckStatus = true;
    }

    this.listOfData = [];
    this.arrayTemp = [];
    const inputArray = [pageIndex, pageSize];
    this.queryForm.pageNo = pageIndex,
      this.queryForm.pageSize = pageSize;
    this.queryForm["isPagging"] = this.isPagging;
    if (!this.isPagging) {
      this.queryForm.pageSize = 10000000;
    }
    if (searchStr) {
      this.queryForm.searchStr = encodeURIComponent(searchStr.trim());
    } else {
      this.queryForm.searchStr = '';
    }
    this.isLoading = true;
    this.listOfData=[];
    if(this.emptyQueryString){
      this.queryForm = {};
    }
    this.cmsService.getAllFreeUrl(this.urlFree, this.queryForm).subscribe((res: any) => {
      this.listOfData = res.data;

      this.setCheckedItem();
      this.arrayTemp = [...this.listOfData];
      this.total = res.totalRecords;
      this.actionDelete = false;
      this.isLoading = false;
    }, ((err: any) => {
      this.message.error(err.errListCode.message);
      this.isLoading = false;
    }));
    
  }

  routerDetail(id: string) {
    if (this.isEmit) {
      this.emitDetail.emit(id);
    } else {
      this.router.navigate([`cms-portal/setting/${this.routerNameDetail}/${id}`]);
    }

  }
  drop(event: any): void {

  }
  saveDrapDrop() {
    this.isChangeLocation = !this.isChangeLocation;

    if (this.isChangeLocation) {
      let compare = _.isEqual(this.arrayTemp, this.listOfData.sort())
      if (!compare) {
        let arraySort = [] as any;
        this.listOfData.forEach((item, index) => {
          item.displayOrder = index + 1;
          item[`${this.sortField}`] = index + 1;
          let obj = {
            id: item.id,
            displayOrder: index + 1
          }
          arraySort.push(obj);
        })
        this.emitChangeLocation.emit(arraySort);
        this.arrayTemp = [...this.listOfData];
      } else {
        this.message.success("Đổi vị trí danh mục bài viết thành công");
      }

    }

  }
  checkedItem(id: string, event: any) {
    if (event) {
      this.arrayCheckBox.push(id);
      this.arrayCheckBox = _.uniq(this.arrayCheckBox);

    } else {
      this.arrayCheckBox = this.arrayCheckBox.filter((x: string) => x != id);
    }
    this.checkBoxAll = this.arrayCheckBox.length == this.listOfData.length;
    this.emitChangeItem.emit(this.arrayCheckBox);
  }
  checkedItemAll(event: any) {

    if (event) {
      this.listOfData.forEach(item => {
        item.checked = true;
        this.arrayCheckBox.push(item.id);
      })
      this.checkBoxAll = true;
      this.arrayCheckBox = _.uniq(this.arrayCheckBox);
    } else {
      this.listOfData.forEach(item => {
        item.checked = false;

      })
      this.checkBoxAll = false;
      this.arrayCheckBox = [];
    }
    this.emitChangeItem.emit(this.arrayCheckBox);
  }
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode == 13) {
      // Your row selection code
      if (!this.searchText) {
        return;
      }
      this.loadDataFromServer(this.pageIndex, this.pageSize, this.searchText);
    }
  }

  updateStatus(data: any) {
    this.emitChangeStatus.emit({ value: data, data: this.arrayCheckBox });
  }
  updateCategory(data: any) {
    this.emitChangeCatgegory.emit({ value: data, data: this.arrayCheckBox });
  }
  detele() {
    this.emitDelete.emit(this.arrayCheckBox);
  }
  outputEmitCategory(id: string, name: string) {
    this.emitChooseCategory.emit(id);

  }
  updateContent(value: string, id: string) {
    if (!this.isEditor) {
      return;
    }
    let encoded = encodeURIComponent(value);
    let dataValue = decodeURIComponent(encoded);
    if (document.getElementById(id)) {
      document.getElementById(id).innerHTML = dataValue;
    }

    return;
  }
  remove(id: string) {
    this.emitDelete.emit([id]);
  }
  uncheck() {
    this.checkBoxAll = false
    this.listOfData.forEach(item => {
      item.checked = false;

    })
    this.arrayCheckBox = [];
  }
  reset(): void {
    this.form.reset();
    this.loadDataFromServer(this.pageIndex, this.pageSize, this.searchText);
  }

  search(): void {
    this.visible = false;
    if (this.isPagging) {
      this.loadDataFromServer(this.pageIndex, this.pageSize, this.searchText);
    } else {
      this.searchText = this.form.controls.searchName.value;
      if (this.searchText) {
        this.listOfData = this.listOfData.filter(x => x.fullName.toLowerCase().includes(this.searchText.toLowerCase()));
      } else {
        this.listOfData = this.arrayTemp;
      }

    }

  }
  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    let change: SimpleChange = changes['actionDelete'];
    if (change) {
      if (change.currentValue) {
        this.arrayCheckBox = [];
        this.checkBoxAll = false;
        this.loadDataFromServer(this.pageIndex, this.pageSize, this.searchText);
      }
    }
  }
  feeModalAction(userId: string) {
    this.feeModal.emit(userId);
  }
  calender(userId:string){
    this.calendarEmit.emit(userId);
  }
  setCheckedItem() {
    if (this.dataSelectedOutSide) {
      this.listOfData.forEach(item => {
        if (this.dataSelectedOutSide.includes(item.id)) {
          item.checked = true;
          this.arrayCheckBox.push(item.id);
        }
      })
      this.checkBoxAll = this.arrayCheckBox.length == this.listOfData.length;
      this.emitChangeItem.emit(this.arrayCheckBox);
    }

  }
}

