import { TestService } from '../../../_services/test.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TRadioDataSourceModel, TSidebarDatePickerSourceModel } from 'src/app/_models/shared-component.model';
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormHelper } from 'src/app/_share/_helper/form-helper';
import { HeaderService } from '@services/header.service';
import { AuthenticationService } from '@services/authen.services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[HeaderService]
})
export class DashboardComponent implements OnInit {
  
  //#endregion
  isLogin :boolean;
  constructor(
    private service : HeaderService,
    private authenService: AuthenticationService,
    private router : Router,
  ) { }
  ngOnInit(): void {
   
    this.isLogin = this.authenService.currentUserValue ? true : false;    
    if(!this.isLogin){
      this.router.navigate(['/login']);
    }else{      
      if(location.pathname == '/login'){
        this.router.navigate(['cms-portal']); 
      }      
    }
  }

  //#region demo form
 
}

