import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessDeninedRoutingModule } from './access-denined-routing.module';
import { AccessDeninedComponent } from './access-denined.component';


@NgModule({
  declarations: [
    AccessDeninedComponent
  ],
  imports: [
    CommonModule,
    AccessDeninedRoutingModule
  ]
})
export class AccessDeninedModule { }
