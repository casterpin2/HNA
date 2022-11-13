
import { TranslateModule } from '@ngx-translate/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '@services/authen.services';
import { IMenuItem } from '@models/shared-component.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {


  expandNav = true;

  public dataMenu!: Array<IMenuItem>;
  public accName: string;
  constructor(private authenticationService: AuthenticationService) {

    // this.accName = this.authenticationService.currentUserValue;
    // this.dataMenu = this.authenticationService.pagePermissions ;
    
    
    // TODO: dummy data menu
    this.dataMenu = [
      {
        title: 'Tài khoản',
        icon: 'dashboard',
        routerLink: 'cms/student',
        isShow: true,
        children: [
         
        ]
      },
      {
        title: 'Lớp học',
        icon: 'dashboard',
        routerLink: 'cms/class',
        isShow: true,
        children: [
         
        ]
      },

    ]
  
  }

  ngOnInit() {

    return true;

  }
  public changeLang(lang: string) {
    localStorage.setItem('lang', lang);
    location.reload();
  }
  
  public handleLogout() {
    this.authenticationService.logout();
  }
}
