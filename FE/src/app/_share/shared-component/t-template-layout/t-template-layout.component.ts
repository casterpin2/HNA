import { Component, ContentChild, ElementRef, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 't-template-layout',
  templateUrl: './t-template-layout.component.html',
  styleUrls: ['./t-template-layout.component.scss']
})
export class TTemplateLayoutComponent implements OnInit {
  isCollapsed = false;
  constructor() { 
  }

  ngOnInit(): void {
  }

}
