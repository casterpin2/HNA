import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CmsService } from '@services/cms.service';
import { FormHelper } from '@share/_helper/form-helper';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admissions',
  templateUrl: './admissions.component.html',
  styleUrls: ['./admissions.component.scss']
})
export class AdmissionsComponent implements OnInit {

  constructor(private formbuild: FormBuilder, private service: CmsService, private message: NzMessageService,private router: Router,) { }
  contactForm: FormGroup = this.formbuild.group({
    fullname: ['', Validators.required],
    phoneno: ['', Validators.required],
    email: ['', Validators.required],
    message: ['', Validators.required],
  });
  onSubmit() {
    if (!this.contactForm.valid) {
      FormHelper.markDirty(this.contactForm);

      return;
    }
    this.service.postDataFreeURL(this.contactForm.getRawValue(), "client/addmision").subscribe(res => {
      this.message.success("Gửi yêu cầu đăng ký thành công!!!");
      this.contactForm.reset();
    })
  }

  ngOnInit(): void {
  }
}
