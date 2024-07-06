import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { UserGuard } from '../core/guards/user.guard';


const routes: Routes = [
  {path:'', component:LayoutComponent, 
    canActivateChild:[UserGuard],
    children:[
    {path:'', 
      loadChildren: () => import(`./components/tasks/tasks.module`).then(m => m.TasksModule)
      },
      
  ]},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }