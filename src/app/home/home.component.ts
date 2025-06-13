import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-home',
  imports: [DatePipe, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userName: string = "";
  totalDues: number = 0;
  complaintCount: number = 0;
  notices: any;
  visitors: any; 
  billsdata: any[] = [];
  role : string = ""
  societyId : number = 0; 
  


  constructor(private ServiceSrv: ServiceService) {
    this.userName = this.ServiceSrv.getUserName();
    this.role = this.ServiceSrv.getRole();
    this.societyId = this.ServiceSrv.getSocietyId();
    

    this.ServiceSrv.GetMyBills(this.userName).subscribe({

      next: (data: any) => {
        this.billsdata = data;
        console.log(data);   
        this.totalDues = this.billsdata.map((e: any) => { this.totalDues += e.amount;  return this.totalDues})[this.billsdata.length-1];
        console.log(this.totalDues);
      },
      error: (error) => {
        console.error(error);
      }
    })
   if(this.role == "Admin"){
     this.ServiceSrv.TotalComplaints(this.societyId).subscribe({
      next: (data: any) =>{
        this.complaintCount = data;
      },
      error: (error) =>{
        console.error(error);
      }
    })
   }
   else{
    this.ServiceSrv.MyComplaintsNumber(this.userName).subscribe({
      next: (data: any) =>{
        this.complaintCount = data;
      },
      error: (error) =>{
        console.error(error);
      }
    })
   }

   this.ServiceSrv.GetOneNotice(this.societyId).subscribe({
    next: (data: any) =>{
      this.notices = data;
      console.log(data);
   },
    error: (error) =>{
      console.error(error);
    }
   })

   this.ServiceSrv.GetOneVisitors(this.societyId).subscribe({
    next: (data: any) =>{
      this.visitors = data;
      console.log(data);
   },
    error: (error) =>{
      console.error(error);
    }
   })
   console.log(this.userName);
   
  
  }

}
