import { Routes } from '@angular/router';
import { ServiceAddComponent } from './service-add.component';


export const ServiceAddRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'service/addnew',
        component: ServiceAddComponent,
        data: {
          title: 'Add New Service',
          urls: [{ title: 'Services', url: '/service/services' },{ title: 'Add New Service', url: '' }]
        }
      }
    ]
  }
];
