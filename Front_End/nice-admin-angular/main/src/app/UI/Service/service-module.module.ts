
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule }    from '@angular/common/http';
import { ServiceComponentComponent } from './service-component.component';

import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ServiceRoutes} from './service.routing'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceMockupComponent } from './service-mockup/service-mockup.component';

@NgModule({
  declarations: [ServiceComponentComponent, ServiceMockupComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ServiceRoutes),
    NgbModule
  ]
})
export class ServiceModuleModule { }
