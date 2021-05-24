import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MyservicesService } from 'src/app/services/myservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logo = "assets/images/ekart_logo.png";
  loginimg = "assets/images/login.jpg";

  loginform =new FormGroup({
    email : new FormControl(''),
    password : new FormControl('')
    })

  public allusers:any;

  constructor(
    private router: Router,
    private service: MyservicesService
  ) { }

  ngOnInit(): void {
    this.getalluserdata();
  }

  getalluserdata() {
    this.service.getusersdata().subscribe(data => {
      this.allusers = data;
      console.log(this.allusers)
    })
  }

  login() {
      for(let i=0; i<this.allusers.length; i++){
      if(this.loginform.value.email==this.allusers[i].email && this.loginform.value.password==this.allusers[i].password){
        localStorage.setItem("home","pass");
        localStorage.setItem("authuser",JSON.stringify(this.allusers[i]));
        this.router.navigateByUrl('home');
        console.log(true, "user logged in");
      }
    };
  }

  gotoregister() {
    this.router.navigateByUrl('register');
  }

}
