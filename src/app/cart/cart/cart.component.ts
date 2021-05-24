import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyservicesService } from 'src/app/services/myservices.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  logo = "assets/images/ekart_logo.png";
  public auser: any;
  public total = 0;
  public cart: any;
  public ucart: any;
  public usercart = [];

  constructor(
    private service: MyservicesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getauthuserdata();
  }

  getauthuserdata() {
    let obj = JSON.parse(localStorage.getItem("authuser"));
    this.service.getusersdata().subscribe(data=>{
      this.ucart = data;
      this.ucart.forEach(element => {
        if(element.id == obj.id){
          this.usercart=element.cart;
          console.log(this.usercart);
          this.usercart.forEach(element =>{
            this.total += element.quantity*element.price;
          })
        }
    })
  })
  }

  gotologout() {
    this.router.navigateByUrl('login');
    localStorage.clear();
  }

  gotoproducts() {
    this.router.navigateByUrl('products');
  }

  gotohome() {
    this.router.navigateByUrl('home');
  }

}
