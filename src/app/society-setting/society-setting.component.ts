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
  formDataNotify : any = {};
  societyBeforeDueDate :number = 0;
  societyDetail :any;
  constructor(private ServiceSrv : ServiceService, private toastr : ToastrService , private route : Router) { 
    this.societyId = this.ServiceSrv.getSocietyId(); 
      this.ServiceSrv.GetSocietyDetail(this.societyId).subscribe({
      next: (data:any) =>{
        console.log(data);  
        this.societyDetail =data[0]  ;
        console.log(this.societyDetail.name); 
        this.societyChangeName = this.societyDetail.name
        this.societyBeforeDueDate = this.societyDetail.notifyBefore
      },
      error: (error: any) =>{
        console.log(error);
      }
    })
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

  ChangeNotify(){
     
    if(this.societyBeforeDueDate <= 0){
      this.toastr.error('Please enter Correct Days', 'Error');
      return;
    }
    this.formDataNotify.NotifyBefore = this.societyBeforeDueDate;
    this.formDataNotify.Name = "Name";
    console.log(this.societyId,this.formDataNotify);
    
    this.ServiceSrv.changeSocietyNotifyBefore(this.societyId,this.formDataNotify).subscribe({
      next: (res:any) =>{
        console.log(res);
        this.toastr.success("Society NotifyDate Changed" ,"Success");
        this.route.navigateByUrl('/home')
      },
      error: (err:any) =>{
        console.log(err);
        this.toastr.error("Error in Changing Society Name" ,"Error");
      }
    });
  }

}
