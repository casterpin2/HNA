import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderClientRoutingModule } from './header-client-routing.module';
import { HeaderClientComponent } from './header-client.component';


@NgModule({
  declarations: [HeaderClientComponent],
  imports: [
    CommonModule,
    HeaderClientRoutingModule
  ],
  exports:[HeaderClientComponent]
})
export class HeaderClientModule { }
