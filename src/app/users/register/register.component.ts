import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import{ init } from 'emailjs-com';
import { MyservicesService } from 'src/app/services/myservices.service';
init("user_zcxt2aol1gKAdqlEdOXKS");

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  logo = "assets/images/ekart_logo.png";
  register = "assets/images/register.jpg";

  registerform = new FormGroup({
    id : new FormControl(''),
    mobile : new FormControl(''),
    name : new FormControl(''),
    address : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl('')
  })

  verify = false;
  verifyclicked=false;
  public name:any;
  public email:any;
  public otp:any;
  public verifyotp:any;

  constructor(
    private service: MyservicesService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onregister() {
    if(this.registerform.value.mobile!="" && this.registerform.value.name!="" && this.registerform.value.email!="" && this.registerform.value.id!="" && this.registerform.value.password!="") { 
      this.name=this.registerform.value.name;
      this.email=this.registerform.value.email;
      this.otp=Math.floor((Math.random() * 1000000)+1);
      this.registerform.value.cart=[];
      this.verify=true;
    }
  }

  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_i8havmt', 'template_0f3osze', e.target as HTMLFormElement, 'user_zcxt2aol1gKAdqlEdOXKS')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
      this.verifyclicked=true;
  }

  verification(){ 
    if(this.verifyotp==this.otp){
      this.service.addusers(this.registerform.value).subscribe(data=>{
        localStorage.setItem("user","pass");
        this.router.navigateByUrl('login');
     })
    }else{
      alert("you have entered wrong otp");
    }
    }

}
