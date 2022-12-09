import { Component, OnInit } from '@angular/core';
import { DATE_TIME_FORMAT } from '@models/constant.model';
import { CmsService } from '@services/cms.service';
import blog from '@share/_constant/data/blog/blog.json';
import blogtags from '@share/_constant/data/blog/blog.json';
@Component({
  selector: 'app-client-news',
  templateUrl: './client-news.component.html',
  styleUrls: ['./client-news.component.scss']
})
export class ClientNewsComponent implements OnInit {
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
    this.service.getAllFreeUrl(`client/news?pageSize=6&pageNo=${pageNo}`).subscribe((res: any) => {
      this.items = res.data;
      this.items.forEach(item => {
        item.tags = item.tag.split(';')
      })
    })
  }
  getRecentPost() {
    this.service.getAllFreeUrl(`client/eventLastNews`).subscribe((res: any) => {
      this.recentItems = res;
    }
    )
  }
  public getBanner(){
    this.service.getAllFreeUrl("client/banner",{type:"NEWS"}).subscribe((res:any)=>{
      this.imgUrl = res.imgUrl;
    })
  }
}
