import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bills',
  imports: [DatePipe, CommonModule, FormsModule],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'
})
export class BillsComponent {

  role: string = ""
  bills: any[] = [];
  flatNumber: number = 0
  type: string = "";
  amount: number = 0;
  dueDate: any;
  formData: any = {};
  name: string = ""
  societyId: number = 0
  getAllFlats: any[] = [];
  selectedBill: any;
  status: any;
  usernameForMyBills: string = ""
  paymentStripeForm: any = {}
  allBills: any[] = [];
  filterBasisOnPaid: string = "all"
  filterBasisOnFlatNumber: any = null
  filterBasisOnStartingDate: any;
  filterBasisOnEndingDate: any;
  filterBasisOnDate: any = "DueDate"
  totalBill: number = 0
  todayDate: any
  // FormForSendEmail: any = {}
  FormForScheduleEmail: any = {}
  societyDetail: any;
  addedBillId: number = 0
  recurring: any[] = [];

  constructor(private ServiceSrv: ServiceService, private toastr: ToastrService, private route: Router) {


    this.role = this.ServiceSrv.getRole();
    this.usernameForMyBills = this.ServiceSrv.getUserName();

    this.societyId = this.ServiceSrv.getSocietyId();
    this.ServiceSrv.GetSocietyDetail(this.societyId).subscribe({
      next: (res: any) => {
        this.societyDetail = res[0];
        console.log(res[0]);

      },
      error: (err) => {
        console.log(err);
      }
    })
    if (this.role == "Admin") {
      this.fetchBills();
    } else {
      this.fetchMyBills();
    }
    this.ServiceSrv.GetAllFlats(this.societyId).subscribe({
      next: (res: any) => {
        this.getAllFlats = res;
        console.log(res);
        this.getAllFlats = this.getAllFlats.filter((e: any) => e.users != null);
        console.log(this.getAllFlats);

      },
      error: (err) => {
        console.log(err);

      }
    })
    this.todayDate = this.getTodayDateAsString();
   
    console.log(this.todayDate);
    

  }

  getTodayDateAsString() {
    let date = new Date();
    var dd = date.getDate().toString();
    if (date.getDate() < 10) {
      dd = '0' + dd
    }
    var mm = (date.getMonth() + 1).toString();
    if ((date.getMonth() + 1) < 10) {
      mm = '0' + mm
    }
    return `${date.getFullYear()}-${mm}-${dd}`

  }
  filter() {
    this.totalBill = 0
    console.log(this.filterBasisOnPaid);

    console.log(this.filterBasisOnFlatNumber);
    console.log(this.filterBasisOnStartingDate);
    console.log(this.filterBasisOnEndingDate);

    this.bills = this.allBills;
    this.bills = this.bills.filter(e => {
      if (this.filterBasisOnPaid == 'all') {
        return e
      }
      else if (this.filterBasisOnPaid == 'paid') {
        return e.isPaid
      }
      else if (this.filterBasisOnPaid == 'unpaid') {
        return !e.isPaid
      }
      return false;
    })

    this.bills = this.bills.filter(e => {
      if (this.filterBasisOnFlatNumber == null) {
        return e
      }
      else {
        return e.flats.flatNumber == this.filterBasisOnFlatNumber
      }

    })
    this.bills = this.bills.filter(e => {
      if (this.filterBasisOnStartingDate == undefined || this.filterBasisOnEndingDate == undefined || this.filterBasisOnStartingDate == null || this.filterBasisOnStartingDate == '' || this.filterBasisOnEndingDate == null || this.filterBasisOnEndingDate == '') {
        return e;
      } else if (this.filterBasisOnStartingDate >= this.filterBasisOnEndingDate) {
        return e;
      } else if (this.filterBasisOnDate == "DueDate") {
        return e.dueDate >= this.filterBasisOnStartingDate && e.dueDate <= this.filterBasisOnEndingDate;
      } else if (this.filterBasisOnDate == "GenerateDate") {
        return e.generatedDate >= this.filterBasisOnStartingDate && e.generatedDate <= this.filterBasisOnEndingDate;
      } else if (this.filterBasisOnDate == "PaidDate") {
        return e.paidDate >= this.filterBasisOnStartingDate && e.paidDate <= this.filterBasisOnEndingDate;
      }
    })
    console.log(this.bills);

    this.bills.forEach((e: any) => this.totalBill += e.amount);
    console.log(this.totalBill);



  }
  viewBill(Bill: any) {
    // View full Bill details
    console.log(Bill);
    this.selectedBill = Bill;
    this.status = Bill.status
  }

  CloseViewBill() {
    this.selectedBill = null;
    this.status = null;
  }

  payNow(bill: any) {
    // Redirect to payment gateway or show payment modal
    console.log('Paying', bill);
    // this.ServiceSrv.PayBill(bill.billsId).subscribe({
    //   next: (res: any) =>{
    //     console.log(res);
    //     this.toastr.success('Bill paid successfully');
    //     if(this.role == 'Admin'){
    //       this.fetchBills();
    //     }else{
    //       this.fetchMyBills();
    //     }

    //   },
    //   error: (err) =>{
    //     console.log(err);
    //     this.toastr.error('Error paying bill');

    //   }
    // })
    this.paymentStripeForm.amount = (bill.amount).toString();
    this.paymentStripeForm.title = "Bill Name -" + (bill.type).toString();
    this.paymentStripeForm.description = "Flat Number - " + (bill.flats.flatNumber).toString();
    this.paymentStripeForm.billId = bill.billsId;
    console.log(this.paymentStripeForm);

    this.ServiceSrv.paymentStripe(this.paymentStripeForm).subscribe({
      next: (res: any) => {
        console.log(res);
        window.location.href = res.url;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Error paying bill');
      }
    })
  }
  AddBill() {

    this.type = this.type.trim();
    if (this.name == "" || this.type == "" || this.amount < 1 || this.dueDate == undefined) {
      this.toastr.error('Please fill all the correctly fields', "error");
      return;
    }
    this.formData.Type = this.type;
    this.formData.Amount = this.amount;
    this.formData.DueDate = this.dueDate;
    this.formData.Name = this.name;
    this.formData.NotifyBefore = this.societyDetail.notifyBefore;
    console.log(this.formData);

    // this.FormForSendEmail.Email = this.getAllFlats.filter((e: any) => e.users?.email && this.name == e.users?.name)[0].users?.email;
    // this.FormForSendEmail.Name = this.name;
    // this.FormForSendEmail.Type = this.type;
    // this.FormForSendEmail.Amount = this.amount;
    // this.FormForSendEmail.DueDate = this.dueDate;
    // console.log(this.FormForSendEmail);


    this.ServiceSrv.AddBills(this.formData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.addedBillId = res.billsId

        this.toastr.success('Bill Added Successfully', "success");

        this.fetchBills();
        // this.FormForScheduleEmail = this.FormForSendEmail;
        // console.log(this.FormForScheduleEmail);
        // this.FormForScheduleEmail.NotifyBefore = this.societyDetail.notifyBefore;
        // this.FormForScheduleEmail.BillId = this.addedBillId;
        // console.log(this.FormForScheduleEmail);
        // this.ServiceSrv.CreateScheduleJobs(this.FormForScheduleEmail).subscribe({
        //   next: (res) => {
        //     console.log(res);
        //   },
        //   error: (err) => {
        //     console.log(err);

        //   }
        // })
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error(err.error, "error\n Schedule Email Can't Send")
      }
    })

  }


  fetchBills() {
    this.totalBill = 0
    this.ServiceSrv.GetAllBills(this.societyId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.allBills = res; // fetchedBills is the original API response
        this.bills = res
        this.bills.forEach((e: any) => this.totalBill += e.amount);
        console.log(this.totalBill);
        
        this.ServiceSrv.GetAllRecurring(this.societyId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.recurring = res;
        this.recurring.forEach((rec: any) => {
           this.bills.forEach((bill:any)=>{
            if(rec.reccuringId === bill.billsId.toString()){
              bill.isStart = true;
            }
           })
        })
          
      },
      error: (err) => {
        console.log(err);
      }
    })
        
        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  fetchMyBills() {
    this.totalBill = 0
    console.log(this.name);

    this.ServiceSrv.GetMyBills(this.usernameForMyBills).subscribe({
      next: (res: any) => {
        console.log("my bills");
        console.log(res);
        this.bills = res
        this.allBills = res; // fetchedBills is the original API response
        this.bills.forEach((e: any) => this.totalBill += e.amount);
        console.log(this.totalBill);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  ReccuringJob(bill: any) {
    console.log(bill);
    this.ServiceSrv.CreateRecurringJob(bill.billsId, this.societyDetail.notifyBefore).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toastr.success("Recurring Job Created Successfully");
          this.fetchBills();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  StopReccuringJob(bill: any) {
    this.ServiceSrv.StopRecurringJob(bill.billsId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toastr.success("Recurring Job Stopped Successfully");
          this.fetchBills();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
