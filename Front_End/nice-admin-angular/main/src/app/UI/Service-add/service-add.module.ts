import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule }    from '@angular/common/http';
import { ServiceAddComponent } from './service-add.component';
import { Routes, RouterModule } from '@angular/router';
import { ServiceAddRoutes} from './service-add.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [ServiceAddComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ServiceAddRoutes),
    NgbModule
  ]
})
export class ServiceAddModule { }
