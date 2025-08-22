import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const notificationService = inject(NotificationService);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ha ocurrido un error inesperado';

      switch (error.status) {
        case 400:
          errorMessage = 'Datos inválidos. Por favor verifica la información.';
          break;
        case 401:
          errorMessage = 'No tienes autorización. Por favor inicia sesión.';
          authService.logout();
          router.navigate(['/login']);
          break;
        case 403:
          errorMessage = 'No tienes permisos para realizar esta acción.';
          break;
        case 404:
          errorMessage = 'El recurso solicitado no fue encontrado.';
          break;
        case 409:
          errorMessage = 'Conflicto: El recurso ya existe.';
          break;
        case 422:
          errorMessage = 'Datos de entrada inválidos.';
          break;
        case 429:
          errorMessage = 'Demasiadas solicitudes. Intenta más tarde.';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Intenta más tarde.';
          break;
        case 503:
          errorMessage = 'Servicio no disponible. Intenta más tarde.';
          break;
        default:
          if (error.error?.message) {
            errorMessage = error.error.message;
          } else if (error.message) {
            errorMessage = error.message;
          }
      }

      // Mostrar notificación de error solo si no es un error 401
      // (para evitar spam cuando el token expira)
      if (error.status !== 401) {
        notificationService.showError(errorMessage);
      }

      // Log del error para debugging
      console.error('HTTP Error:', {
        status: error.status,
        message: errorMessage,
        url: req.url,
        error: error.error
      });

      return throwError(() => error);
    })
  );
};