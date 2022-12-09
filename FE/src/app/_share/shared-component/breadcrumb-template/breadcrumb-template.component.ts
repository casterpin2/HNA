import { IBreakCrumb } from '../../../_models/shared-component.model';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-breadcrumb-template',
  templateUrl: './breadcrumb-template.component.html',
  styleUrls: ['./breadcrumb-template.component.scss']
})
export class BreadcrumbTemplateComponent implements OnInit  {

 @Input() dataItem  : IBreakCrumb;

  constructor() { 
    console.log()
  }

  ngOnInit(): void {
    this.dataItem = this.dataItem;
    console.log(this.dataItem);
  }

}
