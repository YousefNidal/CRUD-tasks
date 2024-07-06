import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;

  constructor(private toastr:ToastrService, private loginService:LoginService,
     private fb:FormBuilder, private spinner:NgxSpinnerService, private router:Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      role:['user']})
  }



  login() {
    
    this.loginService.login(this.loginForm.value).subscribe((res:any) => {
      localStorage.setItem('token', res.token)
      this.router.navigate(['/tasks'])
      
      this.toastr.success("Logged in")
    })
  }

 

 
}
