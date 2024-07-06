import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NiggaErrorInterceptor } from './interceptors/nigga-error.interceptor';
import { NiggaLoaderInterceptor } from './interceptors/nigga-loader.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    {
      provide:HTTP_INTERCEPTORS,
      useClass:NiggaErrorInterceptor,
      multi:true,
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:NiggaLoaderInterceptor,
      multi:true,
    }
  ]
})
export class CoreModule { }
