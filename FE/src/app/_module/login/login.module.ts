import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { AuthenticationService } from "@services/authen.services";
import { InitNgZorroAntdModule } from "src/app/ng-zorro-antd.module";
import { CmsService } from "src/app/_services/cms.service";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login/login.component";



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    InitNgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule 
  ],
  providers: [
    CmsService,
    AuthenticationService
  ]
})
export class LoginModule { }
