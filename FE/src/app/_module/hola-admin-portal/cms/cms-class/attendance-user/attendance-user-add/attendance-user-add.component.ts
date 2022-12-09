import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DATE_FOMAT, DEFAULT_IMG } from '@models/constant.model';
import { CmsService } from '@services/cms.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import * as moment from 'moment';
@Component({
  selector: 'app-attendance-user-add',
  templateUrl: './attendance-user-add.component.html',
  styleUrls: ['./attendance-user-add.component.scss']
})
export class AttendanceUserAddComponent implements OnInit {
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
    pageNo: 1,
    pageSize: 10,
    language: '',
  } as any;

  defaultImg = DEFAULT_IMG.url;
  searchValue = '';
  visible = false;

  searchObject: any;
  selectedValue: string = ''
  dateFormat = DATE_FOMAT;
  classId: string;
  isShowCreate: boolean = true;
  isShowUpdate: boolean = true;
  isShowDelete: boolean = true;
  visibleForm = false;
  hideBtn = false;
  urlFree: string = "";
  dataSource: any[] = [
    {
      id: true,
      name: "Có mặt"
    },
    {
      id: false,
      name: "Không có mặt"
    }
  ]
  dateValue: Date = new Date();
  @Output() eventDone = new EventEmitter<any>();
  @Input() attendenceId: string;
  disableDate = false;

  callApi = false;
  dataDetail: any[] = [];
  constructor(private messageService: NzMessageService,
    private cmsService: CmsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    this.callApi = false;
    const idGetParams = this.activatedRoute.snapshot.params['id'];
    this.classId = idGetParams;
    this.urlFree = 'users/getStudentOfClass/' + idGetParams;
    this.disableDate = this.attendenceId ? true : false;
    if (this.attendenceId) {
      this.cmsService.getAllFreeUrl(`class/attendence/student/${idGetParams}`).subscribe((res: any) => {
        this.dataDetail = res;
        if(this.dataDetail && this.dataDetail.length){
          this.dateValue = this.dataDetail[0].date;
    
        }
     
        this.callApi = true;
      })
    } else{
      this.callApi = true;
    }
  }
  loadDataFromServer(): void {
    this.loading = true;
    const postData = {
      "pageNo": 1,
      "pageSize": 1000000,
      "isPagging": true
    }
    this.cmsService.getAllFreeUrl(this.urlFree, postData).subscribe((res: any) => {
      this.listOfCourse = res.data;
      let object = this.listOfCourse[0];
      let userId = this.dataDetail.map(x => x.userId);
      
      this.listOfCourse.forEach(item => {
        
        let objectFind = this.dataDetail.find(x=>x.userId == item.id);
        if(objectFind){
          item.isPresent = objectFind.isPresent  == 1 ? true : false;
        } else{
          item.isPresent = false;
        }
      
        if (userId.includes(item.id)) {
          item["isOldUser"] = true;
          item["isAddNew"] = false;
        } else {
          item["isOldUser"] = false;
          item["isAddNew"] = true;
        }
        item.isUpdated =false;
      })
      this.loading = false;
    });
  }
  onQueryParamsChange(params: NzTableQueryParams, dataStr?: any): void {

    this.loadDataFromServer();
  }

  addUser() {

    let postData = {
      attendence: [],
      classId: this.classId
    } as any;
    this.listOfCourse.forEach(item => {
      postData.attendence.push({
        userId: item.id,
        isPresent: item.isPresent,
        date: new Date(moment(this.dateValue).format("yyyy-MM-DD")),
        isAddNew:item.isAddNew,
        isUpdated:item.isUpdated,
        classId:this.classId
      })
    })
    
    if (this.attendenceId) {
      this.cmsService.putDataFreeUrl(postData, `class/attendence/${this.classId}`).subscribe(res => {
        this.messageService.success("Tạo mới điểm danh thành công");
        this.eventDone.emit(true);
      })

    } else {
      this.cmsService.postDataFreeURL(postData, `class/attendence/${this.classId}`).subscribe(res => {
        this.messageService.success("Tạo mới điểm danh thành công");
        this.eventDone.emit(true);
      })

    }
   

  }


  viewClass(item: any) {
    this.router.navigate(['cms-portal/cms/class/student/' + item.id]);


  }


  search(): void {
    this.visible = false;
    this.loadDataFromServer();

  }



  closeModal() {
    this.eventDone.emit(true);
  }

  changeData(item: any) {

    if (item["isOldUser"]) {
      item.isUpdated = true;
    } 
  }

}


