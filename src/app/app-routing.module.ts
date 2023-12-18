import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';


const routes: Routes = [
  { path: '', component: LoginComponent,pathMatch:'full'},

  {
    path: 'secundario',
    loadChildren: () =>
      import('./secundario/secundario.module').then(
        (m) => m.SecundarioModule
      ),
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
