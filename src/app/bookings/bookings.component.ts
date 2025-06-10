import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bookings',
  imports: [CommonModule ,DatePipe],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent {
  bookings = [
    {
      facility: 'Community Hall',
      date: new Date('2025-06-10'),
      timeSlot: '6:00 PM - 9:00 PM',
      status: 'Approved',
    },
    {
      facility: 'Gym',
      date: new Date('2025-06-12'),
      timeSlot: '8:00 AM - 9:00 AM',
      status: 'Pending',
    },{
      facility: 'Laundry Machines',
      date: new Date('2025-06-12'),
      timeSlot: '8:00 AM - 9:00 AM',
      status: 'Pending',
    }
  ];

  ngOnInit() {
    // this.bookingService.getMyBookings().subscribe(data => this.bookings = data);
  }

  openBookingForm() {
    // Navigate or open modal to add new booking
  }

  viewBooking(booking: any) {
    // View full booking details
  }

  cancelBooking(booking: any) {
    // Confirm and send cancel request
    console.log('Cancelling', booking);
  }
}

