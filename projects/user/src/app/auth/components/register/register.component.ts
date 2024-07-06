import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup;
  constructor(private fb:FormBuilder, private loginService:LoginService, private router:Router, private spinner:NgxSpinnerService, private toastr:ToastrService ) { }

  ngOnInit(): void {
    this.createForm();
    
  }

  createForm() {
    this.registerForm = this.fb.group({
      username:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(3)]],
      confirmPassword:['', [Validators.required]],
      role:['user']
    }, {validators:this.checkPassword})
  }

  register() {
let form = this.performData();
this.loginService.register(form).subscribe(res => {
  this.router.navigate(['/auth/login'])
      this.spinner.hide();
      this.toastr.success("Register completed", "Success")

}, err => {
  this.spinner.hide();
  this.toastr.error(err.error)
})
  }

  performData() {
    let data = new FormData();
    
      data.append("email", this.registerForm.value['email']);
      data.append("password", this.registerForm.value['password']);
      data.append("username", this.registerForm.value['email']);
      data.append("role", this.registerForm.value['role'])
   
    return data;
    // data.append("email", )
  }

  checkPassword:ValidatorFn = (group:AbstractControl):ValidationErrors | null => {
    let password = group.get('password')?.value
    let confirmPassword = group.get('confirmPassword')?.value

    return password === confirmPassword? null: {notSame:true}
  }

  




}
