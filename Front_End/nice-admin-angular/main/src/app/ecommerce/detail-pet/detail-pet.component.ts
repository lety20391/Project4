import { Component, OnInit } from '@angular/core';
import {PetEntity} from '../list-pet/PetEntity';
@Component({
  selector: 'app-detail-pet',
  templateUrl: './detail-pet.component.html',
  styleUrls: ['./detail-pet.component.css']
})
export class DetailPetComponent implements OnInit {

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
