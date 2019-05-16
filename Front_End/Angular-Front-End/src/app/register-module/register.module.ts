import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RegisterComponent} from './register.component';
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule, } from '@angular/material';
import { PetModuleModule } from '../pet-module/pet-module.module'
@NgModule({
  declarations: [
    RegisterComponent

  ],
  imports: [
    CommonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    MatProgressSpinnerModule,
    PetModuleModule
  ]
})
export class RegisterModule { }
