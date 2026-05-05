import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((component) => component.HomeComponent)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./product/product-detail').then((component) => component.ProductDetailComponent)
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
