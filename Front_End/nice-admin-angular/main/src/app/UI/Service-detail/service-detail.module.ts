import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule }    from '@angular/common/http';
import { ServiceDetailComponent } from './service-detail.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ServiceDetailRoutes} from './service-detail.routing'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ServiceMockupComponent } from '../Service/service-mockup/service-mockup.component';

@NgModule({
  declarations: [ServiceDetailComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ServiceDetailRoutes),
    NgbModule

  ]
})
export class ServiceDetailModule { }
