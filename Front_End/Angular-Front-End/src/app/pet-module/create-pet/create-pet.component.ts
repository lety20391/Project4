import { Component, OnInit } from '@angular/core';
import { UploadComponent } from '../../UIComponent/upload/upload.component';

@Component({
  selector: 'app-create-pet',
  templateUrl: './create-pet.component.html',
  styleUrls: ['./create-pet.component.css']
})
export class CreatePetComponent implements OnInit {
  uploadUrl = 'http://localhost:34828/ServicePRJ-web/rest/uploader/file/1';
  constructor() { }

  ngOnInit() {
  }

}
