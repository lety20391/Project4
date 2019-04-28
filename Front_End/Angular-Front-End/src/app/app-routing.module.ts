import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ShopComponent} from './shop-module/shop.component';
import { IndexComponent } from './index-module/index.component';
import {FormComponent} from './UIComponent/form/form.component';
import { HomecontentComponent } from './UIComponent/homecontent/homecontent.component';
import { RegisterComponent } from './UIComponent/register/register.component';
import { LoginComponent } from './UIComponent/login/login.component';
import { GalleryComponent } from './UIComponent/gallery/gallery.component';


const routes: Routes = [
  {path: '', redirectTo: "/home", pathMatch: 'full'},
  {path: 'shops', component: ShopComponent},
  {path: 'index', component: IndexComponent},
  {path: 'form', component: FormComponent},
  {path: 'home', component: HomecontentComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'gallery', component: GalleryComponent}
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
