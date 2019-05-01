import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  templateUrl: 'details.component.html'
})

export class DetailsComponent {



      constructor(
                  private route: ActivatedRoute,
                  private location: Location
                  ) { }

      ngOnInit() {
              this.getID();
              }

    getID(): void{
              const id = +this.route.snapshot.paramMap.get('id');
              console.log('---Fetch product Detail: ' + id);
            }

}
