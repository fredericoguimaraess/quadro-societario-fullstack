import { Routes } from '@angular/router';
import { EmpresaListComponent } from './components/empresa-list/empresa-list.component';
import { EmpresaFormComponent } from './components/empresa-form/empresa-form.component';
import { SocioListComponent } from './components/socio-list/socio-list.component';
import { SocioFormComponent } from './components/socio-form/socio-form.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'empresa', component: EmpresaListComponent, canActivate: [AuthGuard] },
    { path: 'empresa/new', component: EmpresaFormComponent, canActivate: [AuthGuard] },
    { path: 'empresa/edit/:id', component: EmpresaFormComponent, canActivate: [AuthGuard] },
    { path: 'socio', component: SocioListComponent, canActivate: [AuthGuard] },
    { path: 'socio/new', component: SocioFormComponent, canActivate: [AuthGuard] },
    { path: 'socio/edit/:id', component: SocioFormComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login' }
];
