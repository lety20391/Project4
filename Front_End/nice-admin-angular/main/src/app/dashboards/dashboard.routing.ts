import { Routes } from '@angular/router';

import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import { OrderChartComponent } from './order-chart/order-chart.component';
import { ServiceCalendarComponent } from './service-calendar/service-calendar.component';
import { MainReportComponent } from './main-report/main-report.component';
import { DatingCalendarComponent } from './dating-calendar/dating-calendar.component';
import { ManageAdminComponent } from './manage-admin/manage-admin.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'classic',
        component: Dashboard1Component,
        data: {
          title: 'Classic Dashboard',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Classic Dashboard' }
          ]
        }
      },
      {
        path: 'manageAdmin',
        component: ManageAdminComponent,
        data: {
          title: 'Manage Admin',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Analytical Dashboard' }
          ]
        }
      },
      {
        path: 'mainReport',
        component: MainReportComponent,
        data: {
          title: 'Main Report',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Analytical Dashboard' }
          ]
        }
      },
      {
        path: 'orderChart',
        component: OrderChartComponent,
        data: {
          title: 'Order Report',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Analytical Dashboard' }
          ]
        }
      },
      {
        path: 'serviceCalendar',
        component: ServiceCalendarComponent,
        data: {
          title: 'Service Report',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Analytical Dashboard' }
          ]
        }
      },
      {
        path: 'datingCalendar',
        component: DatingCalendarComponent,
        data: {
          title: 'Dating Report',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Analytical Dashboard' }
          ]
        }
      },
      {
        path: 'analytical',
        component: Dashboard2Component,
        data: {
          title: 'Analytical Dashboard',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Analytical Dashboard' }
          ]
        }
      },
      {
        path: 'modern',
        component: Dashboard3Component,
        data: {
          title: 'Modern Dashboard',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Modern Dashboard' }
          ]
        }
      }
    ]
  }
];
