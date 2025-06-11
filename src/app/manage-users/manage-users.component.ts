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
  users : any;
  societyId : number=0;
  name :string = ""
 constructor(private ServiceSrv: ServiceService, private toastr: ToastrService) {
    this.societyId =   this.ServiceSrv.getSocietyId(); 
   this.GetAllUsers();
   this.name = this.ServiceSrv.getUserName();
  }
  GetAllUsers(){
     this.ServiceSrv.Getallusers(this.societyId).subscribe({
      next: (data) =>{
        this.users = data;
        console.log(data);
        
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }

   Delete(name:string){
     const isconfirm = confirm("You Sure Want to Delete?");
     console.log(name);
     
    if(isconfirm){
      this.ServiceSrv.DeleteUser(name).subscribe({
      next: (res: any) =>{
        console.log(res);
        if(res){
          this.toastr.success("User deleted Successfully", "Success"); 
        }
        else{
          this.toastr.error(name+" having Flat or remove from Flat first", "Error");
        }
        this.GetAllUsers()
      },
      error: (err: any) =>{
         
        console.log(err);
      }
    })
    }
  }
}
