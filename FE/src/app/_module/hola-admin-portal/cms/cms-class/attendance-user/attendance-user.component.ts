import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DATE_FOMAT, DEFAULT_IMG } from '@models/constant.model';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { takeUntil } from 'rxjs/operators';
import { CmsService } from 'src/app/_services/cms.service';

@Component({
  selector: 'app-attendance-user',
  templateUrl: './attendance-user.component.html',
  styleUrls: ['./attendance-user.component.scss']
})
export class AttendanceUserComponent implements OnInit {
  isCreated = false;
  isUpdated = false;
  attendenceId :string ;
  isStudentRole =false;
  constructor(private messageService: NzMessageService,
    private cmsService: CmsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    if(localStorage.getItem("role") == "2"){
      this.isStudentRole = true;
    }
  }
  attendence() {
    this.isCreated = true;
    this.isUpdated = false;
  }
  getEventUpdate(attendenceId:string){
    this.attendenceId = attendenceId;
    this.isUpdated = false;
    this.isCreated = true;
  }
  getEventDone(){
    this.isCreated = false;
    this.isUpdated = false;
  }
}
