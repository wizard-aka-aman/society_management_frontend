import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { FormsModule } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-society-setting',
  imports: [FormsModule],
  templateUrl: './society-setting.component.html',
  styleUrl: './society-setting.component.css'
})
export class SocietySettingComponent {
  societyId :number = 0;
  societyChangeName : string = "";
  formData : any = {};
  constructor(private ServiceSrv : ServiceService, private toastr : ToastrService , private route : Router) { 
    this.societyId = this.ServiceSrv.getSocietyId(); 
  }

  Change(){
    this.societyChangeName = this.societyChangeName.trim();
    if(this.societyChangeName == ""){
      this.toastr.error('Please enter society name', 'Error');
      return;
    }
    this.formData.Name = this.societyChangeName;
    console.log(this.societyId,this.formData);
    
    this.ServiceSrv.changeSocietyName(this.societyId,this.formData).subscribe({
      next: (res) =>{
        console.log(res);
        this.toastr.success("Society Name Changed" ,"Success");
        this.route.navigateByUrl('/home')
      },
      error: (err) =>{
        console.log(err);
        this.toastr.error("Error in Changing Society Name" ,"Error");
      }
    });
  }

}
