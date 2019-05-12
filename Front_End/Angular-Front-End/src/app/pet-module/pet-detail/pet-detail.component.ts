import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PetEntity } from '../PetEntity';
import { PetManageService } from '../pet-manage.service';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent implements OnInit {

  logClass = '--Pet Detail UI: ';

  @Output() currentID: number;
  @Input() currentPet: PetEntity = new PetEntity();
  listImage: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private petService: PetManageService
  ) { }

  ngOnInit() {
    this.getID();
    this.getPetByID(this.currentID);
    this.getAllPetImage(this.currentID);

  }

  getID(): void{
    this.currentID = +this.route.snapshot.paramMap.get('id');
  }

  getPetByID(id: number): void{
    console.log('---Fetch Pet Detail: ' + id);
    this.petService.getPetByID(id).subscribe(
      result => {
                  console.log(this.logClass + ' Product load:' + result.petName);
                  this.currentPet = result;
                }
    );
  }

  getAllPetImage(id: number): void{
    console.log(this.logClass + " Get All Image");
    this.petService.getAllPetImage(id).subscribe(
      result => {
                  console.log(this.logClass + ' Image Load');
                  this.listImage = result;
                }
    );
  }
}
