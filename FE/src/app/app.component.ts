import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { AuthenticationService } from '@services/authen.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'AminTemp';
  isLogin: boolean;

  constructor(
    private translate: TranslateService,
    private router : Router,
    private authenService: AuthenticationService
  ){
    const lang = localStorage.getItem('lang') || 'vn'
    translate.setDefaultLang(lang);

    this.isLogin = this.authenService.currentUserValue ? true : false;    
    if(!this.isLogin){
      this.router.navigate(['/login']);
    }else{      
      if(location.pathname == '/login'){
        this.router.navigate(['hola-portal']); 
      }      
    }
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
