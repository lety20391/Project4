import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductEntity } from '../product/ProductEntity';

@Component({
  templateUrl: 'details.component.html'
})

export class DetailsComponent {

      detailedProduct: ProductEntity = {
            ProID: 1,
            ProName: 'Pink leather',
            ProDes: 'real leather',
            ProPrice: 12,
            ProColor: 'pink',
            ProImage: '',
            Status: true,
            cateEntity: {
                        CateID: 1,
                        CateName: 'CateGory1'
                      }
        };

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
