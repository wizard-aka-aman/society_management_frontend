import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-complaints',
  imports: [CommonModule],
  templateUrl: './complaints.component.html',
  styleUrl: './complaints.component.css'
})
export class ComplaintsComponent { 
  complaints = [
    {
      subject: 'Water Leakage in Parking',
      status: 'In Progress',
      createdAt: new Date('2025-06-05'),
    },
    {
      subject: 'Gate Security Issue',
      status: 'Resolved',
      createdAt: new Date('2025-05-20'),
    },
  ];

 

  viewComplaint(complaint: any) {
    // Open modal or navigate to details
    console.log('Viewing complaint:', complaint);
  }

  openComplaintForm() {
    // Open modal or navigate to /complaints/new
  }
 
}
