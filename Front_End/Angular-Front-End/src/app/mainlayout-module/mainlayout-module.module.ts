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
import { TopsellerComponent } from '../shop-module/top-seller/top-seller.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LoginComponent } from '../login-module/login/login.component';
import { FormsModule } from '@angular/forms';
import { CartModuleModule } from '../cart-module/cart-module.module';
import { PetModuleModule } from '../pet-module/pet-module.module';
import { ProductSingleComponent } from '../UIComponent/product-single/product-single.component';
import { RegisterModule} from '../register-module/register.module';
import { Error404Component } from '../UIComponent/error404/error404.component';

// import { MainlayoutRoutingModule } from './mainlayout-routing.module';
import { BookingModule} from '../booking-module/booking.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GalleryComponent } from '../UIComponent/gallery/gallery.component';
import { MySliderModule } from '../my-slider/my-slider.module';
import {ServiceCalendarComponent} from '../UIComponent/MyOrder/my-order.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

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
    TopsellerComponent,
    MainLayoutComponent,
    LoginComponent,
    ProductSingleComponent,
    Error404Component,
    GalleryComponent,
    ServiceCalendarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CartModuleModule,
    PetModuleModule,
    RegisterModule,
    BookingModule,
    NgbModule,
    MySliderModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  exports: [
    MainLayoutComponent
  ]
})
export class MainlayoutModuleModule { }
