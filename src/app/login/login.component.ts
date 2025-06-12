import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import {   ToastrService } from 'ngx-toastr';   
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
 
  formvalue : FormGroup = new FormGroup({
    UserName: new FormControl('',[Validators.required]),
    Password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/)]),
  })
  
  formData : any ; 
  constructor(private ServiceSrv : ServiceService ,private toastr: ToastrService , private router: Router){
   
  }
  
  ngOnInit(): void { 
    if(localStorage.getItem('jwt') && this.ServiceSrv.checkAuthentication()){
      this.router.navigateByUrl('/home');
    }
  }
  
  onSubmit(){
    this.formData = this.formvalue.value
    console.log(this.formData); 
    this.ServiceSrv.login(this.formData).subscribe( { 
      next: (response:any) => { 
        console.log('Login Successful', response);  
        this.toastr.success("Login Successfull" , "Success") 
        localStorage.setItem("jwt" , response.token)  
        localStorage.setItem("email" , response.user.email)  
        localStorage.setItem("username" , response.user.userName)  
        localStorage.removeItem("password")   

        this.router.navigateByUrl('/home');
      },
      error: (error:any) => {
        this.toastr.error(error.error , "Error") 
        console.log(error.error); // "Invalid Credentials!!"
      }
    })
  }
  
}
