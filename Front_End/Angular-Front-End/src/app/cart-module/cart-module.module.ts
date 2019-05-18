import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { BannerSmallComponent } from '../UIComponent/banner-small/banner-small.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShopingCartComponent,
    BannerSmallComponent
  ],
  imports: [
    CommonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule
  ],
  exports:[
    ShopingCartComponent
  ]
})
export class CartModuleModule { }
