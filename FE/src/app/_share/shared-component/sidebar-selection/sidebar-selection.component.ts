import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TRadioDataSourceModel } from 'src/app/_models/shared-component.model';

@Component({
  selector: 'sidebar-selection',
  templateUrl: './sidebar-selection.component.html',
  styleUrls: ['./sidebar-selection.component.scss']
})
export class SidebarSelectionComponent implements OnInit {

  @Input() sbModel: any = [];

  @Input() allowAdd: boolean = false;
  @Input() allowEdit: boolean = false;
  @Input() disabled: boolean = false;
  @Input() defaultPadding: boolean = false;
  @Input() icon: string = '';
  @Input() title: string = '';
  @Output() sbModelChange: EventEmitter<any> = new EventEmitter();
  @Output() addClick: EventEmitter<any> = new EventEmitter();
  @Output() editClick: EventEmitter<any> = new EventEmitter();
  @Input() DataSource: TRadioDataSourceModel[] = [];

  constructor() { }
  searchValue = '';
  ngOnInit(): void {
  }

  onSearch(event: any) {

  }

  itemClick(item: any){
    this.sbModelChange.emit(item.value);
  }

  onAddClick() {
    this.addClick.emit('');
  }

  onEditClick(item: any) {
    this.editClick.emit(item);
    ''.includes
  }

}
