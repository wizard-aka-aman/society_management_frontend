import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bills',
  imports: [DatePipe , CommonModule],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'
})
export class BillsComponent {

  bills = [
    {
      month: new Date('2025-05-01'),
      amount: 1200,
      dueDate: new Date('2025-06-10'),
      status: 'Paid',
      billId: 'BILL202505',
    },
    {
      month: new Date('2025-04-01'),
      amount: 1200,
      dueDate: new Date('2025-05-10'),
      status: 'Unpaid',
      billId: 'BILL202504',
    },
  ];

  ngOnInit() {
    // Replace with service call
    // this.billService.getUserBills().subscribe(data => this.bills = data);
  }

  viewBill(bill: any) {
    // Show modal or download PDF
    console.log('Viewing', bill.billId);
  }

  payNow(bill: any) {
    // Redirect to payment gateway or show payment modal
    console.log('Paying', bill.billId);
  }
}
