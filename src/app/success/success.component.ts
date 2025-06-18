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
    this.route.queryParamMap.subscribe((params) => {
      const sessionId = params.get('session_id');
      if (sessionId) {
        this.ServiceSrv.VerifyPayment(sessionId).subscribe({
          next: (res: any) => {
            console.log("Payment verified and bill paid", res);
          },
          error: (err: any) => {
            console.error("Payment verification failed", err);
          }
        });
      }
    });
  }
} 
