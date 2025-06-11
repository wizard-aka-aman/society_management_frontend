import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-complaints',
  imports: [CommonModule, FormsModule],
  templateUrl: './complaints.component.html',
  styleUrl: './complaints.component.css'
})
export class ComplaintsComponent {
  Title: string = "";
  Description: string = ""
  Status: string = ""
  complaints: any
  formdata: any = {};
  Name: string = "";
  editModalVisible = false;
  showTitle: string = "";
  showDescription: string = ""
  showStatus: string = ""
  showCreatedWhen: any;
  Role :string = ""
  editFormData : any = {} 
  complaintsId :number = 0;
  Society :number = 0;
  constructor(private ServiceSrv: ServiceService, private toastr: ToastrService) {
    this.Name = this.ServiceSrv.getUserName();
    this.Role = this.ServiceSrv.getRole(); 
    this.Society = this.ServiceSrv.getSocietyId(); 
    console.log(this.Role);
    
    this.FetchComplaints();
  }
  viewComplaint(complaint: any) {
    // Open modal or navigate to details
    console.log('Viewing complaint:', complaint);
    this.editModalVisible = true
    this.showDescription = complaint.description;
    this.showTitle = complaint.title;
    this.showCreatedWhen = complaint.dateCreated
    this.showStatus = complaint.status;
    this.complaintsId = complaint.complaintsId
  }

  resetComplaintForm() {

  }
  submitComplaint() {
    if(this.Title == "" || this.Description == ""){
      this.toastr.error('Please fill in all fields', 'Error');
      return;
    }
    this.formdata.Title = this.Title;
    this.formdata.Description = this.Description;
    this.formdata.Status = this.Status;
    this.formdata.Name = this.Name;
    
    console.log(this.formdata);
    
    this.ServiceSrv.AddComplaints(this.formdata).subscribe({
      next: (response) =>{
        console.log(response);
        this.toastr.success("Complaint Added", "Success")
        this.FetchComplaints();
      },
      error: (error) =>{
        console.log(error);
      }
    }) 
  }

  FetchComplaints(){
    if(this.Role == 'Admin'){
      this.ServiceSrv.GetAllComplaints(this.Society).subscribe({
      next: (response) =>{
        console.log(response);
        this.complaints = response
      },
      error: (error) =>{
        console.log(error);
      }
    })
    }
    else{
      this.ServiceSrv.GetMyComplaints(this.Name).subscribe({
      next: (response) =>{
        console.log(response);
        this.complaints = response
      },
      error: (error) =>{
        console.log(error);
      }
    })
    }
  }
  Close(){
    this.editModalVisible = false
  }
  Save(){
    this.editFormData.Title = this.showTitle;
    this.editFormData.Description = this.showDescription;
    this.editFormData.Status = this.showStatus;
    this.editFormData.Name = this.Name;
    console.log(this.editFormData);
    this.ServiceSrv.UpdateComplaints(this.editFormData , this.complaintsId).subscribe({
      next: (response) =>{
        console.log(response);
         this.toastr.success("Complaint Updated", "Success")
         this.FetchComplaints();
          this.editModalVisible = false
      },
      error: (error) =>{
         this.editModalVisible = false
        console.log(error);
      }
    })

  }
}
