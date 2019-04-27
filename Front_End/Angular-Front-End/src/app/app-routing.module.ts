import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ShopComponent} from './shop-module/shop.component';
import { IndexComponent } from './index-module/index.component';
import {SerComponent} from './service-module/ser.component';


const routes: Routes = [
  {path: 'shops', component: ShopComponent},
  {path: 'index', component: IndexComponent},
  {path: 'services', component: SerComponent}
];

@NgModule({
  declarations: [],
  imports: [
    
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
