import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { BannerSmallComponent } from '../UIComponent/banner-small/banner-small.component';

@NgModule({
  declarations: [
    ShopingCartComponent,
    BannerSmallComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ShopingCartComponent
  ]
})
export class CartModuleModule { }
