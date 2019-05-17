import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetMockupComponent } from './pet-mockup/pet-mockup.component';
import { ListPetComponent } from './list-pet/list-pet.component';
import { ListDatingComponent } from './list-dating/list-dating.component';
import { PetDetailComponent } from './pet-detail/pet-detail.component';
import { CreatePetComponent } from './create-pet/create-pet.component';
import { UploadComponent } from '../UIComponent/upload/upload.component';
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


@NgModule({
  declarations: [
    PetMockupComponent,
    ListPetComponent,
    ListDatingComponent,
    PetDetailComponent,
    CreatePetComponent,
    UploadComponent,
    DetailDatingComponent,
    SideBarMyPetComponent,
    DatingRequestComponent,
    SimpleDialogComponent,
    ConfirmDatingComponent,
    DatingAnswerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFileUploadModule,
    MatButtonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatDialogModule

  ],
  exports:[
    PetMockupComponent,
    ListPetComponent,
    ListDatingComponent,
    PetDetailComponent,
    UploadComponent,
    MatFileUploadModule,
    MatButtonModule,
    DatingRequestComponent

  ],
  entryComponents: [DatingRequestComponent]
})
export class PetModuleModule { }
