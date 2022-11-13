import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'sidebar-checkbox',
  templateUrl: './sidebar-checkbox.component.html',
  styleUrls: ['./sidebar-checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarCheckboxComponent implements OnInit {

  @Input() sbModel: any = [];
  @Input() disabled: boolean = false;
  @Input() defaultPadding: boolean = false;
  @Input() icon: string = '';
  @Input() title: string = '';
  @Output() sbModelChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  outData (event: any) {
    this.sbModelChange.emit(event);
  }
}
