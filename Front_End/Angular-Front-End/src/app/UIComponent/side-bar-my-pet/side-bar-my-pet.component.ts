import { Component, OnInit, Input } from '@angular/core';
import {PetEntity} from '../../pet-module/PetEntity';

@Component({
  selector: 'app-side-bar-my-pet',
  templateUrl: './side-bar-my-pet.component.html',
  styleUrls: ['./side-bar-my-pet.component.css']
})
export class SideBarMyPetComponent implements OnInit {

  @Input() listPet: PetEntity[] = [];

  constructor() { }

  ngOnInit() {
  }

}
