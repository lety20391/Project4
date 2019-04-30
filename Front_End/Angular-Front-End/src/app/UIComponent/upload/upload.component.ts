import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Input() finalUrl: string;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  uploadFile(event){
    // const result = this.http.post(this.startURL, params, httpOptions);
    // result.subscribe(json => console.log(json));
  }

}
