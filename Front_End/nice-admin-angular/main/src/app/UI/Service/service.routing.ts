import { Routes } from '@angular/router';
import { ServiceComponentComponent } from './service-component.component';


export const ServiceRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'services',
        component: ServiceComponentComponent,
        data: {
          title: 'Service',
          urls: [{ title: 'Dashboard', url: '/dashboard' },{ title: 'Services', url: '/service/services' }]
        }
      },
      {
        path: 'booking',
        component: ServiceComponentComponent,
        data: {
          title: 'Booking',
          urls: [{ title: 'Dashboard', url: '/dashboard' },{ title: 'Bookings', url: '/service/services' }]
        }
      }


    ]
  }
];
