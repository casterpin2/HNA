import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TRadioDataSourceModel } from 'src/app/_models/shared-component.model';

@Component({
  selector: 'sidebar-radio',
  templateUrl: './sidebar-radio.component.html',
  styleUrls: ['./sidebar-radio.component.scss']
})
export class SidebarRadioComponent implements OnInit {  
  @Input() sbModel: any = [];
  @Input() disabled: boolean = false;
  @Input() defaultPadding: boolean = false;
  @Input() icon: string = '';
  @Input() title: string = '';
  @Output() sbModelChange: EventEmitter<any> = new EventEmitter();
  @Input() DataSource: TRadioDataSourceModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  outData (event: any) {
    this.sbModelChange.emit(event);
  }
}
