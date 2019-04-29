import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ShopComponent} from './shop-module/shop.component';
import { IndexComponent } from './index-module/index.component';
import { LoginComponent } from './login-module/login/login.component';
import {FormComponent} from './UIComponent/form/form.component';
import { UploadComponent } from './UIComponent/upload/upload.component';


const routes: Routes = [
  {path: 'shops', component: ShopComponent},
  {path: 'index', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'form', component: FormComponent},
  {path: 'upload', component: UploadComponent}

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
