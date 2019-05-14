import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ServiceCartModule} from './service-cart/service-cart/service-cart.module';
import {ServiceCartComponent} from './service-cart/service-cart/service-cart.component';
@NgModule({
  declarations: [BookingComponent,
  ServiceCartComponent],
  imports: [
    CommonModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ServiceCartModule
  ]
})
export class BookingModule { }
