import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ShopComponent} from './shop-module/shop.component';
import { IndexComponent } from './index-module/index.component';
import { LoginComponent } from './login-module/login/login.component';
import {FormComponent} from './UIComponent/form/form.component';
import { UploaderComponent } from './upload-module/uploader/uploader.component';
import { CreatePetComponent } from './pet-module/create-pet/create-pet.component';
const routes: Routes = [
  {path: 'shops', component: ShopComponent},
  {path: 'index', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'form', component: FormComponent},
  {path: 'createPet', component: CreatePetComponent}

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
