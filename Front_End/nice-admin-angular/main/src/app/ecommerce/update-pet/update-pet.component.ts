import { Component, OnInit } from '@angular/core';
import {PetEntity} from '../list-pet/PetEntity';
@Component({
  selector: 'app-update-pet',
  templateUrl: './update-pet.component.html',
  styleUrls: ['./update-pet.component.css']
})
export class UpdatePetComponent implements OnInit {

  detailedPet: PetEntity = {
      PetID: 1,
      PetName: 'Min',
      PetBreed: 'Foxie',
      PetImage: '',
      PetStatus: true,
      PetPrice: 29,
      PetDOB: '12-12-2017'
  };

  constructor() { }

  ngOnInit() {
  }

}
