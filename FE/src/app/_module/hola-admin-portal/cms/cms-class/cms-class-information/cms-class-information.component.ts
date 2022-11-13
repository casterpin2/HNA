import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/authen.services';

@Component({
  selector: 'app-cms-class-information',
  templateUrl: './cms-class-information.component.html',
  styleUrls: ['./cms-class-information.component.scss']
})
export class CmsClassInformationComponent implements OnInit {
  tabIndex = 0;
  
  constructor(private autService: AuthenticationService) { }

  ngOnInit(): void {
    
  }
  selectChange(data:any){
    this.tabIndex = data.index;
  }

}
