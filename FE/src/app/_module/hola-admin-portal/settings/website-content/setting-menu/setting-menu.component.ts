
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NodeMenuItem } from '@models/shared-component.model';
import { CmsService } from '@services/cms.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-setting-menu',
  templateUrl: './setting-menu.component.html',
  styleUrls: ['./setting-menu.component.scss']
})
export class SettingMenuComponent  implements OnInit {
  isChangeLocation = true;
  nodes : NodeMenuItem[] = []
  itemPost : NodeMenuItem;
  addNew : boolean = false;
  update : boolean = false;
  constructor(private service : CmsService,   private message: NzMessageService,private cdr: ChangeDetectorRef) { 
  
  }
  
 
  ngOnInit(): void {
    console.log(1);
    this.getData();
  }

 
  toggle(data:any){
    data.isExpanded = !data.isExpanded;
    console.log(data);
  }
  getData(){
    this.service.getAllFreeUrl("menusetting").subscribe((res:any)=>{
      this.nodes = res.data;
    })
  }
  
  addNode(item?:any){
    if(item){
      this.itemPost = item;
    } else {
      this.itemPost = null;
    }
    this.addNew = true;

  }
  updateNode(item:any){
    this.itemPost = item;
    this.addNew = true;
    this.update = true;
  }
  getEventEmit(data:any){
    this.itemPost = new NodeMenuItem();
    this.addNew = false;
    this.update = false;
    this.getData();
  }
  saveDrapDrop(){
    this.isChangeLocation =!this.isChangeLocation;
    if(this.isChangeLocation){
      this.nodes = this.getPriority(this.nodes);
      this.service.putDataFreeUrl(this.nodes,'menusetting/menusetting-priorities').subscribe(res=>{
        this.message.success("Thay đổi vị trí thành công");
      })
    }
  }
  getPriority( dataSource: any[]) {

    dataSource.forEach((item:any,index:number) => {
      item.priority = index + 1;
      if (item.children) {
        item.children = this.getPriority(item.children);
      }
   
    })
    return dataSource;
  }
  delete(item:any){
    this.service.deleteFreeUrl('menusetting/'+item.id).subscribe(res=>{
      this.message.success("Xóa thành công");
      this.getData();
    })
  }
}
