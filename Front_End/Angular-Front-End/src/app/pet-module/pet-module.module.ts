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
    CommonModule
  ],
  exports:[
    PetMockupComponent,
    ListPetComponent,
    ListDatingComponent,
    PetDetailComponent,
    UploadComponent,
    MatFileUploadModule

  ]
})
export class PetModuleModule { }
