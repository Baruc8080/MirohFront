import { Routes } from '@angular/router';
import { BlogDetailsPage } from './blog-details.component';

export const routes: Routes = [
  {
    path: 'noticias/:slug',
    component: BlogDetailsPage,
    title: 'Noticias | Miroh Master Broker | Sitio Web Oficial',
  },
];
