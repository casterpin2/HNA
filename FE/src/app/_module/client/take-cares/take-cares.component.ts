import { Component, OnInit } from '@angular/core';
import { DATE_TIME_FORMAT } from '@models/constant.model';
import { CmsService } from '@services/cms.service';

@Component({
  selector: 'app-take-cares',
  templateUrl: './take-cares.component.html',
  styleUrls: ['./take-cares.component.scss']
})
export class TakeCaresComponent implements OnInit {
  page: number = 1;
  public items: any[] = [];
  dateFormat = DATE_TIME_FORMAT;
  recentItems: any[] = [];
  imgUrl:string;
  constructor(private service: CmsService) { }

  ngOnInit(): void {
    this.pagging(1);
    this.getRecentPost();
    this.getBanner();
  }
  pagging(pageNo: Number) {
    this.service.getAllFreeUrl(`client/take_care?pageSize=6&pageNo=${pageNo}`).subscribe((res: any) => {
      this.items = res.data;
      this.items.forEach(item => {
        item.tags = item.tag.split(';')
      })
    })
  }
  getRecentPost() {
    this.service.getAllFreeUrl(`client/take_care_last`).subscribe((res: any) => {
      this.recentItems = res;
    }
    )
  }
  public getBanner(){
    this.service.getAllFreeUrl("client/banner",{type:"TAKE_CAKE"}).subscribe((res:any)=>{
      this.imgUrl = res.imgUrl;
    })
  }
}
