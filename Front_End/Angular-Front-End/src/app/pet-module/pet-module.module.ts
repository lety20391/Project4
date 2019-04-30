import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetMockupComponent } from './pet-mockup/pet-mockup.component';
import { CreatePetComponent } from './create-pet/create-pet.component';
import { UploadComponent } from '../UIComponent/upload/upload.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
@NgModule({
  declarations: [
    PetMockupComponent,
    CreatePetComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    MatFileUploadModule
  ],
  exports: [
    UploadComponent,
    MatFileUploadModule
  ]
})
export class PetModuleModule { }
