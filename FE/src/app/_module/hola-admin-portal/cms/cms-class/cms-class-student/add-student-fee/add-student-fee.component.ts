import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TYPE_COLUMNS } from '@models/constant.model';
import { ControlDynamic, ValuesSystem } from '@models/shared-component.model';
import { CmsService } from '@services/cms.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-student-fee',
  templateUrl: './add-student-fee.component.html',
  styleUrls: ['./add-student-fee.component.scss']
})
export class AddStudentFeeComponent implements OnInit {
  controlArray: ControlDynamic[];
  dataSource: any[] = [];
  arrayHeader: any[] = [
    {
      name: "Học phí",
      key: "name",
    },
    {
      name: "Giá",
      key: "price",
    }
  ]

  public urlFree: string;
  arrayValues: ValuesSystem[] = [
    {
      name: "name",
      type: "Text",
    },
    {
      name: "price",
      type: "Number",
    }
  ]
  @Input() isShowPopup = false;
  @Input() node: any;
  @Output() emitData = new EventEmitter<any>();
  @Input() isUpdate = false;
  @Input() userId: string;
  typeColumn = TYPE_COLUMNS;
  title: string;
  feeSaveData: string;
  public form!: FormGroup;
  public feeData: any[] = [];
  render = false;
  hideFooter = false;
  constructor(private fb: FormBuilder, private service: CmsService, private message: NzMessageService, private activatedRoute: ActivatedRoute) {

  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  async ngOnInit() {
    this.render = false;
    await this.getFeeByUser();
    this.controlArray = [
      {
        name: "name",
        type: TYPE_COLUMNS.TEXT,
        label: "Tên",
        order: 0,
        isRequired: false,
        msg: "LESSON.MSG.NAME_EMPTY",

        value: 1
      },
      {
        name: "price",
        type: TYPE_COLUMNS.NUMBER,
        label: "Giá",
        order: 1,
        isRequired: false,
        msg: "LESSON.MSG.EMPTY_NAME"
      },
      {
        name: "paid",
        type: TYPE_COLUMNS.CHECKBOX,
        label: "Đóng tiền",
        order: 1,
        isRequired: true,
        msg: "LESSON.MSG.EMPTY_NAME"
      },
    ];
    this.title = 'Học phí'
    this.getAllFee();
    this.hideFooter = localStorage.getItem('role') === "2" ? true : false;
    this.render = true;
  }


  cancelPopup() {
    this.emitData.emit(false)
  }
  handleOk() {
  
    const postData = this.feeData;
    if (this.feeSaveData && this.feeSaveData.length) {
      this.service.putDataFreeUrl(postData, "users/userFee/"+this.userId).subscribe(res => {
        this.message.success("Thêm học phí thành công");
        this.emitData.emit(false)
      })
    } else {
      this.service.postDataFreeURL(postData, "users/userFee/"+this.userId).subscribe(res => {
        this.message.success("Thêm học phí thành công");
        this.emitData.emit(false)
      })
    }



  }
  deleteCourse(index: number) {
    this.dataSource.splice(index, 1);
  }
  getAllFee() {
    let isStudent = localStorage.getItem('role') == "2" ? true : false;
    this.urlFree = isStudent ? 'class/userFeeByRoleData/'+this.userId : `class/class-fee/${this.activatedRoute.snapshot.params['id']}`;

  }
  getUserSelected(feeId: string[]) {
    this.feeData = feeId;
  }
  async getFeeByUser() {
    let res = await this.service.getAllFreeUrl('users/userFee/' + this.userId).toPromise() as any;
    this.feeSaveData = res;
  }
}
