import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notices',
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './notices.component.html',
  styleUrl: './notices.component.css'
})
export class NoticesComponent {
  notices: any[] = [];
  societyId: number = 0;
  role: string = ""
  ModalVisible = false
  showTitle: string = ""
  showdescription: string = ""
  showcreatedAt: any
  title: string = ""
  description: string = "";
  formData: any = {};
  noticeId: number = 0;
  isEditAble: boolean = false;
  constructor(private ServiceSrv: ServiceService, private toastr: ToastrService) {
    this.societyId = this.ServiceSrv.getSocietyId();
    this.role = this.ServiceSrv.getRole();
    this.fetchNotices();
  }


  viewNotice(notice: any) {
    // Open modal or navigate to notice detail page
    this.ModalVisible = true;
    console.log(notice);
    this.showTitle = notice.title;
    this.showdescription = notice.description;
    this.showcreatedAt = notice.createdAt;
    this.noticeId = notice.noticesId;

  }
  fetchNotices() {
    this.ServiceSrv.GetAllNotices(this.societyId).subscribe({
      next: (response:any) => {
        this.notices = response;
        console.log(this.notices);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  Close() {
    this.ModalVisible = false;
  }
  CloseEdit(){
    this.isEditAble = false
  }
  SaveEdit(){
    this.title = this.showTitle  
    this.description = this.showdescription  
    this.isEditAble = false;
    this.ModalVisible = false;
    if (this.title == "" || this.description == "") {
      this.toastr.error("please fill the form ");
      return;
    }
   this.formData.Title = this.title;
    this.formData.Description = this.description;
    this.formData.SocietyId = this.societyId;
    console.log(this.formData);
     this.ServiceSrv.UpdateNotices(this.noticeId, this.formData).subscribe({
      next: (res:any) => {
        console.log(res);
        this.toastr.success("Notice Updated");
        this.fetchNotices()
        this.ModalVisible = false;
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }
  SendNotice() {
    if (this.title == "" || this.description == "") {
      this.toastr.error("please fill the form ");
      return;
    }
    this.formData.Title = this.title;
    this.formData.Description = this.description;
    this.formData.SocietyId = this.societyId;
    console.log(this.formData);

    this.ServiceSrv.AddNotices(this.formData).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success("success", "Notice Added");
        this.fetchNotices()
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Some Error Occur", "error");
      }
    })
  }
  Delete() {
    this.ServiceSrv.DeleteNotices(this.noticeId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success("Notice Deleted");
        this.fetchNotices()
        this.ModalVisible = false;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  Edit() {
    this.isEditAble = true;   
  }

}

