import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bookings',
  imports: [CommonModule, DatePipe, ReactiveFormsModule, FormsModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent {
  bookings: any;
  role: string = ""
  bookingForm: FormGroup = new FormGroup({
    facility: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });
  todayDate: any;
  formData: any = {}
  name: string = "";
  societyId: number = 0;
  selectedBooking: any;
  editFormData: any = {}
  status: string = ""
  reason: string = ""
  filterBasisOnStatus: string = "All";
  AllBooking: any;
  constructor(private ServiceSrv: ServiceService, private toastr: ToastrService) {
    this.role = this.ServiceSrv.getRole();
    this.name = this.ServiceSrv.getUserName()
    this.societyId = this.ServiceSrv.getSocietyId()
    this.FetchBookings()
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

  SendBooking() {
    this.formData = this.bookingForm.value;
    this.formData.Name = this.name;
    this.formData.status = "Pending"
    this.bookingForm.value.facility = this.bookingForm.value.facility.trim();
    console.log(this.bookingForm.value);
    if (this.bookingForm.value.facility == "" || this.bookingForm.value.endTime == "" || this.bookingForm.value.startTime == "") {
      this.toastr.error('Please fill all the fields', 'Error');
      return;
    }

    this.ServiceSrv.AddBooking(this.bookingForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res) {
          this.toastr.success("Booking  Added Successfully", "success");
          this.bookingForm.reset();
          this.FetchBookings()
          this.formData = {}
        }
        else {
          this.toastr.error(this.formData.Name + " not a flat owner or Timing is not correct", "error");

        }
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Booking Added Falied", "success");
        this.FetchBookings()
      }
    })

  }

  viewBooking(booking: any) {
    // View full booking details
    console.log(booking);
    this.selectedBooking = booking;
    this.status = booking.status
    this.reason = booking?.reason
  }
  FetchBookings() {
    if (this.role == 'Admin') {
      this.ServiceSrv.GetAllBooking(this.societyId).subscribe({
        next: (response: any) => {
          console.log(response);
          this.bookings = response
          this.AllBooking = response
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    else {
      console.log(this.name);
      this.ServiceSrv.GetMyBooking(this.name).subscribe({
        next: (response: any) => {
          console.log(response);
          this.AllBooking = response
          this.bookings = response
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  cancelBooking(booking: any) {
    // Confirm and send cancel request
    console.log('Cancelling', booking);
    const pakka = confirm("Sure you want to Cancel this booking");
    if (pakka) {
      this.ServiceSrv.DeleteBooking(booking.bookingsId).subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success("Booking Cancelled Successfully", "success");
          this.FetchBookings() // Refresh the bookings list
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("Booking Cancelled Failed", "success");
          this.FetchBookings()
        }
      })
    }
  }
  filter() {
  console.log(this.filterBasisOnStatus); 
    this.bookings = this.AllBooking;
      this.bookings =  this.bookings.filter((e:any) => {
        if(this.filterBasisOnStatus == 'All'){
         return e
        }
        else if(this.filterBasisOnStatus == "Rejected"){
          return e.status == "Rejected" 
        }
        else if(this.filterBasisOnStatus == "Pending"){
          return e.status == "Pending"
        } 
          return e.status == "Approved" 
  })

 
    console.log(this.bookings);
  }
  Edit() {
    if (this.reason != null || this.reason != undefined) {
      this.reason = this.reason.trim();
    }
    if(this.status == "Rejected"){
      if (this.reason == "" || this.reason == null) {
        this.toastr.error("Please Enter Reason", "error");
        return;
      }
    }
    this.editFormData.Name = this.name;
    this.editFormData.endTime = this.selectedBooking.endTime;
    this.editFormData.facility = this.selectedBooking.facility;
    this.editFormData.startTime = this.selectedBooking.startTime;
    this.editFormData.status = this.status;
    this.editFormData.Reason = this.reason;
    console.log(this.editFormData);

    this.ServiceSrv.UpdateBooking(this.selectedBooking.bookingsId, this.editFormData).subscribe({
      next: (response: any) => {
        console.log(response);
        this.toastr.success("Booking Updated Successfully", "success");
        this.FetchBookings() // Refresh the bookings list

      },
      error: (error) => {
        console.log(error);
        this.toastr.error("Booking Update Failed", "success");
        this.FetchBookings() // Refresh the bookings list

      }
    })

  }
}

