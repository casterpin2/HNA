import { Component,  Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CmsService } from '@services/cms.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admissions-manage-view',
  templateUrl: './admissions-manage-view.component.html',
  styleUrls: ['./admissions-manage-view.component.scss']
})
export class AdmissionsManageViewComponent implements OnInit {
  @Input() id : string;
  @Output() eventClose = new EventEmitter<any>();
  constructor(private formbuild: FormBuilder, private service: CmsService, private message: NzMessageService,private router: Router,) { }
  contactForm: FormGroup = this.formbuild.group({
    fullname: ['', Validators.required],
    phoneno: ['', Validators.required],
    email: ['', Validators.required],
    message: ['', Validators.required],
  });
  ngOnInit(): void {
    this.service.getAllFreeUrl('client/addmision/'+this.id).subscribe(res=>{
      this.contactForm.patchValue(res);
    })
  }
 
  routerClose(){
    this.eventClose.emit(true);
  }
}
