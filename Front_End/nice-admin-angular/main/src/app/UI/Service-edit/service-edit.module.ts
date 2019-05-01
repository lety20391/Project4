import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceEditComponent } from './service-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceEditRoutes} from './service-edit.routing';



@NgModule({
  declarations: [ServiceEditComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ServiceEditRoutes),
    NgbModule
  ]
})
export class ServiceEditModule { }
