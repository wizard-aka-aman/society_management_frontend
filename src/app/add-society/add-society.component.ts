import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-add-society',
  imports: [CommonModule , FormsModule],
  templateUrl: './add-society.component.html',
  styleUrl: './add-society.component.css'
})
export class AddSocietyComponent {
  society: any[] = [];
  societyId: number = 0;
  role: string = ""
  ModalVisible = false
  showName: string = ""
  showAdmin: string = ""
  showCreatedWhen: any
  name: string = ""
  admin: string = "";
  formData: any = {};
  noticeId: number = 0;
  isEditAble: boolean = false;
  societyItemId :number = 0
  GetUsernameWithNull :any[]=[];
  usernameForSetSocietyId :string =""
   
  constructor(private ServiceSrv: ServiceService, private toastr: ToastrService) {
    this.societyId = this.ServiceSrv.getSocietyId();
    this.role = this.ServiceSrv.getRole();
    this.fetchSociety();
    this.fetchGetUsernameWithNull();
  }
  fetchGetUsernameWithNull(){
     this.ServiceSrv.GetUsernameWithNull().subscribe({
      next: (data: any) =>{
        this.GetUsernameWithNull = data;
        console.log(data);
      },
      error: (error) =>{
        console.error(error);
      }
    })
  }

  viewsocietyItem(society: any) {
    // Open modal or navigate to society detail page
    this.ModalVisible = true;
    console.log(society);
    this.showName = society.name;
    this.showAdmin = society.admin;
    this.showCreatedWhen = society.createdWhen;
    this.societyItemId = society.societyId;
    this.usernameForSetSocietyId = society.admin

  }
  fetchSociety() {
    this.ServiceSrv.GetAllSociety().subscribe({
      next: (response:any) => {
        this.society = response;
        console.log(this.society);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  Close() {
    this.ModalVisible = false;
  }
  CloseEdit(){
    this.isEditAble = false
  }
  SaveEdit(){
    this.name = this.showName  
    this.admin = this.usernameForSetSocietyId  
    this.isEditAble = false;
    this.ModalVisible = false;
    if (this.name == "" ) {
      this.toastr.error("please fill the form ");
      return;
    }
   this.formData.name = this.name;
    this.formData.admin = this.admin; 
    console.log(this.formData);
     this.ServiceSrv.UpdateSociety(this.societyItemId, this.formData).subscribe({
      next: (res:any) => {
        console.log(res);
        this.toastr.success("Society Updated");
        this.fetchSociety()
        this.ModalVisible = false;
        this.fetchGetUsernameWithNull()
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }
  SendsocietyItem() {
    this.name = this.name.trim()
    if (this.name == "" ) {
      this.toastr.error("please fill the form ");
      return;
    }
    this.formData.name = this.name;
    this.formData.admin = this.admin;
    this.formData.SocietyId = this.societyId;
    console.log(this.formData);

    this.ServiceSrv.AddSociety(this.formData).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success( "Society Added","success");
        this.fetchSociety()
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Some Error Occur", "error");
      }
    })
  }
  Delete() {  
    var pakka = confirm("Sure you want to delete!");
    if(pakka){
    this.ServiceSrv.DeleteSociety(this.societyItemId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success("Society Deleted");
        this.fetchSociety()
        this.ModalVisible = false;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
  Edit() {
    this.isEditAble = true;   
  }

  
}
