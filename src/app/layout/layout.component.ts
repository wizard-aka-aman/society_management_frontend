import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  title = 'Angular-Pad';
  userName: string = "";
  Role: string = ""
  profileEmail: string = ""
  profileBlock: string = ""
  profileFlatNumber: number = 0
  profileFloorNumber: number = 0
  flatProfile: any  = {};
  societyName : string =""
  societyId :number =0 ;
  
  constructor(private ServiceSrv: ServiceService, private router: Router) {
    this.profileEmail = this.ServiceSrv.getEmail();
    this.societyId = this.ServiceSrv.getSocietyId();
    this.userName = this.ServiceSrv.getUserName();
    this.Role = this.ServiceSrv.getRole();
    console.log(this.userName);
    this.ServiceSrv.GetSocietyDetail(this.societyId).subscribe({
      next: (data:any) =>{
        console.log(data[0]);  
        this.societyName = data[0].name;
        console.log(this.societyName); 
      },
      error: (error: any) =>{
        console.log(error);
      }
    })
    
    this.ServiceSrv.GetUserDetail(this.userName).subscribe({
      next: (data: any) => {
        this.flatProfile = data.flat;
        console.log(data.flat);  
        
        
      },
      error: (error) => {
        console.error(error);
      }
    }) 
  } 
  SideBar() {
    const sidebar = document.getElementById('sidebar');
    sidebar?.classList.toggle('show');

  }


  onLogout() {
    const isconfirm = confirm("You Sure Want to Logout?");
    if (isconfirm) {
      this.ServiceSrv.logout().subscribe({
        next: (res) => {
          console.log(res);
          localStorage.removeItem("userName");
          localStorage.removeItem("password");
          localStorage.removeItem("username");
          localStorage.removeItem("email");
          localStorage.removeItem("jwt");
          this.router.navigateByUrl('/login')
        }
      });
    }
  }

}
