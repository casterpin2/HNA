import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderModule } from '@layout/header/header.module';
import { HolaAdminPortalRoutingModule } from './hola-admin-portal-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HolaAdminPortalRoutingModule,
    HeaderModule
  ]
})
export class HolaAdminPortalModule { }
