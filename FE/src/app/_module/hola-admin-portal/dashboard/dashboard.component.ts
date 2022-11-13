import { TestService } from '../../../_services/test.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TRadioDataSourceModel, TSidebarDatePickerSourceModel } from 'src/app/_models/shared-component.model';
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormHelper } from 'src/app/_share/_helper/form-helper';

const demoUser = {
  name: {
    first: 'hello',
    last: 'last',
    title: 'guy'
  },
  email: 'hello@gmail.com',
  gender: 'female'
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  sourceCkBox = [
    { label: 'Apple', value: 'Apple', checked: true, disabled: true },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' }
  ];
  sourceRadio: TRadioDataSourceModel[] = [
    { label: 'Apple', value: 'Apple', disabled: true },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' }
  ]

  selectionSource = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' }
  ]

  allTimeSource: TSidebarDatePickerSourceModel = {
    allTimeGroup: [
      {
        label: 'Group 1',
        subGroup: [
          {
            label: 'item 1',
            value: [new Date(), new Date()]
          },
          {
            label: 'item 2',
            value: [new Date(), new Date()]
          },
          {
            label: 'item 3',
            value: [new Date(), new Date()]
          },
        ]
      },

      {
        label: 'Group 2',
        subGroup: [
          {
            label: 'item 1',
            value: [new Date(), new Date()]
          },
          {
            label: 'item 2',
            value: [new Date(), new Date()]
          },
          {
            label: 'item 3',
            value: [new Date(), new Date()]
          },
        ]
      },
      {
        label: 'Group 3',
        subGroup: [
          {
            label: 'item 1',
            value: [new Date(), new Date()]
          },
          {
            label: 'item 2',
            value: [new Date(), new Date()]
          },
        ]
      }
    ]
  }

  selectionValue: any = null;
  visibleForm = false;
  radioValue: any = null;
  checked = true;
  date: any;
  testIdx = 0;

  //#region  demo table
  total = 1;
  listOfRandomUser: RandomUser[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  filterGender = [
    { text: "male", value: "male" },
    { text: "female", value: "female" }
  ];
  //#endregion

  constructor(
    private messageService: NzMessageService,
    private testService: TestService,
    private fb: FormBuilder,
  ) { }

  //#region demo form
  public form = this.fb.group({
    name: this.fb.group({
      first: this.fb.control('', [Validators.required]),
      last: this.fb.control('', [Validators.required]),
      title: this.fb.control('', [Validators.required]),
    }),
    gender: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.email, Validators.required])
  })
  
  public submitForm() {
    if(this.form.invalid) {
      FormHelper.markGroupDirty(this.form);
      return;
    }

    this.listOfRandomUser.unshift(this.form.getRawValue());
    this.messageService.success('User added');
    this.visibleForm = false;
  }

  public loadDataToForm() {
    this.form.patchValue(demoUser)
  }
  //#region 
  checkBoxOnChange(event: any) {
    console.log(event, this.sourceCkBox)
  }
  radioOnChange(event: any) {
    console.log(event)
    let filter = [{
      key: 'name',
      value: event
    }]
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, filter)
  }
  dateValueChange(event: any) {
    this.date = event;
  }
  selectionChange(event: any) {
    console.log(event)
  }
  dateRangeChange(event: any) {
    console.log(event)
  }
  addSelection() {
    this.selectionSource.push({
      label: 'test' + this.testIdx,
      value: 'test' + this.testIdx,
    })
    this.testIdx++;

    this.messageService.success('item added')
  }
  editSelection(item: any) {
    // item.label +=" edited";
    this.messageService.success(item.label + ' edited')

  }
  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
  }
  loadDataFromServer(pageIndex: number, pageSize: number, sortField: string | null, sortOrder: string | null, filter: Array<{ key: string; value: string[] }>): void {
    this.loading = true;
    this.testService.getData(pageIndex, pageSize, sortField, sortOrder, filter).subscribe((data: any) => {
      this.loading = false;
      this.total = 200; // mock the total data here
      this.listOfRandomUser = data.results;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams, dataStr?: any): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }
}

interface RandomUser {
  gender: string;
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
}