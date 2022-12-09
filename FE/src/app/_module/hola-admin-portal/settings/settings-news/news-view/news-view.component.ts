import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBreakCrumb } from '@models/shared-component.model';
import { CmsService } from '@services/cms.service';

import { MODULE } from '@share/_constant/service-url.constant';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.scss']
})
export class NewsViewComponent implements OnInit {
  id:string;
  public breadcrumbData: IBreakCrumb;
  constructor(private cmsService : CmsService,   private activatedRoute: ActivatedRoute,private router: Router,) {
   
   }

  ngOnInit() {
    
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getDetail();
  }
  private getDetail(){
    if(!this.id){
      return;
    }
    this.cmsService.getDetail(this.id, MODULE.ARITCLE).subscribe(res => {
 
        this.breadcrumbData = {
          header: res.title,
          bItem: [
            {
              title: 'Cài đặt',
              routerLink: ''
            },
            {
              title: 'Bài viết',
              routerLink: 'cms-portal/setting/news'
            }
          ]
        }
        this.updateContent(res.content);
    });
  }
  updateContent(value: string) {
    let encoded = encodeURIComponent(value);
    let dataValue = decodeURIComponent(encoded);
    if( document.getElementById("item-content")){
      document.getElementById("item-content").innerHTML = dataValue;
    }

    return;
  }
  routeManage() {
    this.router.navigate(['cms-portal/setting/news/crud/'+this.id]);
  }
  routeNews() {
    this.router.navigate(['cms-portal/setting/news']);
  }
}
