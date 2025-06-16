import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-success',
  imports: [RouterLink],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent {
  billId: number = 0;
  constructor(private route: ActivatedRoute, private ServiceSrv: ServiceService) {
    this.route.queryParamMap.subscribe({
      next: (params) => {
        console.log(params.get('billId'));
        this.billId = Number(params.get('billId'));

        if (this.billId != 0) {
          
          this.ServiceSrv.PayBill(this.billId).subscribe(({
            next: (response) => {
              console.log(response);
            },
            error: (error) => {
              console.log(error);
            }
          }))

        }
      }
    })
  }
}
