import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AdminGuard } from '../core/guards/admin.guard';
import { AdminLoginRejectGuard } from '../core/guards/admin-login-reject.guard';



const routes: Routes = [
  {path:'', component:LayoutComponent,
    
    canActivateChild:[AdminGuard, AdminLoginRejectGuard]
    ,children:[
    {path:'tasks', 
      loadChildren: () => import(`./tasks-admin/tasks-admin.module`).then(m => m.TasksAdminModule)
      },
      {path:'users', 
      loadChildren: () => import(`./manage-users/manage-users.module`).then(m => m.ManageUsersModule)
      },
  ]},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
