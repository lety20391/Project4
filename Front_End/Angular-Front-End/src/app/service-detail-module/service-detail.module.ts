import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDetailComponent} from './service-detail/service-detail.component';
import { HttpClientModule }    from '@angular/common/http';
// import { SerComponent } from './ser/ser.component';
import { ServiceMockupComponent } from '../UIComponent/service-mockup/service-mockup/service-mockup.component';
@NgModule({
  declarations: [
    ServiceDetailComponent,
    ServiceMockupComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceDetailModule { }
