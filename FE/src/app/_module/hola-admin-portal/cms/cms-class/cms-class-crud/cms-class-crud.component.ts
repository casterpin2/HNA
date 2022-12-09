import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TYPE_COLUMNS } from '@models/constant.model';
import { ControlDynamic } from '@models/shared-component.model';
import { CmsService } from '@services/cms.service';
import { MODULE } from '@share/_constant/service-url.constant';
import { FormHelper } from '@share/_helper/form-helper';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-cms-class-crud',
  templateUrl: './cms-class-crud.component.html',
  styleUrls: ['./cms-class-crud.component.scss']
})
export class CmsClassCrudComponent implements OnInit {
  controlArray: ControlDynamic[];
  dataSource: any[];
  typeColumn = TYPE_COLUMNS;
  @Input() classId: string;
  @Input() visibleForm: boolean = false;
  @Output() closeModal = new EventEmitter<any>();
  teacherAccounts: any[] = [];
  studentAccounts: any[] = [];
  isRender = false;
  isUpdate = false;
  public form = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    startDate: this.fb.control(new Date(), [Validators.required]),
    endDate: this.fb.control('', [Validators.required]),
    teacherId: this.fb.control('',[Validators.required]),
    studentId: this.fb.control([]),
  })

  constructor(private fb: FormBuilder,
    private cmsService: CmsService,
    private message: NzMessageService) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    this.init();
    this.isRender = true;
  }
  async init() {
    await this.getUserByRole(3);
    this.getDetail();
  }
  public submitForm() {
    if (this.form.invalid) {
      FormHelper.markGroupDirty(this.form);
      return;
    }

    let postData = this.form.getRawValue();
    if (this.isUpdate) {
      postData.id = this.classId;
      this.cmsService.updateFreeUrl(`class/${this.classId}`, postData).subscribe(res => {
        this.message.success('Cập nhật lớp học thành công');
        this.visibleModal();
      },(err:any)=>{
        if(err.status == 409 || err.status === 400 || err.status == 404){
          this.message.error(err.errListCode);
        }else{
          this.message.error('Cập nhật lớp học không thành công');
        }
      })
    } else {
      this.cmsService.create(postData, MODULE.CLASS).subscribe(res => {
        this.message.success('Tạo mới lớp học thành công');
        this.visibleModal();
      },(err:any)=>{
        if(err.status == 409 || err.status === 400 || err.status == 404){
          this.message.error(err.errListCode);
        }else{
          this.message.error('Tạo mới lớp học không thành công');
        }
      })
    }

  }
  public async getUserByRole(role: number) {
    const res = await this.cmsService.getAllFreeUrl('users/teacher').toPromise() as any;
    this.teacherAccounts = res;


  }

  public visibleModal() {
    this.visibleForm = false;
    this.form.reset();
    this.closeModal.emit();
  }
  getDetail() {

    if (!this.classId) {
      return;
    }

    this.isUpdate = true;
    let url = `class/${this.classId}`
    this.cmsService
      .getAllFreeUrl(url)
      .subscribe(
        (res: any) => {
          this.form.patchValue(res);
          //console.log(this.accountForm);
        },
        (err: any) => {
          console.log(err);
        }
      );
  }
}
