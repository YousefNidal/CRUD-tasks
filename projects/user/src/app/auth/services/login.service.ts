import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http:HttpClient) {


   }

   login(modal:any) {
    return this.http.post("https://task-bend.onrender.com/auth/login/",modal)
   }

   register(modal:any) {
    return this.http.post("https://task-bend.onrender.com/auth/createAccount/",modal)
   }

   
}
