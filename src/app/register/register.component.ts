import { Component } from '@angular/core'; 
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule ,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formvalue : FormGroup = new FormGroup({
    Username : new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")]),
    Email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    Password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/)]),
  })
   
  formData : any ;
  fromEmail : any; 
  constructor(private ServiceSrv : ServiceService,private toastr: ToastrService , private router : Router ) {

    // const user = this.ServiceSrv.getUserName();
    // if(user!= null){
    //  this.router.navigateByUrl('/home')
    // }
 
   }
  
   sendEmail(){
    this.formData = this.formvalue.value
    console.log("this.formData.email : "+this.formData.Email);  
    localStorage.setItem("email" , this.formData.Email)  
        this.fromEmail = this.formvalue.value ;
        this.fromEmail.SocietyId = this.ServiceSrv.getSocietyId();
          console.log(this.fromEmail);
        this.ServiceSrv.register(this.fromEmail).subscribe({
          next: (response:any) => {
            this.toastr.success("Register Successfully","Success"); 
            localStorage.setItem("username" , this.formData.username)
            localStorage.setItem("password" , this.formData.password)
           
            this.router.navigateByUrl('/home');
          },
          error:(err:any)=>{ 
            console.log(err.error);
            
            this.toastr.error(err.error,"Error");
          }
           
        }) 
   }
  
}
