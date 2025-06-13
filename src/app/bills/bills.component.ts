import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bills',
  imports: [DatePipe, CommonModule, FormsModule],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'
})
export class BillsComponent {

  role: string = ""
  bills: any;
  flatNumber: number = 0
  type: string = "";
  amount: number = 0;
  dueDate: any;
  formData: any = {};
  name: string = ""
  societyId: number = 0 
  getAllFlats :any[] =[];
  selectedBill: any;
  status: any;
  usernameForMyBills :string = ""
  constructor(private ServiceSrv: ServiceService, private toastr: ToastrService) {
    this.role = this.ServiceSrv.getRole();
    this.usernameForMyBills = this.ServiceSrv.getUserName();
     
    this.societyId = this.ServiceSrv.getSocietyId();
    if (this.role == "Admin") {
      this.fetchBills();
    } else {
      this.fetchMyBills();
    }
    this.ServiceSrv.GetAllFlats(this.societyId).subscribe({
      next: (res:any) =>{
        this.getAllFlats = res;
        console.log(res);
        this.getAllFlats = this.getAllFlats.filter((e:any )=> e.users != null);
        console.log(this.getAllFlats);
        
      },
      error: (err) =>{
        console.log(err);

      }
    })
  }
 
   viewBooking(Bill: any) {
    // View full Bill details
    console.log(Bill);
    this.selectedBill = Bill; 
    this.status = Bill.status 
  }

  viewBill(bill: any) {
    // Show modal or download PDF
    console.log('Viewing', bill.billId);
  }

  payNow(bill: any) {
    // Redirect to payment gateway or show payment modal
    console.log('Paying', bill.billId);
  }
  AddBill() {
    if (this.name=="" || this.type == "" || this.amount < 1) {
      this.toastr.error('Please fill all the correctly fields', "error");
      return;
    } 
    this.formData.Type = this.type;
    this.formData.Amount = this.amount;
    this.formData.DueDate = this.dueDate;
    this.formData.Name = this.name;
    console.log(this.formData);
    this.ServiceSrv.AddBills(this.formData).subscribe({
      next: (res) => {
        console.log(res);

        this.toastr.success('Bill Added Successfully', "success");
        this.fetchBills();

      },
      error: (err) => {
        console.log(err);
      }
    })

  }
  fetchBills() {
    this.ServiceSrv.GetAllBills(this.societyId).subscribe({
      next: (res) => {
        console.log(res);
        this.bills = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  fetchMyBills() {
    console.log(this.name);
    
    this.ServiceSrv.GetMyBills(this.usernameForMyBills).subscribe({
      next: (res) => {
        console.log("my bills");
        console.log(res);
        this.bills = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
