import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
// import * as EventEmitter from 'events';

@Component({
  selector: 't-check-box',
  templateUrl: './t-check-box.component.html',
  styleUrls: ['./t-check-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TCheckBoxComponent implements OnInit {
  @Input() sbModel: any = [];
  @Input() disabled: boolean = false;
  @Input() defaultPadding: boolean = false;
  @Output() sbModelChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  outData ($event: any) {
    this.sbModelChange.emit($event);
  }

}
