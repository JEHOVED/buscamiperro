import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/mapa',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'mapa',
    loadComponent: () => import('./features/map/map.component').then(m => m.MapComponent)
  },
  {
    path: 'perros',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/dogs/dog-list/dog-list.component').then(m => m.DogListComponent)
      },
      {
        path: 'nuevo',
        loadComponent: () => import('./features/dogs/dog-form/dog-form.component').then(m => m.DogFormComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./features/dogs/dog-detail/dog-detail.component').then(m => m.DogDetailComponent)
      },
      {
        path: ':id/editar',
        loadComponent: () => import('./features/dogs/dog-form/dog-form.component').then(m => m.DogFormComponent)
      }
    ]
  },
  {
    path: 'avistamientos',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/sightings/sighting-list/sighting-list.component').then(m => m.SightingListComponent)
      },
      {
        path: 'nuevo',
        loadComponent: () => import('./features/sightings/sighting-form/sighting-form.component').then(m => m.SightingFormComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./features/sightings/sighting-detail/sighting-detail.component').then(m => m.SightingDetailComponent)
      }
    ]
  },
  {
    path: 'perfil',
    canActivate: [authGuard],
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'chat/:roomId',
    canActivate: [authGuard],
    loadComponent: () => import('./features/chat/chat.component').then(m => m.ChatComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];