import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RegisterComponent} from './register.component';
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule, } from '@angular/material';
// import { PetModuleModule } from '../pet-module/pet-module.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {UploadModuleModule} from '../upload-module/upload-module.module';
@NgModule({
  declarations: [
    RegisterComponent,
    UserProfileComponent

  ],
  imports: [
    CommonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    MatProgressSpinnerModule,
    UploadModuleModule
  ],
  exports: [
    UserProfileComponent
  ]
})
export class RegisterModule { }
