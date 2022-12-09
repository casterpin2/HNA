
import { TranslateModule } from '@ngx-translate/core';
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '@services/authen.services';
import { IMenuItem } from '@models/shared-component.model';
import { Router } from '@angular/router';
import { HeaderService } from '@services/header.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [HeaderService]
})

export class HeaderComponent implements OnInit {

  routerToClient = true;
  expandNav = true;
  headerSticky : boolean = false;
  public dataMenu!: Array<IMenuItem>;
  public accName: string;
  public hideHeader: boolean = false;
  constructor(private authenticationService: AuthenticationService,private router : Router,
    private dataService: HeaderService,
    ) {

    // this.accName = this.authenticationService.currentUserValue;
    // this.dataMenu = this.authenticationService.pagePermissions ;
    
    let role = Number(localStorage.getItem("role")) as number;

    // TODO: dummy data menu
    this.dataMenu = [
      {
        title: 'Tài khoản',
        icon: 'dashboard',
        routerLink: 'cms/student',
        isShow: role == 2 ? false : true,
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
      {
        "id": 5,
        "title": "Cài đặt",
        "icon": "setting",
        "routerLink": null,
        "code": "setting",
        isShow:true,
        "children": [
          {
            "id": 19,
            "title": "Hệ thống",
            "icon": "diff",
            "routerLink": "setting/system",
            "code": "system_information",
            isShow:true
          },
          {
            "id": 20,
            "title": "Bài viết",
            "icon": "diff",
            "routerLink": "setting/news",
            "code": "news",
            isShow:true
          },
          {
            "id": 21,
            "title": "Nội dung",
            "icon": "diff",
            "routerLink": "setting/web-content",
            "code": "web_content",
            isShow:true
          }
        ]
      }
    ]
  
  }

  ngOnInit() {
    this.dataService.header.subscribe(item=>{
      this.routerToClient = item;
      console.log(item);
    })
   

  }
  public changeLang(lang: string) {
    localStorage.setItem('lang', lang);
    location.reload();
  }
  
  public handleLogout() {
    this.authenticationService.logout();
    this.router.navigate([`login`]);
  }
  routerEditUser(){
    this.router.navigate([`cms-portal/cms/user/${localStorage.getItem('userId')}`]);
  }
  @HostListener('window:scroll',['$event']) onscroll () {
    if(window.scrollY > 80){
      this.headerSticky = true
    }
    else{
      this.headerSticky = false
    }
  }
  public routerClientPage(){
    this.routerToClient = false;
    this.router.navigate([""]);
  }
  routerItem(item:any){
    this.router.navigate([`cms-portal/`+item.routerLink]);
  }
}
