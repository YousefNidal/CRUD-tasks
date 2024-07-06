import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class NiggaErrorInterceptor implements HttpInterceptor {

  constructor( private router:Router, private inject:Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err:HttpErrorResponse) => {
        let toastr = this.inject.get(ToastrService)
         toastr.error(err.error, "Error")  // this way is useful to solve problem with call services inside another service


          if(err.error.message == 'jwt expired') {
            this.router.navigate(['/auth/login'])
            localStorage.removeItem('token')
          }
        throw err
      })
    );
  }
}
