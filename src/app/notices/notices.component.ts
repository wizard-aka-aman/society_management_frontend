import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notices',
  imports: [CommonModule,DatePipe],
  templateUrl: './notices.component.html',
  styleUrl: './notices.component.css'
})
export class NoticesComponent   {
  notices = [
    {
      id: 1,
      title: 'Water Supply Maintenance',
      description: 'Water supply will be interrupted from 10 AM to 4 PM on 5th June.',
      postedAt: new Date('2025-06-01'),
    },
    {
      id: 2,
      title: 'Annual General Meeting',
      description: 'AGM scheduled on 25th May. All residents are requested to attend.',
      postedAt: new Date('2025-05-15'),
    },
  ];

  

  viewNotice(notice: any) {
    // Open modal or navigate to notice detail page
    console.log('Viewing notice', notice);
  }
}

