import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: HomeComponent }, // Placeholder
  { path: 'services', component: HomeComponent }, // Placeholder
  { path: 'contact', component: HomeComponent }, // Placeholder
  { path: '**', redirectTo: '' }
];
