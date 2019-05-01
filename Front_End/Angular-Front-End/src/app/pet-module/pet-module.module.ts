import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetMockupComponent } from './pet-mockup/pet-mockup.component';
import { ListPetComponent } from './list-pet/list-pet.component';
import { ListDatingComponent } from './list-dating/list-dating.component';

@NgModule({
  declarations: [
    PetMockupComponent,
    ListPetComponent,
    ListDatingComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PetMockupComponent,
    ListPetComponent,
    ListDatingComponent
  ]
})
export class PetModuleModule { }
