import { HolaAdminPortalModule } from './_module/hola-admin-portal/hola-admin-portal.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_core/guards/auth.guars';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./_module/hola-admin-portal/hola-admin-portal.module').then(m => m.HolaAdminPortalModule),
        canActivate: [AuthGuard]

    },
    {
        path: 'login',
        loadChildren: () => import('@modules/login/login.module').then(m => m.LoginModule),
    },
    {
        path: 'page-not-found',
        loadChildren: () => import('./_module/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule),        
    },
    {
        path: 'access-denied',
        loadChildren: () => import('./_module/access-denined/access-denined.module').then(m => m.AccessDeninedModule),
    },
    {
        path: 'hola-portal',
        loadChildren: () => import('./_module/hola-admin-portal/hola-admin-portal.module').then(m => m.HolaAdminPortalModule),
    },
    {
        path: '**',
        redirectTo: 'page-not-found',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
