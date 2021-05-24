import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyservicesService } from 'src/app/services/myservices.service';

interface Sort {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-productsdash',
  templateUrl: './productsdash.component.html',
  styleUrls: ['./productsdash.component.css']
})
export class ProductsdashComponent implements OnInit {

  logo = "assets/images/ekart_logo.png";
  cart = "assets/images/shopping.png"
  card1 = "assets/images/top.png";
  card2 = "assets/images/mobile.png";
  card3 = "assets/images/fashion.png";
  card4 = "assets/images/electronics.png";
  card5 = "assets/images/home.png";
  card6 = "assets/images/appliances.png";

  public id: any;
  public allprod: any;
  public productslist: any;
  public searchproduct: any;
  public searchresult = [];
  public authuser: any;
  public numcart:any;
  public sortoption: any;
  public alluser: any;
  selectedValue: string;
  SortName = "Sort";


  constructor(
    private router: Router,
    private service: MyservicesService
  ) { }

  ngOnInit(): void {
    this.getproductsdata();
    this.getauthuser();
  }

  getproductsdata() {
    this.service.getproducts().subscribe(data => {
    this.allprod = data;
    this.productslist = this.allprod.allproducts;
    })
  }

  search() {
    this.service.getproducts().subscribe(data => {
    this.allprod = data;
    this.productslist = this.allprod.allproducts;
    for(let i=0; i<this.productslist.length; i++) {
      if(this.searchproduct == this.productslist[i].productname || this.searchproduct == this.productslist[i].brand) {
        this.searchresult.push(this.productslist[i]);
      }
    }
    this.productslist = this.searchresult;
    this.searchresult = [];
  });
  }

  all() {
    this.service.getproducts().subscribe(data => {
    this.allprod = data;
    this.productslist = this.allprod.allproducts;
    })
  }

  mobiles() {
    this.service.getproducts().subscribe(data => {
    this.allprod = data;
    this.productslist = this.allprod.mobiles;
  })
  }

  fashion() {
    this.service.getproducts().subscribe(data => {
    this.allprod = data;
    this.productslist = this.allprod.fashion;
  })
  }

  electronics() {
    this.service.getproducts().subscribe(data => {
    this.allprod = data;
    this.productslist = this.allprod.electronics;
  })
  }

  home() {
    this.service.getproducts().subscribe(data => {
    this.allprod = data;
    this.productslist = this.allprod.home;
    })
  }

  appliances() {
    this.service.getproducts().subscribe(data => {
    this.allprod = data;
    this.productslist = this.allprod.appliances;
    })
  }

  gotocart() {
    this.router.navigateByUrl('cart');
  }

  gotologout() {
    this.router.navigateByUrl('login');
    localStorage.clear();
  }

  gotohome() {
    this.router.navigateByUrl('home');
  }

  getauthuser() {  
  let ob =JSON.parse(localStorage.getItem("authuser"));
  this.service.getusersdata().subscribe(data=>{
    this.alluser=data;
    this.alluser.forEach(element => {
      if(element.id == ob.id){
        this.authuser=element;
        this.numcart=this.authuser.cart.length;
        console.log(this.authuser);
    }
  });
  });
}

  none() {
    this.SortName = "None";
    this.service.getproducts().subscribe(data => {
    this.allprod = data;
    this.productslist = this.allprod.allproducts;
    })
  }

  lowtohigh() {
    this.SortName = "Price -- Low to High";
    this.productslist.sort((a, b) => (a.price < b.price ? -1 : 1));
  }

  hightolow() {
    this.SortName = "Price -- High to Low";
    this.productslist.sort((a, b) => (a.price > b.price ? -1 : 1));
  }

  addtocart(id, data) {
    if(!this.authuser.cart.includes(data)){ 
      data.quantity++;
      this.authuser.cart.push(data);
      this.numcart=this.authuser.cart.length;
      this.service.updateusersdata(this.authuser.id,this.authuser).subscribe(data=>{
    })
  }else{
    data.quantity++;
    this.service.updateusersdata(this.authuser.id,this.authuser).subscribe(data=>{
    })
  }
  console.log(this.authuser.cart);
  }

}
