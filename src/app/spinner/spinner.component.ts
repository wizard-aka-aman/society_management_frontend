import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  isloading :any;
  constructor(private ServiceSrv : ServiceService) { 
    this.ServiceSrv.isloading.subscribe({
      next:(res:any)=>{
        this.isloading = res;
      }
    })
  }
}
