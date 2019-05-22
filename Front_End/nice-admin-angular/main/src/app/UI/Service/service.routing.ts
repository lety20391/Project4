import { Routes } from '@angular/router';
import { ServiceComponentComponent } from './service-component.component';
// import { BDtableComponent} from '../BDTable/BDtable.component'

export const ServiceRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'services',
        component: ServiceComponentComponent,
        data: {
          title: 'Service list',
          urls: [{ title: 'Dashboard', url: '/dashboard' },{ title: 'Service list', url: '/service/services' }]
        }
      },
      // {
      //   path: 'pending',
      //   component: BDtableComponent,
      //   data: {
      //     title: 'Pending list',
      //     urls: [{ title: 'Dashboard', url: '/dashboard' },{ title: 'Service list', url: '/service/services' }]
      //   }
      // },

      {
        path: 'booking',
        component: ServiceComponentComponent,
        data: {
          title: 'Booking',
          urls: [{ title: 'Dashboard', url: '/dashboard' },{ title: 'Bookings', url: '/service/services' }]
        }
      },
      {
        path: 'services/:id',
        component: ServiceComponentComponent,
        data: {
          title: 'Service Detail',
          urls: [{ title: 'Dashboard', url: '/dashboard' },{ title: 'Service list', url: '/service/services' }]
        }
      }


    ]
  }
];
