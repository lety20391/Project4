import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng5SliderModule } from 'ng5-slider';
import { PetMockupComponent } from './pet-mockup/pet-mockup.component';
import { ListPetComponent } from './list-pet/list-pet.component';
import { ListDatingComponent } from './list-dating/list-dating.component';
import { PetDetailComponent } from './pet-detail/pet-detail.component';
import { CreatePetComponent } from './create-pet/create-pet.component';
// import { UploadComponent } from '../UIComponent/upload/upload.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import {MatDialogModule} from "@angular/material";

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DetailDatingComponent } from './detail-dating/detail-dating.component';
import {SideBarMyPetComponent} from '../UIComponent/side-bar-my-pet/side-bar-my-pet.component';
import { DatingRequestComponent } from './dating-request/dating-request.component';
import {SimpleDialogComponent} from '../UIComponent/simple-dialog/simple-dialog.component';
import { ConfirmDatingComponent } from './confirm-dating/confirm-dating.component';
import { DatingAnswerComponent } from './dating-answer/dating-answer.component';
import { DetailRequestComponent } from './detail-request/detail-request.component';
import {RegisterModule} from '../register-module/register.module';
import {UploadModuleModule} from '../upload-module/upload-module.module';


@NgModule({
  declarations: [
    PetMockupComponent,
    ListPetComponent,
    ListDatingComponent,
    PetDetailComponent,
    CreatePetComponent,
    DetailDatingComponent,
    SideBarMyPetComponent,
    DatingRequestComponent,
    SimpleDialogComponent,
    ConfirmDatingComponent,
    DatingAnswerComponent,
    DetailRequestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFileUploadModule,
    MatButtonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatDialogModule,
    RegisterModule,
    UploadModuleModule,
    Ng5SliderModule

  ],
  exports:[
    PetMockupComponent,
    ListPetComponent,
    ListDatingComponent,
    PetDetailComponent,
    MatFileUploadModule,
    MatButtonModule,
    DatingRequestComponent

  ],
  entryComponents: [DatingRequestComponent]
})
export class PetModuleModule { }
