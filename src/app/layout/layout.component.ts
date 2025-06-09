import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent { 
  
  title = 'Angular-Pad'; 
  userName :any;  
  constructor(private ServiceSrv : ServiceService , private router : Router){
    this.userName = this.ServiceSrv.getUserName();
 
    
    
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
