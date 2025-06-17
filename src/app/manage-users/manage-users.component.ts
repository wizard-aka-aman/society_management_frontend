import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-users',
  imports: [CommonModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent {
  users: any;
  societyId: number = 0;
  name: string = ""
  role :string =""
  constructor(private ServiceSrv: ServiceService, private toastr: ToastrService) {
    this.societyId = this.ServiceSrv.getSocietyId();
    this.name = this.ServiceSrv.getUserName();
    this.role = this.ServiceSrv.getRole();
    if(this.role == "Admin"){
      this.GetAllUsers();
    }else{
      this.GetAllAdmin();
    }
  }
  GetAllUsers() {
    this.ServiceSrv.Getallusers(this.societyId).subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);

      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  GetAllAdmin() {
    this.ServiceSrv.GetAllAdmin().subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  Delete(name: string) {
    const isconfirm = confirm("You Sure Want to Delete?");
    console.log(name);

    if (isconfirm) {
      this.ServiceSrv.DeleteUser(name).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res) {
            this.toastr.success("User deleted Successfully", "Success");
          }
          else {
            this.toastr.error(name + " having Flat or remove from Flat first", "Error");
          }
          if(this.role == "Admin"){
            this.GetAllUsers()
          }else{
            this.GetAllAdmin();
          }
        },
        error: (err: any) => {
          this.toastr.error(" Some Error Occured", "Error");
          if(this.role == "Admin"){
            this.GetAllUsers()
          }else{
            this.GetAllAdmin();
          }
          // console.log(err);
        }
      })
    }
  }
}
