import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoadPageComponent } from './load-page/load-page.component';
import { BackTopSectionComponent } from './back-top-section/back-top-section.component';
import { HeaderComponent } from './header/header.component';
import { NavbarSectionComponent } from './navbar-section/navbar-section.component';
import { BannerComponent } from './banner/banner.component';
import { AboutComponent } from './about/about.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { DoPetsComponent } from './do-pets/do-pets.component';
import { MeetVeterinaryComponent } from './meet-veterinary/meet-veterinary.component';
import { HappyClientsComponent } from './happy-clients/happy-clients.component';
import { OurArticlesComponent } from './our-articles/our-articles.component';
import { CTAComponent } from './cta/cta.component';
import { AwardsComponent } from './awards/awards.component';
import { FooterSectionComponent } from './footer-section/footer-section.component';

@NgModule({
  declarations: [
    AppComponent,
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
    FooterSectionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
