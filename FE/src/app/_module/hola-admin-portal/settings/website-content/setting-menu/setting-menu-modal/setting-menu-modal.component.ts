import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TYPE_COLUMNS } from '@models/constant.model';
import { ControlDynamic } from '@models/shared-component.model';
import { CmsService } from '@services/cms.service';

import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-setting-menu-modal',
  templateUrl: './setting-menu-modal.component.html',
  styleUrls: ['./setting-menu-modal.component.scss']
})
export class SettingMenuModalComponent implements OnInit {
  controlArray: ControlDynamic[];
  dataSource: any[] =[];
  @Input() isShowPopup = false;
  @Input() node : any;
  @Output() emitData = new EventEmitter<any>();
  @Input() isUpdate = false;
  typeColumn = TYPE_COLUMNS;
  title:string;
  public form!: FormGroup;
  constructor(private fb: FormBuilder,private service : CmsService) { 
   
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    this.addNew();
    this.controlArray = [
      {
        name: "title",
        type: TYPE_COLUMNS.TEXT,
        label: "Tên",
        order: 0,
        isRequired: true,
        msg: "LESSON.MSG.NAME_EMPTY",
        
        value: 1
      },
      {
        name: "url",
        type: TYPE_COLUMNS.TEXT,
        label: "Url",
        order: 1,
        isRequired: true,
        msg: "LESSON.MSG.EMPTY_NAME"
      },

    ];
    if(!this.isUpdate){
      this.controlArray.unshift( {
        name: "stt",
        type: TYPE_COLUMNS.VIEW,
        label: "Số thứ tự",
        order: 0,
        isRequired: false,
        msg: "LESSON.MSG.NAME_EMPTY",
        value: 1,
        
      })
      this.title ='Tạo mới menu'
    }else{
      this.title = 'Cập nhật menu'
    }
    
    
  }
  addNew() {
    if(this.isUpdate){
      
      this.dataSource.push(this.node);
    }else{
      let object =
      {
        stt: this.dataSource.length + 1,
        title: "",
        url:""
      } as any;
      if(this.node && this.node.children){
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
   
    if(!this.node){
      let object = {
        "menuSettings":this.dataSource
      } as any;
      console.log(this.dataSource);
      this.service.postDataFreeURL(object,"menusetting/bulk").subscribe(res=>{
        this.emitData.emit(false)
      })
    }else{
      let object = {
        "menuSetting":[this.node],
        
      } as any
    
      this.service.putDataFreeUrl(object,"menusetting/bulk").subscribe(res=>{
        this.emitData.emit(false)
      })
    }
   

  }
}
