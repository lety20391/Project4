import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PetEntity } from '../PetEntity';
import { PetManageService } from '../pet-manage.service';
import {DatingDetailEntity} from '../DatingDetailEntity';
import {DatingManageService} from '../dating-manage.service';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-detail-dating',
  templateUrl: './detail-dating.component.html',
  styleUrls: ['./detail-dating.component.css']
})
export class DetailDatingComponent implements OnInit {

  logClass = '--Dating Detail UI: ';

  @Input() currentID: number;

  currentPet: PetEntity = new PetEntity();
  listImage: string[] = [];
  currentDating: DatingDetailEntity = new DatingDetailEntity();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private petService: PetManageService,
    private datingService: DatingManageService
  ) { }

  ngOnInit() {
    //this.loadScript('./assets/js/popupImage.js');
    this.getID();
    this.getPetByID(this.currentID);
    this.getAllPetImage(this.currentID);

  }

  //load external js file into component
  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  getID(): void{
    if( this.currentID == null)
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

  sendRequestDating(): void{
    console.log(this.logClass + ' sendRequestDating');

  }


}
