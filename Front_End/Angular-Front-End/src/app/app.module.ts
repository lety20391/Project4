import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
// import { LoadPageComponent } from './UIComponent/load-page/load-page.component';
// import { BackTopSectionComponent } from './UIComponent/back-top-section/back-top-section.component';
// import { HeaderComponent } from './UIComponent/header/header.component';
// import { NavbarSectionComponent } from './UIComponent/navbar-section/navbar-section.component';
// import { BannerComponent } from './UIComponent/banner/banner.component';
// import { AboutComponent } from './UIComponent/about/about.component';
// import { OurServicesComponent } from './UIComponent/our-services/our-services.component';
// import { DoPetsComponent } from './UIComponent/do-pets/do-pets.component';
// import { MeetVeterinaryComponent } from './UIComponent/meet-veterinary/meet-veterinary.component';
// import { HappyClientsComponent } from './UIComponent/happy-clients/happy-clients.component';
// import { OurArticlesComponent } from './UIComponent/our-articles/our-articles.component';
// import { CTAComponent } from './UIComponent/cta/cta.component';
// import { AwardsComponent } from './UIComponent/awards/awards.component';
// import { FooterSectionComponent } from './UIComponent/footer-section/footer-section.component';
// import { FunFactComponent } from './UIComponent/fun-fact/fun-fact.component';
import { AppRoutingModule } from './app-routing.module';
// import { ShopComponent } from './shop-module/shop.component';
// import { IndexComponent } from './index-module/index.component';
// import { BannerSmallComponent } from './UIComponent/banner-small/banner-small.component';
// import { ProductMockupComponent } from './UIComponent/product-mockup/product-mockup.component';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
// import { TopSellerComponent } from './shop-module/top-seller/top-seller.component';
import {MainlayoutModuleModule} from './mainlayout-module/mainlayout-module.module';
import { FormsModule } from '@angular/forms';
import {AuthInterceptorService} from './authentication/auth-interceptor.service';
import { FormComponent } from './UIComponent/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    // LoadPageComponent,
    // BackTopSectionComponent,
    // HeaderComponent,
    // NavbarSectionComponent,
    // BannerComponent,
    // AboutComponent,
    // OurServicesComponent,
    // DoPetsComponent,
    // MeetVeterinaryComponent,
    // HappyClientsComponent,
    // OurArticlesComponent,
    // CTAComponent,
    // AwardsComponent,
    // FooterSectionComponent,
    // FunFactComponent,
    // ShopComponent,
    // IndexComponent,
    // BannerSmallComponent,
    // ProductMockupComponent,
    // TopSellerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MainlayoutModuleModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
