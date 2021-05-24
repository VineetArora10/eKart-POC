import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyservicesService {

  constructor(
    private http: HttpClient
  ) { }

  send=new BehaviorSubject({});
  collect=<any>this.send.asObservable();

  getproducts() {
    return this.http.get("http://localhost:3000/products");
  }

  addusers(data) {
    return this.http.post("http://localhost:3000/users", data);
  }

  getusersdata() {
    return this.http.get("http://localhost:3000/users");
  }

  updateusersdata(id, data) {
    return this.http.put("http://localhost:3000/users/"+`${id}`,data)
  }
}
