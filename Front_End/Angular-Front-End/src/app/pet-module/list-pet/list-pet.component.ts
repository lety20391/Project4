import { Component, OnInit } from '@angular/core';
import { PetEntity } from '../PetEntity';

@Component({
  selector: 'app-list-pet',
  templateUrl: './list-pet.component.html',
  styleUrls: ['./list-pet.component.css']
})
export class ListPetComponent implements OnInit {

//dong 132 trong file hmtl se lap lai 3 lan danh sach nay
  listPet: PetEntity[]=[
    {
      PetID: 1,
      PetName: 'MinMin',
      PetBreed: 'Foxie',
      PetImage: 'assets/images/Pet/1.jpg',
      PetStatus: true,
      PetPrice: 29,
      PetDOB: '12-12-2018'
    },
    {
      PetID: 2,
      PetName: 'Congy',
      PetBreed: 'Coggy',
      PetImage: 'assets/images/Pet/2.jpg',
      PetStatus: true,
      PetPrice: 39,
      PetDOB: '12-12-2018'
    }
  ];

  constructor() { }

  ngOnInit() {
    this.loadScript('./assets/js/search.js');
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

}
