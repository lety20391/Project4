import { Routes } from '@angular/router';
import { ServiceDetailComponent } from './service-detail.component';


export const ServiceDetailRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'detail/:id',
        component: ServiceDetailComponent,
        data: {
          title: 'Service Detail',
          urls: [{ title: 'Dashboard', url: '/dashboard' },{ title: 'Service list', url: '/service/services' }]
        }
      }
    ]
  }
];
