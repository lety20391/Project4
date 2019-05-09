import { Routes } from '@angular/router';
import { ServiceEditComponent } from './service-edit.component';


export const ServiceEditRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'service/edit/:id',
        component: ServiceEditComponent,
        data: {
          title: 'Service Edit',
          urls: [{ title: 'Services', url: '/service/services' },{ title: 'Service edit', url: '' }]
        }
      }
    ]
  }
];
