import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 't-template-content-layout',
  templateUrl: './t-template-content-layout.component.html',
  styleUrls: ['./t-template-content-layout.component.scss']
})
export class TTemplateContentLayoutComponent implements OnInit {
  @Input() isHideBreadcurm : boolean = false;
  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
  }

}
