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
  bills: any[] =[];
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
  allBills:any[] =[];
  filterBasisOnPaid :string ="all"
  filterBasisOnFlatNumber :any = null
filterBasisOnStartingDate: any;
filterBasisOnEndingDate: any;
filterBasisOnDate:any = "DueDate"
totalBill : number=0

  constructor(private ServiceSrv: ServiceService, private toastr: ToastrService , private route : Router) {
 
    
    this.role = this.ServiceSrv.getRole();
    this.usernameForMyBills = this.ServiceSrv.getUserName();

    this.societyId = this.ServiceSrv.getSocietyId();
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
  }
  filter(){ 
    this.totalBill = 0
    console.log(this.filterBasisOnPaid);
    
    console.log(this.filterBasisOnFlatNumber);
    console.log(this.filterBasisOnStartingDate);
    console.log(this.filterBasisOnEndingDate);
    
    this.bills = this.allBills;
      this.bills =  this.bills.filter(e => {
        if(this.filterBasisOnPaid == 'all'){
         return e
        }
        else if(this.filterBasisOnPaid == 'paid'){
          return e.isPaid 
        }
        else if(this.filterBasisOnPaid == 'unpaid'){
          return !e.isPaid  
        }
         return false;
  })

  this.bills = this.bills.filter(e =>{
    if(this.filterBasisOnFlatNumber == null){  
      return e
    }
    else{
      return e.flats.flatNumber == this.filterBasisOnFlatNumber
    }
    
  })
  this.bills = this.bills.filter(e => {
    if(this.filterBasisOnStartingDate == undefined || this.filterBasisOnEndingDate == undefined || this.filterBasisOnStartingDate == null || this.filterBasisOnStartingDate == '' || this.filterBasisOnEndingDate == null || this.filterBasisOnEndingDate == ''){
      return e;
    }else if(this.filterBasisOnStartingDate>= this.filterBasisOnEndingDate){
      return e;
    }else if(this.filterBasisOnDate == "DueDate"){
      return e.dueDate >= this.filterBasisOnStartingDate && e.dueDate <= this.filterBasisOnEndingDate;
    }else if(this.filterBasisOnDate == "GenerateDate"){
      return e.generatedDate >= this.filterBasisOnStartingDate && e.generatedDate <= this.filterBasisOnEndingDate;
    }else if(this.filterBasisOnDate == "PaidDate"){
      return e.paidDate >= this.filterBasisOnStartingDate && e.paidDate <= this.filterBasisOnEndingDate;
    }
  })
    console.log(this.bills);

     this.bills.forEach((e:any)=> this.totalBill+= e.amount );
     console.log(this.totalBill);
     

    
  }
  viewBill(Bill: any) {
    // View full Bill details
    console.log(Bill);
    this.selectedBill = Bill;
    this.status = Bill.status
  }

  CloseViewBill(){
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
    this.paymentStripeForm.title =  "Bill Name -"+(bill.type).toString();
    this.paymentStripeForm.description = "Flat Number - "+ (bill.flats.flatNumber).toString();
    this.paymentStripeForm.billId = bill.billsId;
      console.log(this.paymentStripeForm);
      
    this.ServiceSrv.paymentStripe(this.paymentStripeForm).subscribe({
      next: (res: any) => {
        console.log(res);
       window.location.href = res.url;
      },
      error: (err) =>{
        console.log(err);
        this.toastr.error('Error paying bill');
      }
    })
  }
  AddBill() {
    this.type = this.type.trim();
    if (this.name == "" || this.type == "" || this.amount < 1) {
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
       this.totalBill = 0
    this.ServiceSrv.GetAllBills(this.societyId).subscribe({
      next: (res:any) => {
        console.log(res);
        this.allBills = res; // fetchedBills is the original API response
        this.bills = res
        this.bills.forEach((e:any)=> this.totalBill+= e.amount );
     console.log(this.totalBill);
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
      next: (res:any) => {
        console.log("my bills");
        console.log(res);
        this.bills = res
        this.allBills = res; // fetchedBills is the original API response
        this.bills.forEach((e:any)=> this.totalBill+= e.amount );
     console.log(this.totalBill);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
