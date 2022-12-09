import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionsComponent } from './admissions/admissions.component';
import { ClientNewsComponent } from './client-news/client-news.component';
import { HomeComponent } from './home/home.component';
import { SummaryIntroduceComponent } from './summary/summary-introduce/summary-introduce.component';
import { TakeCaresComponent } from './take-cares/take-cares.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'introduce',
    component:SummaryIntroduceComponent
  },
  {
    path:'infrastructure',
    component:SummaryIntroduceComponent
  },
  {
    path:'core_values',
    component:SummaryIntroduceComponent
  },
  {
    path:'take_cake',
    component:TakeCaresComponent
  },
  {
    path:'admissions',
    component:AdmissionsComponent
  },
  {
    path:'introduce/:id',
    component:SummaryIntroduceComponent
  },
  {
    path:'client-news',
    component:ClientNewsComponent
  },
  {
    path:'introduce/:id/:take',
    component:SummaryIntroduceComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
