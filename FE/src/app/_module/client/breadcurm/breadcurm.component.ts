import { Component, Input, OnInit } from '@angular/core';
import { CmsService } from '@services/cms.service';

@Component({
  selector: 'app-breadcurm',
  templateUrl: './breadcurm.component.html',
  styleUrls: ['./breadcurm.component.scss']
})
export class BreadcurmComponent implements OnInit {
  @Input() imgUrl:string;
  constructor() { }

  ngOnInit(): void {
  }
  
}
