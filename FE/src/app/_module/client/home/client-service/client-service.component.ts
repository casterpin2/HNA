import { Component, AfterContentInit,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DATE_TIME_FORMAT } from '@models/constant.model';
import { CmsService } from '@services/cms.service';
import service from '@share/_constant/data/companyfeat.json';


@Component({
  selector: 'app-client-service',
  templateUrl: './client-service.component.html',
  styleUrls: ['./client-service.component.scss']
})
export class ClientServiceComponent implements OnInit {
  page: number = 1;
  render= false;
  public items:any[] = [];
  dateFormat = DATE_TIME_FORMAT
  constructor(private service : CmsService) { }

  ngOnInit(): void {
    this.pagging(1);
  }
  pagging(pageNo:Number){
    this.service.getAllFreeUrl(`client/eventLastNews`).subscribe((res:any)=>{
      this.items = res;
      this.items.forEach(item=>{
        item.tags = item.tag.split(';')
      })
      this.render = true;
    })

  }
}

