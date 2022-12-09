import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-website-content',
  templateUrl: './website-content.component.html',
  styleUrls: ['./website-content.component.scss']
})
export class WebsiteContentComponent implements OnInit {
  tabIndex = 0;
  
  constructor() { }

  ngOnInit(): void {
    
  }
  selectChange(data:any){
    this.tabIndex = data.index;
  }
 
}
