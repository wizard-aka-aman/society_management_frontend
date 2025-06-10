import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-flats',
  imports: [CommonModule, FormsModule],
  templateUrl: './flats.component.html',
  styleUrl: './flats.component.css'
})
export class FlatsComponent {
  Block: string = "";
  FloorNumber: number = 0;
  FlatNumber: number = 0;
  Flats: any[] = []
  formData: any = {};
  societyId: number = 0;
  Name : string = "";


  constructor(private ServiceSrv:ServiceService , private toastr: ToastrService) {
    this.societyId = this.ServiceSrv.getSocietyId();
    this.Name = this.ServiceSrv.getUserName();
   this.fetchFlat();
  }


  saveFlat() {
    this.formData.Block = this.Block;
    this.formData.FloorNumber = this.FloorNumber;
    this.formData.FlatNumber = this.FlatNumber;
    this.formData.SocietyId = this.societyId;
    this.formData.Name= this.Name;

    console.log(this.formData);
    if(this.Block == "" || this.FloorNumber <0 || this.FlatNumber <1 ){
      this.toastr.error('Please fill all fields and enter valid values', 'Error');
      return;
    }
    
    this.ServiceSrv.AddFlat(this.formData).subscribe({
      next: (res:any) =>{
        console.log(res);

        this.toastr.success("Flat added Successfully", "Success");
        this.fetchFlat();
      },
      error: (err:any) =>{ 
        this.toastr.error("Flat Number Already Exist", "error");
        console.log(err);
      }
    })

  }
  fetchFlat(){
     this.ServiceSrv.GetAllFlats(this.societyId).subscribe({
      next : (res:any)=>{
        this.Flats = res;
        console.log(res);
        
      },
      error : (err:any)=>{
        console.log(err);
      }
    })
  }



  viewComplaint(complaint: any) {
    // Open modal or navigate to details
    console.log('Viewing complaint:', complaint);
  }

}
