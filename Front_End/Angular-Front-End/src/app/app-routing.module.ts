import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ShopComponent} from './shop-module/shop.component';
import { IndexComponent } from './index-module/index.component';
import { LoginComponent } from './login-module/login/login.component';
import {FormComponent} from './UIComponent/form/form.component';
import {SerComponent} from './service-module/ser.component';
import {ServiceDetailComponent} from './service-detail-module/service-detail/service-detail.component';


const routes: Routes = [
  {path: 'shops', component: ShopComponent},
  {path: 'index', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'form', component: FormComponent},
  {path: 'services', component: SerComponent},
  {path: 'services/:id', component: ServiceDetailComponent}
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
