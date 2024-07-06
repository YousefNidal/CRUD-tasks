import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(private fb:FormBuilder, 
    private loginService:LoginService,
    private toastr:ToastrService,
    private router:Router,
    ) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.fb.group({
email:['', [Validators.required, Validators.email]],
password:['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
role:['admin']
    })
  }
  login() {

    this.loginService.login(this.loginForm.value).subscribe( (res:any) => {
      localStorage.setItem('token',res.token)
      this.toastr.success("Success", "Login Success")
      this.router.navigate(['/tasks'])

    }, err => {
      this.toastr.error("Can not login")
 
    })
  }


}
