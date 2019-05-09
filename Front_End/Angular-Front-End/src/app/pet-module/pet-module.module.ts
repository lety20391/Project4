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
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [
    PetMockupComponent,
    ListPetComponent,
    ListDatingComponent,
    PetDetailComponent,
    CreatePetComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFileUploadModule,
    MatButtonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule

  ],
  exports:[
    PetMockupComponent,
    ListPetComponent,
    ListDatingComponent,
    PetDetailComponent,
    UploadComponent,
    MatFileUploadModule,
    MatButtonModule

  ]
})
export class PetModuleModule { }
