import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
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
import { BannerSmallComponent } from '../UIComponent/banner-small/banner-small.component';
import { HttpClientModule }    from '@angular/common/http';
import { ProductMockupComponent } from '../UIComponent/product-mockup/product-mockup.component';
import { TopsellerComponent } from './top-seller/top-seller.component';
import { GalleryComponent } from '../UIComponent/gallery/gallery.component';
import { MySliderModule } from '../my-slider/my-slider.module';


@NgModule({
  declarations: [
    ShopComponent,
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
    BannerSmallComponent,
    ProductMockupComponent,
    TopsellerComponent,
    GalleryComponent

  ],
  imports: [
    HttpClientModule,
    CommonModule
    // MySliderModule
  ]
})
export class ShopModuleModule { }
