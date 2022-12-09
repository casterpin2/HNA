import { Component, OnInit } from '@angular/core';
import { CmsService } from '@services/cms.service';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {
  imgUrl :string;
  constructor(private service : CmsService) { }

  ngOnInit(): void {
    this.getBanner();
  }
  public getBanner(){
    this.service.getAllFreeUrl("client/banner",{type:"HOME"}).subscribe((res:any)=>{
      this.imgUrl = res.imgUrl;
    })
  }
}
