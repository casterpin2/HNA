import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TCheckBoxComponent } from './t-check-box/t-check-box.component';
import { NzCheckboxGroupComponent, NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TRadioButtonComponent } from './t-radio-button/t-radio-button.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { SidebarCheckboxComponent } from './sidebar-checkbox/sidebar-checkbox.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SidebarRadioComponent } from './sidebar-radio/sidebar-radio.component';
import { SidebarSelectionComponent } from './sidebar-selection/sidebar-selection.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { LabelFilterPipe } from 'src/app/_share/_pipes/label-filter.pipe';
import { SharedPipesModule } from 'src/app/_share/_pipes/shared-pipes.module';
import { SidebarDatePickerComponent } from './sidebar-date-picker/sidebar-date-picker.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { TTemplateLayoutComponent } from './t-template-layout/t-template-layout.component';
import { TFullTemplateLayoutComponent } from './t-full-template-layout/t-full-template-layout.component';
import { FormTemplateComponent } from './form-template/form-template.component';
import { TranslateModule } from '@ngx-translate/core';
import { InitNgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { UploadImgComponent } from './upload-img/upload-img.component';
import { TTemplateContentLayoutComponent } from './t-template-content-layout/t-template-content-layout.component';
import { SystemShareComponent } from './system-share/system-share.component';



@NgModule({
  declarations: [
    TCheckBoxComponent,
    TRadioButtonComponent,
    SidebarCheckboxComponent,
    SidebarRadioComponent,
    SidebarSelectionComponent,
    SidebarDatePickerComponent,
    TTemplateLayoutComponent,
    TFullTemplateLayoutComponent,
    FormTemplateComponent,
    UploadImgComponent,
    TTemplateContentLayoutComponent,
    SystemShareComponent,
  ],
  imports: [
    CommonModule,
    NzCheckboxModule,
    FormsModule,
    NzRadioModule,
    NzIconModule,
    NzGridModule,
    NzLayoutModule ,
    NzButtonModule,
    NzSpaceModule,
    NzDatePickerModule,
    NzMenuModule,
    NzInputModule,
    NzListModule,
    SharedPipesModule,
    NzDatePickerModule,
    NzPopoverModule,
    ReactiveFormsModule,
    TranslateModule,
    InitNgZorroAntdModule,
  ],
  exports: [
    TCheckBoxComponent,
    TRadioButtonComponent,
    SidebarCheckboxComponent,
    SidebarRadioComponent,
    SidebarSelectionComponent,
    SidebarDatePickerComponent,
    TTemplateLayoutComponent,
    TFullTemplateLayoutComponent,
    FormTemplateComponent,
    UploadImgComponent,
    TTemplateContentLayoutComponent,
    SystemShareComponent
  ]
})
export class SharedComponentModule { }
