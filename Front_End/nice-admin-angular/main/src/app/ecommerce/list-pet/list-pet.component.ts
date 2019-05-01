import { Component, OnInit } from '@angular/core';
import {PetEntity} from './PetEntity';

@Component({
  selector: 'app-list-pet',
  templateUrl: './list-pet.component.html',
  styleUrls: ['./list-pet.component.css']
})
export class ListPetComponent implements OnInit {

  listPet: PetEntity[] =[
    {
        PetID: 1,
        PetName: 'Min',
        PetBreed: 'Foxie',
        PetImage: '',
        PetStatus: true,
        PetPrice: 29,
        PetDOB: '12-12-2017'
    },
    {
        PetID: 2,
        PetName: 'Coongy',
        PetBreed: 'Cogy',
        PetImage: '',
        PetStatus: true,
        PetPrice: 39,
        PetDOB: '12-12-2018'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
