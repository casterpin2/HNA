import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/authen.services';

@Component({
  selector: 'app-cms-class-information',
  templateUrl: './cms-class-information.component.html',
  styleUrls: ['./cms-class-information.component.scss']
})
export class CmsClassInformationComponent implements OnInit {
  tabIndex = 0;
  isStudentRole = false;
  constructor(private autService: AuthenticationService) { }

  ngOnInit(): void {
    if(localStorage.getItem("role") === "2"){
      this.isStudentRole = true;
    }
  }
  selectChange(data:any){
    this.tabIndex = data.index;
  }

}
