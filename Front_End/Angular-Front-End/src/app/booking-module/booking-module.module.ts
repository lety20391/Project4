import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from '../UIComponent/calendar/calendar.component';


@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule
  ],
  exports: [
    CalendarComponent
  ]
})
export class BookingModuleModule { }
