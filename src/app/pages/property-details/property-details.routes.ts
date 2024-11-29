import { Routes } from '@angular/router';
import { PropertyDetailsPage } from './property-details.component';

export const routes: Routes = [
  {
    path: 'propiedades/:slug',
    component: PropertyDetailsPage,
    title: 'Propiedades | Miroh Master Broker | Sitio Web Oficial',
  },
];
