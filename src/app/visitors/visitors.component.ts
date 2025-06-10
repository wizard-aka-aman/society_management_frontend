import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-visitors',
  imports: [CommonModule],
  templateUrl: './visitors.component.html',
  styleUrl: './visitors.component.css'
})
export class VisitorsComponent   {
  visitors = [
    // {
    //   id: 1,
    //   name: 'John Doe',
    //   contact: '9876543210',
    //   visitDate: new Date('2025-06-12'),
    //   visitTime: '3:00 PM - 5:00 PM',
    //   purpose: 'Friend visit',
    //   vehicleNo: 'MH12 AB 1234',
    //   status: 'Approved',
    // },
    // {
    //   id: 2,
    //   name: 'Jane Smith',
    //   contact: '9876543211',
    //   visitDate: new Date('2025-06-15'),
    //   visitTime: '11:00 AM - 12:00 PM',
    //   purpose: 'Delivery',
    //   vehicleNo: '',
    //   status: 'Pending',
    // },
  ];
 
}

