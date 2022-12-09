import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { AuthenticationService } from '@services/authen.services';
import { HeaderService } from '@services/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[HeaderService]
})
export class AppComponent {
  
  title = 'AminTemp';
  isLogin: boolean;

  constructor(
    private translate: TranslateService,
    private router : Router,
    private authenService: AuthenticationService,
    private service:HeaderService
  ){
    const lang = localStorage.getItem('lang') || 'vn'
    translate.setDefaultLang(lang);
    this.service.setHeader(true);
  
  }

   
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(){
    window.addEventListener("keyup", disableF5);
    window.addEventListener("keydown", disableF5);
  
   function disableF5(e :any) {
      if ((e.which || e.keyCode) == 114) e.preventDefault(); 
   };
 }
}
