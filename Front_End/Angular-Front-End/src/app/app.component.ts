import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
  ]
})
export class AppComponent implements OnInit {
  title = 'Angular-Front-End';
  calendarPlugins = [dayGridPlugin];

  ngOnInit(){
    this.loadScript('./assets/js/vendor/jquery.min.js');
    this.loadScript('./assets/js/vendor/jquery.magnific-popup.min.js');
    this.loadScript('./assets/js/vendor/bootstrap.min.js');
    this.loadScript('./assets/js/vendor/modernizr.min.js');
    this.loadScript('./assets/js/vendor/owl.carousel.js');
    this.loadScript('./assets/js/vendor/validator.min.js');
    this.loadScript('./assets/js/vendor/form-scripts.js');
    this.loadScript('./assets/js/script.js');
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
