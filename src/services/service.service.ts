import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  isloading = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {

  }

  //  public BaseUrl :string= 'https://wizardaman.bsite.net';
  public BaseUrl: string = 'https://localhost:7019';

  //api's

  login(item: any) {
    return this.http.post(`${this.BaseUrl}/login`, item);
  }
  register(item: any) {
    return this.http.post(`${this.BaseUrl}/register`, item);
  }
  logout() {
    return this.http.get(`${this.BaseUrl}/logout`);
  }
  GetUserDetail(name: string) {
    return this.http.get(`${this.BaseUrl}/GetUserDetail/${name}`);
  }
  AddFlat(item: any) {
    return this.http.post(`${this.BaseUrl}/Flats/AddFlats`, item)
  }
  GetAllFlats(item: number) {
    return this.http.get(`${this.BaseUrl}/Flats/GetAllFlats/${item}`)
  }
  GetMyComplaints(name: string) {
    return this.http.get(`${this.BaseUrl}/Complaints/GetMyComplaints/${name}`)
  }
  GetAllComplaints(id: number) {
    return this.http.get(`${this.BaseUrl}/Complaints/GetAllComplaints/${id}`)
  }
  AddComplaints(item: any) {
    return this.http.post(`${this.BaseUrl}/Complaints/AddComplaints`, item)
  }

  UpdateComplaints(item: any, id: number) {
    return this.http.put(`${this.BaseUrl}/Complaints/UpdateComplaints/${id}`, item)
  }
  DeleteComplaints(id: number) {
    return this.http.delete(`${this.BaseUrl}/Complaints/DeleteComplaints/${id}`)
  }
  TotalComplaints(id: number) {
    return this.http.get(`${this.BaseUrl}/Complaints/TotalComplaints/${id}`)
  }
  TotalCompletedComplaints(id: number) {
    return this.http.get(`${this.BaseUrl}/Complaints/TotalCompletedComplaints/${id}`)
  }

  MyComplaintsNumber(name: string) {
    return this.http.get(`${this.BaseUrl}/Complaints/MyComplaintsNumber/${name}`);
  }
  MyCompletedComplaintsNumber(name: string) {
    return this.http.get(`${this.BaseUrl}/Complaints/MyCompletedComplaintsNumber/${name}`);
  }

  Getallusers(id: number) {
    return this.http.get(`${this.BaseUrl}/getallusers/${id}`)
  }
  UpdateFlats(id: number, item: any) {
    return this.http.put(`${this.BaseUrl}/Flats/UpdateFlats/` + id, item);
  }
  DeleteFlat(id: number) {
    return this.http.delete(`${this.BaseUrl}/Flats/DeleteFlats/` + id);
  }

  Getallunassignedusers(id: number) {
    return this.http.get(`${this.BaseUrl}/getallunassignedusers/${id}`)
  }
  DeleteUser(name: string) {
    return this.http.delete(`${this.BaseUrl}/DeleteUser/` + name);
  }

  registerAdmin(item: any) {
    return this.http.post(`${this.BaseUrl}/registerAdmin`, item);
  }
  AddBills(item: any) {
    return this.http.post(`${this.BaseUrl}/Bills/addbills`, item);
  }
  GetAllBills(id: number) {
    return this.http.get(`${this.BaseUrl}/Bills/GetAllBills/${id}`);
  }
  GetMyBills(name: string) {
    return this.http.get(`${this.BaseUrl}/Bills/GetMyBills/${name}`);
  }
  GetAllNotices(id: number) {
    return this.http.get(`${this.BaseUrl}/Notices/GetAllNotices/${id}`);
  }
  GetOneNotice(id: number) {
    return this.http.get(`${this.BaseUrl}/Notices/GetOneNotice/${id}`);
  }
  AddNotices(item: any) {
    return this.http.post(`${this.BaseUrl}/Notices/AddNotices`, item);
  }
  UpdateNotices(id: number, item: any) {
    return this.http.put(`${this.BaseUrl}/Notices/UpdateNotices/${id}`, item);
  }
  PayBill(id: number) {
    return this.http.get(`${this.BaseUrl}/Bills/PayBill/${id}`);
  }
  paymentStripe(item: any) {
    return this.http.post(`${this.BaseUrl}/Payment/CreateCheckout`, item);
  }
  DeleteNotices(id: number) {
    return this.http.delete(`${this.BaseUrl}/Notices/DeleteNotices/${id}`);
  }
  AdminTotalNumberBookings(id: number) {
    return this.http.get(`${this.BaseUrl}/Bookings/AdminTotalNumberBookings/${id}`);
  }
  MyTotalNumberBookings(name: string) {
    return this.http.get(`${this.BaseUrl}/Bookings/MyTotalNumberBookings/${name}`);
  }

  AddBooking(item: any) {
    return this.http.post(`${this.BaseUrl}/Bookings/AddBookings`, item);
  }
  GetAllBooking(id: number) {
    return this.http.get(`${this.BaseUrl}/Bookings/GetAllBookings/${id}`);
  }
  GetMyBooking(name: string) {
    return this.http.get(`${this.BaseUrl}/Bookings/GetMyBookings/${name}`);
  }
  UpdateBooking(id: number, item: any) {
    return this.http.put(`${this.BaseUrl}/Bookings/UpdateBookings/${id}/`, item)
  }
  DeleteBooking(id: number) {
    return this.http.delete(`${this.BaseUrl}/Bookings/DeleteBookings/${id}`);
  }
  GetAllVisitors(id: number) {
    return this.http.get(`${this.BaseUrl}/Visitors/GetAllVisitors/${id}`);
  }
  GetOneVisitors(id: number) {
    return this.http.get(`${this.BaseUrl}/Visitors/GetOneVisitors/${id}`);
  }
  UpdateVisitor(id: number, item: any) {
    return this.http.put(`${this.BaseUrl}/Visitors/UpdateVisitors/${id}`, item);
  }
  DeleteVisitor(id: number) {
    return this.http.delete(`${this.BaseUrl}/Visitors/DeleteVisitors/${id}`);
  }
  AddVisitors(item: any) {
    return this.http.post(`${this.BaseUrl}/Visitors/AddVisitors`, item);
  }

  AddSociety(item: any) {
    return this.http.post(`${this.BaseUrl}/Society/AddSociety`, item);
  }
  GetAllSociety() {
    return this.http.get(`${this.BaseUrl}/Society/GetAll`);
  }
  UpdateSociety(id: number, item: any) {
    return this.http.put(`${this.BaseUrl}/Society/UpdateSociety/${id}`, item);
  }
  DeleteSociety(id: number) {
    return this.http.delete(`${this.BaseUrl}/Society/DeleteSociety/${id}`);
  }
  GetUsernameWithNull() {
    return this.http.get(`${this.BaseUrl}/GetUsernameWithNull`);
  }
  GetAllAdmin() {
    return this.http.get(`${this.BaseUrl}/GetAllAdmin`);
  }
  GetSocietyDetail(id: number) {
    return this.http.get(`${this.BaseUrl}/GetSocietyDetail/${id}`);
  }
  GetAllAdminOfSociety(id: number) {
    return this.http.get(`${this.BaseUrl}/GetAllAdminOfSociety/${id}`);
  }
  changeSocietyName(id: number, item: any) {
    return this.http.put(`${this.BaseUrl}/Society/changeSocietyName/${id}`, item);
  }
  VerifyPayment(id: string) {
    return this.http.get(`${this.BaseUrl}/Payment/verify-payment?sessionId=${id}`)
  }
  SendEmailForBill(item: any) {
    return this.http.post(`${this.BaseUrl}/api/Email/SendEmail`, item)
  }






  //functions
  getUserName() {
    let token = localStorage.getItem('jwt');

    if (token != null) {
      const decodedToken: any = jwtDecode(token);
      const username = decodedToken.UserName;
      // console.log(decodedToken);

      return username;
    }
    return token;
  }
  getRole() {
    let token = localStorage.getItem('jwt');

    if (token != null) {
      const decodedToken: any = jwtDecode(token);
      const role = decodedToken.Role;
      // console.log(decodedToken);

      return role;
    }
    return token;
  }
  getEmail() {
    let token = localStorage.getItem('jwt');

    if (token != null) {
      const decodedToken: any = jwtDecode(token);
      const Email = decodedToken.Email;
      // console.log(decodedToken);

      return Email;
    }
    return token;
  }
  getSocietyId() {
    let token = localStorage.getItem('jwt');

    if (token != null) {
      const decodedToken: any = jwtDecode(token);
      const Society = decodedToken.Society;
      // console.log(decodedToken);

      return Society;
    }
    return token;
  }

  checkAuthentication(): boolean {
    const token = localStorage.getItem('jwt');
    const isuserName = this.getUserName();


    if (token) {
      // Additional validation logic can be added here 
      if (isuserName != null) {
        return true;
      }
      return false;
    } else {
      if (token) {
        location.reload();
      }
      localStorage.removeItem("jwt");
      return false;
    }
  }

  show() {
    console.log("Show");
    this.isloading.next(true);
  }
  hide() {
    console.log('hide');
    this.isloading.next(false);
  }
}
