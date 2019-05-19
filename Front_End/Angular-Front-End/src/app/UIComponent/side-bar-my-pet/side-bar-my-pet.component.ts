import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {PetEntity} from '../../pet-module/PetEntity';

@Component({
  selector: 'app-side-bar-my-pet',
  templateUrl: './side-bar-my-pet.component.html',
  styleUrls: ['./side-bar-my-pet.component.css']
})
export class SideBarMyPetComponent implements OnInit {

  @Input() listPet: PetEntity[] = [];

  @Output() petSelected = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  sendPetDetail(selectedPet : PetEntity): void{
    console.log('--Side bar my pet: ' + selectedPet.petName);
    //khoi phat su kien pet duoc lua chon
    this.petSelected.emit(selectedPet);
  }

}
