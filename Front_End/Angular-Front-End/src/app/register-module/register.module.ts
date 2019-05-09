import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RegisterComponent} from './register.component';
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule, } from '@angular/material'
@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    MatProgressSpinnerModule
  ]
})
export class RegisterModule { }
