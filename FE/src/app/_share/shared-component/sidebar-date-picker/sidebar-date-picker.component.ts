import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TSidebarDatePickerSourceModel } from 'src/app/_models/shared-component.model';
const defaultAllTimeValue ={
  label: 'Toàn thời gian',
  value: 'All'
}

@Component({
  selector: 'sidebar-date-picker',
  templateUrl: './sidebar-date-picker.component.html',
  styleUrls: ['./sidebar-date-picker.component.scss']
})
export class SidebarDatePickerComponent implements OnInit {
  
  @Input() DataSource: TSidebarDatePickerSourceModel = {};
  @Output() onChangeDate: EventEmitter<any> = new EventEmitter();
  @Input() type = 0;
  @Input() icon: string = '';
  @Input() title: string = '';

  typeValue = '0';
  dialogAllTimeShow = false;
  allTimeSelectedObj =  {
    ...defaultAllTimeValue,
  }
  date:any = null;

  constructor() { }

  ngOnInit(): void {
    // setting default to All
    if(this.DataSource && this.DataSource.allTimeGroup && this.DataSource.allTimeGroup.length) {
      // last item of group
      const lastItem = this.DataSource.allTimeGroup[this.DataSource.allTimeGroup.length -1];
      // last item of subgroup
      if(lastItem && lastItem.subGroup) {
        lastItem.subGroup.push(this.allTimeSelectedObj)
        this.onChangeDate.emit(this.allTimeSelectedObj.value);
      }
    }
  }
  typeChange(value: any) {
    this.allTimeSelectedObj =  {
      ...defaultAllTimeValue,
    }
    if(value == '0') {
      this.date = null;
      this.onChangeDate.emit(this.allTimeSelectedObj.value);
    } else {
      this.date = [
        new Date(),
        new Date(),
      ];
    }
  }
  dateRangeChange(event: any) {
    this.onChangeDate.emit(event);
  }

  allTimeSelected(subGroup: any) {
    this.dialogAllTimeShow = false;
    this.allTimeSelectedObj = subGroup;
    this.onChangeDate.emit(subGroup.value);
  }

}
