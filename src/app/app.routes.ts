import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((component) => component.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./home/home').then((component) => component.HomeComponent)
  },
  {
    path: 'services',
    loadComponent: () => import('./home/home').then((component) => component.HomeComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./home/home').then((component) => component.HomeComponent)
  },
  { path: '**', redirectTo: '' }
];
