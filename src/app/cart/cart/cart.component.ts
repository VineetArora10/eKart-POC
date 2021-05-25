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
  public mycart = [];
  public ucart: any;
  public usercart = [];
  public curr: any;
  public vcart : any;
  public clicked = false;
  public numcart: any;
  public name: any;
  public email: any;
  public message: any;
  public msg: any;
  public city: any;

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
          this.vcart = element;
          this.usercart=element.cart;
          console.log(this.usercart);
          this.numcart = this.usercart.length;
          this.usercart.forEach(element =>{
            this.total+=element.quantity*element.price;
            this.msg += element.productname + ", "; 
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
  
  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_i8havmt', 'template_0f3osze', e.target as HTMLFormElement, 'user_zcxt2aol1gKAdqlEdOXKS')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

  checkout() {
    console.log(this.vcart);
    this.name = this.vcart.name;
    this.email = this.vcart.email;
    this.city = this.vcart.address;
    this.message = "Your Order is Confirmed of " + this.msg + " and will be delivered to " + this.city + ". The total payable Amount for your order is ₹" + this.total + ". Thanks for Shopping we will wait for you!";
    this.usercart = [];
    this.vcart.cart=[];
    this.total = 0;
    this.service.updateusersdata(this.vcart.id, this.vcart).subscribe(data=>{
    })
  }
  
  add(index) {
    this.usercart[index].quantity += 1;
    this.vcart.cart = this.usercart;
    this.service.updateusersdata(this.vcart.id, this.vcart).subscribe(data=>{
      this.total=0;
      this.usercart.forEach(element => {
      this.total+=element.quantity*element.price;
    });
    })
  }

  remove(index) {
    if(this.usercart[index].quantity == 1) {
      this.usercart.splice(index,1);
      this.numcart = this.usercart.length;
      this.vcart.cart = this.usercart;
      this.service.updateusersdata(this.vcart.id, this.vcart).subscribe(data=>{
      this.total=0;
      this.usercart.forEach(element => {
      this.total += element.quantity*element.price;
    })
  })
    } else {
    this.usercart[index].quantity -= 1;
    this.vcart.cart = this.usercart;
    this.service.updateusersdata(this.vcart.id, this.vcart).subscribe(data=>{
      this.total=0;
      this.usercart.forEach(element => {
      this.total += element.quantity*element.price;
    })
  })
  }
}

}
