import { NgModule } from '@angular/core';
import { EmpresaListComponent } from './components/empresa-list/empresa-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'empresas', component: EmpresaListComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
