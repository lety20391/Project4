import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadPageComponent } from '../UIComponent/load-page/load-page.component';
import { BackTopSectionComponent } from '../UIComponent/back-top-section/back-top-section.component';
import { HeaderComponent } from '../UIComponent/header/header.component';
import { NavbarSectionComponent } from '../UIComponent/navbar-section/navbar-section.component';
import { BannerComponent } from '../UIComponent/banner/banner.component';
import { AboutComponent } from '../UIComponent/about/about.component';
import { OurServicesComponent } from '../UIComponent/our-services/our-services.component';
import { DoPetsComponent } from '../UIComponent/do-pets/do-pets.component';
import { MeetVeterinaryComponent } from '../UIComponent/meet-veterinary/meet-veterinary.component';
import { HappyClientsComponent } from '../UIComponent/happy-clients/happy-clients.component';
import { OurArticlesComponent } from '../UIComponent/our-articles/our-articles.component';
import { CTAComponent } from '../UIComponent/cta/cta.component';
import { AwardsComponent } from '../UIComponent/awards/awards.component';
import { FooterSectionComponent } from '../UIComponent/footer-section/footer-section.component';
import { FunFactComponent } from '../UIComponent/fun-fact/fun-fact.component';
import { AppRoutingModule } from '../app-routing.module';
import { ShopComponent } from '../shop-module/shop.component';
import { IndexComponent } from '../index-module/index.component';
import { ProductMockupComponent } from '../UIComponent/product-mockup/product-mockup.component';
import { HttpClientModule }    from '@angular/common/http';
import { TopSellerComponent } from '../shop-module/top-seller/top-seller.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LoginComponent } from '../login-module/login/login.component';
import { FormsModule } from '@angular/forms';
import { CartModuleModule } from '../cart-module/cart-module.module';
import { PetModuleModule } from '../pet-module/pet-module.module';
import { ProductSingleComponent } from '../UIComponent/product-single/product-single.component';
// import { MainlayoutRoutingModule } from './mainlayout-routing.module';

@NgModule({
  declarations: [
    LoadPageComponent,
    BackTopSectionComponent,
    HeaderComponent,
    NavbarSectionComponent,
    BannerComponent,
    AboutComponent,
    OurServicesComponent,
    DoPetsComponent,
    MeetVeterinaryComponent,
    HappyClientsComponent,
    OurArticlesComponent,
    CTAComponent,
    AwardsComponent,
    FooterSectionComponent,
    FunFactComponent,
    ShopComponent,
    IndexComponent,
    ProductMockupComponent,
    TopSellerComponent,
    MainLayoutComponent,
    LoginComponent,
    ProductSingleComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CartModuleModule,
    PetModuleModule
    // MainlayoutRoutingModule
  ],
  exports: [
    MainLayoutComponent
  ]
})
export class MainlayoutModuleModule { }
