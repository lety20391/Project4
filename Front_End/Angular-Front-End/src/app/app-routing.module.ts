import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ShopComponent} from './shop-module/shop.component';
import { IndexComponent } from './index-module/index.component';
// import { LoginComponent } from './login-module/login/login.component';
import {FormComponent} from './UIComponent/form/form.component';
import { HomecontentComponent } from './UIComponent/homecontent/homecontent.component';
import { RegisterComponent } from './UIComponent/register/register.component';
import { LoginComponent } from './UIComponent/login/login.component';
import { GalleryComponent } from './UIComponent/gallery/gallery.component';
import { ProductSingleComponent } from './UIComponent/product-single/product-single.component';
import { TopsellerComponent } from './UIComponent/topseller/topseller.component';
import { SearchComponent } from './UIComponent/search/search.component';
import {SerComponent} from './service-module/ser.component';
import {ServiceDetailComponent} from './service-detail-module/service-detail/service-detail.component';
import { AppointmentComponent } from './UIComponent/appointment/appointment.component';
import { ShopingCartComponent } from './cart-module/shoping-cart/shoping-cart.component';
import { AboutusComponent } from './UIComponent/aboutus/aboutus.component';
import { ListPetComponent } from './pet-module/list-pet/list-pet.component';
import { ListDatingComponent } from './pet-module/list-dating/list-dating.component';
import { PetDetailComponent } from './pet-module/pet-detail/pet-detail.component';
import { UploaderComponent } from './upload-module/uploader/uploader.component';
import { CreatePetComponent } from './pet-module/create-pet/create-pet.component';

const routes: Routes = [
  {path: '', redirectTo: "/home", pathMatch: 'full'},
  {path: 'shops', component: ShopComponent},
  {path: 'index', component: IndexComponent},
  {path: 'form', component: FormComponent},
  {path: 'home', component: HomecontentComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'productsingle/:id', component: ProductSingleComponent},
  {path: 'topseller', component: TopsellerComponent},
  {path: 'search', component: SearchComponent},
  {path: 'services', component: SerComponent},
  {path: 'services/:id', component: ServiceDetailComponent},
  {path: 'cart', component: ShopingCartComponent},
  {path: 'appointment', component: AppointmentComponent},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'listPet', component: ListPetComponent},
  {path: 'listDating', component: ListDatingComponent},
  {path: 'petDetail/:id', component: PetDetailComponent},
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
