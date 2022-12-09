import { InitNgZorroAntdModule } from '../../../ng-zorro-antd.module';
import { NzTableModule } from 'ng-zorro-antd/table';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SharedComponentModule } from 'src/app/_share/shared-component/shared-component.module';
import { TranslateModule } from '@ngx-translate/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { HeaderModule } from '@layout/header/header.module';
import { AuthenticationService } from '@services/authen.services';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzBreadCrumbModule,
    NzGridModule,
    NzLayoutModule ,
    NzMenuModule,
    NzButtonModule,
    NzCheckboxModule,
    FormsModule,
    NzSpaceModule,
    SharedComponentModule,
    NzDatePickerModule,
    NzListModule,
    NzInputModule,
    NzIconModule,
    TranslateModule,
    NzTableModule,
    InitNgZorroAntdModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule,
    HeaderModule
  ],
  providers:[AuthenticationService]
})
export class DashboardModule { }
