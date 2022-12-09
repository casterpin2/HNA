
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { CmsClassCrudComponent } from './cms-class/cms-class-crud/cms-class-crud.component';
import { CmsClassInformationComponent } from './cms-class/cms-class-information/cms-class-information.component';
import { CmsClassStudentComponent } from './cms-class/cms-class-student/cms-class-student.component';
import { CmsClassComponent } from './cms-class/cms-class.component';

import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {
    path:'student',
    component:StudentComponent
  },
  {
    path:'user',
    component:AccountComponent
  },
  {
    path:'user/:id',
    component:AccountComponent
  },
  {
    path:'class',
    component:CmsClassComponent
  },
  {
    path:'class/crud',
    component:CmsClassCrudComponent
  },
  {
    path:'class/crud/:id',
    component:CmsClassCrudComponent
  },
  {
    path:'class/student/:id',
    component : CmsClassInformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
