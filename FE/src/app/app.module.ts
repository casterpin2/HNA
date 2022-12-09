import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app.routing.module";
import { AppComponent } from './app.component';
import { HeaderComponent } from './_layout/header/header.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader, TranslateCompiler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';
import { enUS, ja, vi } from 'date-fns/locale';
import { NzI18nService, NZ_I18N } from 'ng-zorro-antd/i18n';
import { BlockUIHttpModule } from 'ng-block-ui/http';
// ant
import { InitNgZorroAntdModule } from "./ng-zorro-antd.module";
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { BasicAuthInterceptor } from './_core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './_core/interceptors/error.interceptor';
import { vi_VN, NZ_DATE_LOCALE } from 'ng-zorro-antd/i18n';
import { LabelFilterPipe } from './_share/_pipes/label-filter.pipe';
import { AuthenticationService } from '@services/authen.services';
import { HeaderClientComponent } from './_layout/header-client/header-client.component';
import { CmsService } from '@services/cms.service';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    InitNgZorroAntdModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BlockUIModule.forRoot({
      delayStart: 0,
      delayStop: 0
    }),
    BlockUIHttpModule.forRoot({
      blockAllRequestsInProgress: true
    }),

  ],
  providers: [
    { provide: NZ_ICONS, useValue: icons },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: NZ_DATE_LOCALE, useValue: vi },
    { provide: NZ_I18N, useValue: vi_VN },
    AuthenticationService,
    CmsService
  ],
  bootstrap: [AppComponent],

})
export class AppModule {
  constructor(private i18n: NzI18nService) { }
  switchLanguage() {
    this.i18n.setDateLocale(vi); // Switch language to Japanese at runtime
    this.i18n.setLocale(vi_VN);
  }
}
