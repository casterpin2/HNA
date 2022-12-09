import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { HomeComponent } from './home/home.component';
import { HomeBannerComponent } from './home/home-banner/home-banner.component';
import { HomeInformationComponent } from './home/home-information/home-information.component';
import { ClientFooterComponent } from './home/client-footer/client-footer.component';
import { ClientServiceComponent } from './home/client-service/client-service.component';
import { HomeEduComponent } from './home/home-edu/home-edu.component';
import { HomeCustomerComponent } from './home/home-customer/home-customer.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbModule } from 'angular-crumbs';
import { NiceSelectModule } from 'ng-nice-select';
import { RecaptchaFormsModule } from 'ng-recaptcha';
import { HeaderModule } from '@layout/header/header.module';
import { HeaderClientModule } from '@layout/header-client/header-client.module';
import { SummaryComponent } from './summary/summary.component';
import { SummaryIntroduceComponent } from './summary/summary-introduce/summary-introduce.component';
import { CmsService } from '@services/cms.service';
import { BreadcurmComponent } from './breadcurm/breadcurm.component';
import { ClientNewsComponent } from './client-news/client-news.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TakeCaresComponent } from './take-cares/take-cares.component';
import { AdmissionsComponent } from './admissions/admissions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsRoutingModule } from '@modules/hola-admin-portal/settings/settings-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { InitNgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { SharedComponentModule } from '@share/shared-component/shared-component.module';
import { CKEditorModule } from 'ng2-ckeditor';




@NgModule({
  declarations: [
    HomeComponent,
    HomeBannerComponent,
    HomeInformationComponent,
    ClientFooterComponent,
    ClientServiceComponent,
    HomeEduComponent,
    HomeCustomerComponent,
    SummaryComponent,
    SummaryIntroduceComponent,
    BreadcurmComponent,
    ClientNewsComponent,
    TakeCaresComponent,
    AdmissionsComponent,
   
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    NgbModule,
    NiceSelectModule,
    RecaptchaFormsModule,
    SlickCarouselModule,
    HeaderModule,
    HeaderClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    InitNgZorroAntdModule,
    SharedComponentModule,
    CKEditorModule
  ],
  providers:[
    CmsService
  ]
})
export class ClientModule { }
