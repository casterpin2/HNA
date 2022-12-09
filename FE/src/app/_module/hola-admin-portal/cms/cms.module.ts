import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { StudentComponent } from './student/student.component';
import { AccountComponent } from './account/account.component';
import { SharedComponentModule } from '@share/shared-component/shared-component.module';
import { CmsService } from '@services/cms.service';
import { AuthenticationService } from '@services/authen.services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InitNgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { TranslateModule } from '@ngx-translate/core';
import { CmsClassComponent } from './cms-class/cms-class.component';
import { CmsClassCrudComponent } from './cms-class/cms-class-crud/cms-class-crud.component';
import { CmsClassStudentComponent } from './cms-class/cms-class-student/cms-class-student.component';
import { CmsClassFeeComponent } from './cms-class/cms-class-fee/cms-class-fee.component';
import { CmsClassInformationComponent } from './cms-class/cms-class-information/cms-class-information.component';
import { CmsClassAddUserComponent } from './cms-class/cms-class-student/cms-class-add-user/cms-class-add-user.component';
import { FeeModalComponent } from './cms-class/cms-class-fee/fee-modal/fee-modal.component';
import { SharedPipesModule } from '@share/_pipes/shared-pipes.module';
import { AddStudentFeeComponent } from './cms-class/cms-class-student/add-student-fee/add-student-fee.component';
import { AttendanceUserComponent } from './cms-class/attendance-user/attendance-user.component';
import { AttendanceUserAddComponent } from './cms-class/attendance-user/attendance-user-add/attendance-user-add.component';
import { AttendanceUserListComponent } from './cms-class/attendance-user/attendance-user-list/attendance-user-list.component';
import { AttendanceUserViewComponent } from './cms-class/attendance-user/attendance-user-view/attendance-user-view.component';
import { HeaderModule } from '@layout/header/header.module';



@NgModule({
  declarations: [
    StudentComponent,
    AccountComponent,
    CmsClassComponent,
    CmsClassCrudComponent,
    CmsClassStudentComponent,
    CmsClassFeeComponent,
    CmsClassInformationComponent,
    CmsClassAddUserComponent,
    FeeModalComponent,
    AddStudentFeeComponent,
    AttendanceUserComponent,
    AttendanceUserAddComponent,
    AttendanceUserListComponent,
    AttendanceUserViewComponent,
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    SharedComponentModule,
    ReactiveFormsModule,
    InitNgZorroAntdModule,
    TranslateModule,
    FormsModule,
    SharedPipesModule,
    HeaderModule
  ],
  providers: [
    CmsService,
    AuthenticationService
  ]
})
export class CmsModule { }
