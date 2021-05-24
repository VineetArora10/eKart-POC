import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homedash',
  templateUrl: './homedash.component.html',
  styleUrls: ['./homedash.component.css']
})
export class HomedashComponent implements OnInit {

  logo = "assets/images/ekart_logo.png";
  carousel1 = "assets/images/carousel1.jpg";
  carousel2 = "assets/images/carousel2.jpg";
  carousel3 = "assets/images/carousel3.jpg";

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  gotologout() {
    this.router.navigateByUrl('login');
    localStorage.clear();
  }

  gotoproducts() {
    this.router.navigateByUrl('products');
  }

}
