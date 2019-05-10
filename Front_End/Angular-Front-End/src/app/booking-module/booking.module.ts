import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BookingComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class BookingModule { }
