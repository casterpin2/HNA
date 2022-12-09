import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TYPE_COLUMNS } from '@models/constant.model';
import { ControlDynamic, ValuesSystem } from '@models/shared-component.model';
import { CmsService } from '@services/cms.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-attendance-user-view',
  templateUrl: './attendance-user-view.component.html',
  styleUrls: ['./attendance-user-view.component.scss']
})
export class AttendanceUserViewComponent implements OnInit {
  controlArray: ControlDynamic[];
  dataSource: any[] = [];
  arrayHeader: any[] = [
    {
      name: "Ngày điểm danh",
      key: "date",
    },
    {
      name: "Điểm danh",
      key: "price",
    }
  ]

  public urlFree: string;
  arrayValues: ValuesSystem[] = [
    {
      name: "date",
      type: "Date",
    },
    {
      name: "isPresent",
      type: "Boolean",
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
  constructor(private fb: FormBuilder, private service: CmsService, private message: NzMessageService, private activatedRoute: ActivatedRoute) {

  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  async ngOnInit() {

    this.title = 'Thông tin điểm danh'
    this.getAllFee();
    this.render = true;
  }


  cancelPopup() {
    this.emitData.emit(false)
  }
  getAllFee() {
    this.urlFree =`class/attendence/user/${this.userId}/${this.activatedRoute.snapshot.params['id']}`;

  }
 

}

