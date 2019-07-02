import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CalendarModule, CalendarDateFormatter } from 'angular-calendar';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { DashboardRoutes } from './dashboard.routing';

import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import { OrderChartComponent } from './order-chart/order-chart.component';
import { ServiceCalendarComponent } from './service-calendar/service-calendar.component';
import { MainReportComponent } from './main-report/main-report.component';
import { DatingCalendarComponent } from './dating-calendar/dating-calendar.component';
import { ManageAdminComponent } from './manage-admin/manage-admin.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    ChartsModule,
    ChartistModule,
    RouterModule.forChild(DashboardRoutes),
    PerfectScrollbarModule,
    CalendarModule.forRoot(),
    NgxChartsModule,
    NgxDatatableModule,
    Ng2SmartTableModule
  ],
  declarations: [
    Dashboard1Component,
    Dashboard2Component,
    Dashboard3Component,
    OrderChartComponent,
    ServiceCalendarComponent,
    MainReportComponent,
    DatingCalendarComponent,
    ManageAdminComponent
  ]
})
export class DashboardModule { }
