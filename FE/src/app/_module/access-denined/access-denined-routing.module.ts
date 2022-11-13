import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeninedComponent } from "./access-denined.component";

const routes: Routes = [
  {
    path: '',
    component: AccessDeninedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessDeninedRoutingModule { }
