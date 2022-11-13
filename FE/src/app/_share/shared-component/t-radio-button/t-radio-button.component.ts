import { Component, Input, OnInit, Output,EventEmitter, ViewEncapsulation } from '@angular/core';
import { TRadioDataSourceModel } from 'src/app/_models/shared-component.model';

@Component({
  selector: 't-radio-button',
  templateUrl: './t-radio-button.component.html',
  styleUrls: ['./t-radio-button.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class TRadioButtonComponent implements OnInit {

  @Input() ngModel: any = [];
  @Input() disabled: boolean = false;
  @Input() defaultPadding: boolean = false;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  @Input() DataSource: TRadioDataSourceModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  outData (event: any) {
    this.ngModelChange.emit(event);
  }

}
