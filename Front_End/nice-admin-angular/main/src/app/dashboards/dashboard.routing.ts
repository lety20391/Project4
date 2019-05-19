import { Routes } from '@angular/router';

import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import { OrderChartComponent } from './order-chart/order-chart.component';
import { ServiceCalendarComponent } from './service-calendar/service-calendar.component';

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
