import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomedashComponent } from './homedash/homedash.component';



@NgModule({
  declarations: [
    HomedashComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomedashComponent
  ]
})
export class HomeModule { }
