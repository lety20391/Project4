import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetMockupComponent } from './pet-mockup/pet-mockup.component';
import { CreatePetComponent } from './create-pet/create-pet.component';

@NgModule({
  declarations: [PetMockupComponent, CreatePetComponent],
  imports: [
    CommonModule
  ]
})
export class PetModuleModule { }
