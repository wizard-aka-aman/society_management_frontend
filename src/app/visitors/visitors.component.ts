import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-visitors',
  imports: [CommonModule, FormsModule ,DatePipe],
  templateUrl: './visitors.component.html',
  styleUrl: './visitors.component.css'
})
export class VisitorsComponent {
  visitors: any;
  name: string = "";
  role: string = ""
  societyId: number = 0;
  formData: any = {}
  username: string = "";
  purpose: string = "";
  constructor(private ServiceSrv: ServiceService, private toastr: ToastrService) {
    this.name = this.ServiceSrv.getUserName();
    this.societyId = this.ServiceSrv.getSocietyId();
    this.role = this.ServiceSrv.getRole();
    this.FetchVisitors();
  }

  sendVisitor() {
    this.formData.Name = this.name;
    this.formData.Username = this.username;
    this.formData.Purpose = this.purpose;
    this.formData.SocietyId = this.societyId;
    this.ServiceSrv.AddVisitors(this.formData).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Visitor Added Successfully', 'Success');
        this.FetchVisitors();

      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Error in Adding Visitor', 'Error');
        this.FetchVisitors();
      }
    })

  }
  Delete(id :number){
   const pakka = confirm("Sure you want to delete this visitor?");
   if(pakka){
     this.ServiceSrv.DeleteVisitor(id).subscribe({
      next: (res) =>{
        console.log(res);
        this.toastr.success('Visitor Deleted Successfully', 'Success');
        this.FetchVisitors();
      },
      error: (err) =>{
        console.log(err);
        this.toastr.error('Error in Deleting Visitor', 'Error');

      }
    })
   }
  }
  FetchVisitors() {
    this.ServiceSrv.GetAllVisitors(this.societyId).subscribe({
      next: (data) => {
        this.visitors = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}

