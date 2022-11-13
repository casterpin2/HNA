import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@services/authen.services';
import { CmsService } from '@services/cms.service';
import { MODULE } from '@share/_constant/service-url.constant';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  isError : boolean = false;
  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private csmService: CmsService,
    private authenService: AuthenticationService) { }

  ngOnInit() {

    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });

  }

  submitForm(): void {
    console.log('submit', this.validateForm.value);
    this.isError = false;
    if (this.validateForm.valid) {
      const obj = {
        username: this.validateForm.value.userName,
        password: this.validateForm.value.password,
      }
      this.csmService.postData(obj, MODULE['LOGIN']).subscribe((res:any) => {          
          if(res){
            this.authenService.setToken(res.data, obj.username);            
           // this.authenService.setPermission(res.pagePermissions);            
            location.reload();         
          }          
      }, (err:any) =>{
        console.log(err);
        this.isError = true
      })
    }
    // 
  }
}
