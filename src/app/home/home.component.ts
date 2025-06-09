import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core'; 

@Component({
  selector: 'app-home',
  imports: [DatePipe,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
userName = 'Aman';
  today = new Date();

  currentDue = 1200;
  complaintCount = 2;
  nextBooking = {
    amenityName: 'Clubhouse',
    date: new Date('2025-06-07T17:00:00'),
  };

  notices = [
    { title: 'Water supply off on June 7', createdAt: new Date() },
    { title: 'Society Meeting at 5 PM', createdAt: new Date('2025-06-05') },
  ];

  visitors = [
    { name: 'Rahul Sharma', visitReason: 'Friend', inTime: new Date(), outTime: null },
    { name: 'Flipkart Delivery', visitReason: 'Package', inTime: new Date(), outTime: new Date() },
  ];

  ngOnInit() {
    // fetch real data using service
  }
}
