import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {IndexComponent} from '../index-module/index.component';
import {ShopComponent} from '../shop-module/shop.component';
import {MainLayoutComponent} from './main-layout/main-layout.component';

// const userLayout: Routes = [
//   {
//     path: 'mainlayout',
//     children: [
//
//       {
//         path: '',
//         outlet: 'content',
//         component: IndexComponent
//       },
//       {
//         path: 'shops',
//         component: ShopComponent
//       }
//     ]
//   }
// ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // RouterModule.forChild(userLayout)
  ],
  exports: [
    // RouterModule
  ]
})
export class MainlayoutRoutingModule { }
