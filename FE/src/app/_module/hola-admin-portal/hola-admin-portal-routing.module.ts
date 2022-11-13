import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),    
  },
  {
    path:'cms',
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule),    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HolaAdminPortalRoutingModule { }
