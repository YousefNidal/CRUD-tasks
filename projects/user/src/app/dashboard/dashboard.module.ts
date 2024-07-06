import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    TranslateModule,
    NgxPaginationModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
