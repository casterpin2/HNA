import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { WebsiteContentComponent } from './website-content/website-content.component';
import { SettingsSystemComponent } from './settings-system/settings-system.component';
import { SettingsNewsComponent } from './settings-news/settings-news.component';
import { NewsViewComponent } from './settings-news/news-view/news-view.component';
import { NewsCrudComponent } from './settings-news/news-crud/news-crud.component';
import { NewsCategoryComponent } from './settings-news/news-category/news-category.component';
import { NewsCategoryCrudComponent } from './settings-news/news-category/news-category-crud/news-category-crud.component';
import { SettingMenuComponent } from './website-content/setting-menu/setting-menu.component';
import { SettingMenuModalComponent } from './website-content/setting-menu/setting-menu-modal/setting-menu-modal.component';
import { InformationComponent } from './website-content/information/information.component';
import { CourseHomeComponent } from './website-content/course-home/course-home.component';
import { BannerComponent } from './website-content/banner/banner.component';
import { BannerCrudComponent } from './website-content/banner/banner-crud/banner-crud.component';

import { TranslateModule } from '@ngx-translate/core';
import { InitNgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { SharedComponentModule } from '@share/shared-component/shared-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsService } from '@services/cms.service';
import { InformationCrudComponent } from './website-content/information/information-crud/information-crud.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { CustomerFeedbackComponent } from './website-content/customer-feedback/customer-feedback.component';
import { CustomerFeedbackCrudComponent } from './website-content/customer-feedback/customer-feedback-crud/customer-feedback-crud.component';
import { AdmissionsManageComponent } from './website-content/admissions-manage/admissions-manage.component';
import { AdmissionsManageViewComponent } from './website-content/admissions-manage/admissions-manage-view/admissions-manage-view.component';

@NgModule({
  declarations: [
    WebsiteContentComponent,
    SettingsSystemComponent,
    SettingsNewsComponent,
    NewsViewComponent,
    NewsCrudComponent,
    NewsCategoryComponent,
    NewsCategoryCrudComponent,
    SettingMenuComponent,
    SettingMenuModalComponent,
    InformationComponent,
    CourseHomeComponent,
    BannerComponent,
    BannerCrudComponent,
    InformationCrudComponent,
    CustomerFeedbackComponent,
    CustomerFeedbackCrudComponent,
    AdmissionsManageComponent,
    AdmissionsManageViewComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TranslateModule,
    InitNgZorroAntdModule,
    SharedComponentModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  providers: [CmsService]
})
export class SettingsModule { }
