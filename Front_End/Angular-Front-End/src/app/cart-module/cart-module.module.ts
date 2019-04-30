import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';

@NgModule({
  declarations: [ShopingCartComponent],
  imports: [
    CommonModule
  ],
  exports:[
    ShopingCartComponent
  ]
})
export class CartModuleModule { }
