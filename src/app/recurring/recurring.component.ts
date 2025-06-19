import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-recurring',
  imports: [CommonModule],
  templateUrl: './recurring.component.html',
  styleUrl: './recurring.component.css'
})
export class RecurringComponent {

    recurring:any={};
    societyId :number =0
 constructor(private ServiceSrv: ServiceService) {
  this.societyId = this.ServiceSrv.getSocietyId();
      this.ServiceSrv.GetAllRecurring(this.societyId).subscribe({
        next: (data:any) =>{
          this.recurring = data;
          console.log(data);
        },
        error: (err) =>{
          console.log(err);
        }
      })
  }

  Delete(){

  }
}
