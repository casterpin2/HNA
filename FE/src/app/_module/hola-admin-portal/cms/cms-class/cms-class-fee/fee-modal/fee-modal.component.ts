import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TYPE_COLUMNS } from '@models/constant.model';
import { ControlDynamic } from '@models/shared-component.model';
import { CmsService } from '@services/cms.service';
import { NzMessageService } from 'ng-zorro-antd/message';

import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-fee-modal',
  templateUrl: './fee-modal.component.html',
  styleUrls: ['./fee-modal.component.scss']
})
export class FeeModalComponent implements OnInit {
  controlArray: ControlDynamic[];
  dataSource: any[] = [];
  @Input() isShowPopup = false;
  @Input() node: any;
  @Output() emitData = new EventEmitter<any>();
  @Input() isUpdate = false;
  typeColumn = TYPE_COLUMNS;
  title: string;
  public form!: FormGroup;
  roleStudent : boolean = false;
  constructor(private fb: FormBuilder, private service: CmsService, private message: NzMessageService, private activatedRoute: ActivatedRoute) {

  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    this.roleStudent = localStorage.getItem("role") == "2"?true:false;
    this.addNew();
    this.controlArray = [
      {
        name: "name",
        type: TYPE_COLUMNS.TEXT,
        label: "Tên",
        order: 0,
        isRequired: true,
        msg: "LESSON.MSG.NAME_EMPTY",

        value: 1
      },
      {
        name: "price",
        type: TYPE_COLUMNS.NUMBER,
        label: "Giá",
        order: 1,
        isRequired: true,
        msg: "LESSON.MSG.EMPTY_NAME"
      },

    ];
    if (!this.isUpdate) {

      this.title = 'Tạo mới học phí'
    } else {
      this.title = 'Cập nhật menu'
    }


  }
  addNew() {
    if (this.isUpdate) {

      this.dataSource.push(this.node);
    } else {
      let object =
        {
          stt: this.dataSource.length + 1,
          title: "",
          url: ""
        } as any;
      if (this.node && this.node.children) {
        this.node.children.push(object);
      }
      this.dataSource.push(object);
    }


  }
  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue) {
      return false;
    }
    return startValue.getTime() < new Date().getTime();
  };
  cancelPopup() {
    this.emitData.emit(false)
  }
  handleOk() {
    if (this.dataSource.length === 0) {
      this.message.warning("Phải có ít nhất một học phí");
      return;
    }
    console.log(this.dataSource);
    const postData = {
      fee: this.dataSource,
      classId: this.activatedRoute.snapshot.params['id'],
    }
    this.service.postDataFreeURL(postData, "class/class-fee").subscribe(res => {
      this.message.success("Tạo học phí thành công");
      this.emitData.emit(false)
    })
    // if(!this.node){
    //   let object = {
    //     "menuSettings":this.dataSource
    //   } as any;
    //   this.service.postDataFreeURL(object,"menusetting/bulk").subscribe(res=>{
    //     this.emitData.emit(false)
    //   })
    // }else{
    //   let object = {
    //     "menuSetting":[this.node],

    //   } as any

    //   this.service.putDataFreeUrl(object,"menusetting/bulk").subscribe(res=>{
    //     this.emitData.emit(false)
    //   })
    // }


  }
  deleteCourse(index: number) {
    this.dataSource.splice(index, 1);
  }
}
