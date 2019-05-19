import { Component, OnInit } from '@angular/core';
import { PetEntity } from '../Entity/PetEntity';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {

  // detailedPet: PetEntity = {
  //
  //       PetID: 1,
  //       PetName: 'Min',
  //       PetBreed: 'Foxie',
  //       PetImage: '',
  //       PetStatus: true,
  //       PetPrice: 29,
  //       PetDOB: '12-12-2017'
  //
  // };

  constructor() { }

  ngOnInit() {
  }

}
