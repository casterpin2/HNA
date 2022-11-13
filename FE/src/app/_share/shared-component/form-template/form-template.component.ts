import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { TYPE_COLUMNS } from '@models/constant.model';
import { ControlDynamic } from '@models/shared-component.model';
import { NzUploadFile } from 'ng-zorro-antd/upload';


@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss']
})
export class FormTemplateComponent implements OnInit {
  @Input() formItem!: ControlDynamic;
  @Input() multipleFile :boolean = false;
  @Output() returnOutData = new  EventEmitter<any>();
  
  form!: FormGroup;
  typeColumn = TYPE_COLUMNS;
  fileList: NzUploadFile[] = [];
  fileOne:NzUploadFile;
  maxValue = Number.MAX_VALUE;
  constructor(private rootFormGroup: FormGroupDirective,
    private http: HttpClient) {
    this.form = this.rootFormGroup.control
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {

  }
  beforeUpload = (file: NzUploadFile): boolean => {
    if(this.multipleFile){
      this.fileList = this.fileList.concat(file);
    }else{
      this.fileList = [file];
    }
    
    //this.form.controls[this.formItem.name].setValue(this.fileList);
    this.returnOutData.emit(this.fileList);
    return false;
  };
  handleChange(data:any,formItem :ControlDynamic){
    this.form.controls[formItem.name].setValue(data);
  }

  emitValue(formItem :ControlDynamic){
    this.returnOutData.emit({name:formItem.name,value:this.form.controls[formItem.name].value})
  }
}
