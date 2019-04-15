import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-banner-small',
  templateUrl: './banner-small.component.html',
  styleUrls: ['./banner-small.component.css']
})
export class BannerSmallComponent implements OnInit {

  @Input() bannerTitle ;
  @Input() bannerContent;

  constructor( ) {   }

  ngOnInit() {
    //this.setContent("Title", "Content");
  }

  setContent(title: string, content: string): void{
    this.bannerTitle = title;
    this.bannerContent = content;
  }

}
