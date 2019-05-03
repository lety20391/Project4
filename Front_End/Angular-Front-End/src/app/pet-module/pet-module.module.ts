import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetMockupComponent } from './pet-mockup/pet-mockup.component';
import { CreatePetComponent } from './create-pet/create-pet.component';
import { UploadComponent } from '../UIComponent/upload/upload.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PetMockupComponent,
    CreatePetComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    MatFileUploadModule,
    FormsModule
  ],
  exports: [
    UploadComponent,
    MatFileUploadModule
  ]
})
export class PetModuleModule { }
