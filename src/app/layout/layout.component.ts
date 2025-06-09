import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet , RouterLink ,RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent { 
  
  title = 'Angular-Pad'; 
  userName :string = "";  
  constructor(private ServiceSrv : ServiceService , private router : Router){
    this.userName = this.ServiceSrv.getUserName();
  } 
SideBar(){
  const sidebar = document.getElementById('sidebar'); 
    sidebar?.classList.toggle('show'); 
    
}


  onLogout(){
    const isconfirm = confirm("You Sure Want to Logout?");
   if(isconfirm){
    this.ServiceSrv.logout().subscribe({
      next: (res) => {
      console.log(res);
      localStorage.removeItem("userName");
      localStorage.removeItem("password");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("jwt");
      this.router.navigateByUrl('/login')
    }});
   }
  } 

}
