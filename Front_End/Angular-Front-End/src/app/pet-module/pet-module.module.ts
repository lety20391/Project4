import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetMockupComponent } from './pet-mockup/pet-mockup.component';
import { ListPetComponent } from './list-pet/list-pet.component';

@NgModule({
  declarations: [
    PetMockupComponent,
    ListPetComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PetMockupComponent,
    ListPetComponent
  ]
})
export class PetModuleModule { }
