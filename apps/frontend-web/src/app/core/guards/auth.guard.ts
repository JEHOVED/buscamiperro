import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Guardar la URL a la que el usuario quería acceder
  const returnUrl = state.url;
  
  // Mostrar mensaje informativo
  notificationService.showInfo('Debes iniciar sesión para acceder a esta página');
  
  // Redirigir al login con la URL de retorno
  router.navigate(['/login'], { 
    queryParams: { returnUrl } 
  });
  
  return false;
};