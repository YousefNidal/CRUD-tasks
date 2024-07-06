import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { ListTasksComponent } from './dashboard/components/tasks/components/list-tasks/list-tasks.component';

const routes: Routes = [
  {
    path:'', 
  loadChildren: () => import(`./dashboard/dashboard.module`).then(m => m.DashboardModule)
  },

  
  {
    path:'auth', 
  loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule)
  },
  
  {path:'**', redirectTo:"login/register", pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes ,  { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
