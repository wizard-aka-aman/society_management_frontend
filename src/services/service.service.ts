import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) {

  }

  //  public BaseUrl :string= 'https://wizardaman.bsite.net';
   public BaseUrl :string= 'https://localhost:7019';
   
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
  AddFlat(item:any){
    return this.http.post(`${this.BaseUrl}/Flats/AddFlats` , item)
  }
  GetAllFlats(item:number){
    return this.http.get(`${this.BaseUrl}/Flats/GetAllFlats/${item}` )
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
}
