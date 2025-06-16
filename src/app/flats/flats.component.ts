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
  Name: string = "";
  allUsers: any[] = [];
  editBlock: string = "";
  editFloorNumber: number = 0;
  editFlatNumber: number = 0;
  editFlatId: number = 0;
  editName: string = "";
  editFormData : any = {}
editFlatUsername :string = ""


  constructor(private ServiceSrv: ServiceService, private toastr: ToastrService) {
    this.societyId =   this.ServiceSrv.getSocietyId();
    this.fetchFlat();
    this.Getallunassignedusers()
   
  }
  

  saveFlat() {
    this.formData.Block = this.Block;
    this.formData.FloorNumber = this.FloorNumber;
    this.formData.FlatNumber = this.FlatNumber;
    this.formData.SocietyId = this.societyId;
    this.formData.Name = this.Name;

    console.log(this.formData);
    if (this.Block == "" || this.FloorNumber < 0 || this.FlatNumber < 1) {
      this.toastr.error('Please fill all fields and enter valid values', 'Error');
      return;
    }

    this.ServiceSrv.AddFlat(this.formData).subscribe({
      next: (res: any) => {
        console.log(res);

        this.toastr.success("Flat added Successfully", "Success");
        this.fetchFlat();
      },
      error: (err: any) => {
        this.toastr.error("Flat Number Already Exist", "error");
        console.log(err);
      }
    })

  }
  fetchFlat() {
    this.ServiceSrv.GetAllFlats(this.societyId).subscribe({
      next: (res: any) => {
        this.Flats = res;
        console.log(res);

      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  openViewModal(flat: any) {
    console.log(flat);
    this.editBlock = flat.block
    this.editFloorNumber = flat.floorNumber
    this.editFlatNumber = flat.flatNumber
    this.editFlatId = flat.flatsId
    this.editFlatUsername = flat.users?.name
    console.log(this.editFlatUsername);
    
  }

  SaveEdit() {
     this.editFormData.Block = this.editBlock;
    this.editFormData.FloorNumber = this.editFloorNumber;
    this.editFormData.FlatNumber = this.editFlatNumber;
    this.editFormData.SocietyId = this.societyId;
    this.editFormData.Name = this.editName;

    console.log(this.editFormData);
    if (this.editBlock == "" || this.editFloorNumber < 0 || this.editFlatNumber < 1) {
      this.toastr.error('Please fill all fields and enter valid values', 'Error');
      return;
    }
    this.ServiceSrv.UpdateFlats(this.editFlatId , this.editFormData).subscribe({
      next: (res: any) =>{
        console.log(res); 
        this.fetchFlat();
        this.Getallunassignedusers();
        this.editName = "" ;
        this.editFlatUsername = ""
        if(!res){
          this.toastr.error("Flat Number Already Exist", "error");
        }else{
          this.toastr.success("Flat updated Successfully", "Success");
        }
      },
      error: (err: any) =>{
         this.toastr.error  ("Flat Not Update", "Error");
        console.log(err);
      }
    })
  }
  Delete(id:number){
     const isconfirm = confirm("You Sure Want to Delete?");
    if(isconfirm){
      this.ServiceSrv.DeleteFlat(id).subscribe({
      next: (res: any) =>{
        console.log(res);
        this.toastr.success("Flat deleted Successfully", "Success");
        this.fetchFlat();
        this.Getallunassignedusers()
      },
      error: (err: any) =>{
        console.log(err);
      }
    })
    }
  }

  viewComplaint(complaint: any) {
    // Open modal or navigate to details
    console.log('Viewing complaint:', complaint);
  }
  Getallunassignedusers(){
     this.ServiceSrv.Getallunassignedusers(this.societyId).subscribe({
      next: (res:any) => {
        console.log(res);
        this.allUsers = res 
        console.log(this.allUsers);
        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
