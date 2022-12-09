import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InitNgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { ToastrModule } from 'ngx-toastr';
import { HeaderClientModule } from '@layout/header-client/header-client.module';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    FormsModule,
    InitNgZorroAntdModule,
    ToastrModule.forRoot(),
    HeaderClientModule
  ],
  exports:[
    HeaderComponent
  ]
})
export class HeaderModule { }
