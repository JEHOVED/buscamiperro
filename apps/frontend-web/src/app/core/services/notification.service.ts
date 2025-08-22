import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private permission: NotificationPermission = 'default';

  constructor(private snackBar: MatSnackBar) {
    this.permission = Notification.permission;
  }

  async requestPermission(): Promise<NotificationPermission> {
    if ('Notification' in window) {
      this.permission = await Notification.requestPermission();
    }
    return this.permission;
  }

  showSuccess(message: string, action: string = 'Cerrar'): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  showError(message: string, action: string = 'Cerrar'): void {
    this.snackBar.open(message, action, {
      duration: 7000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  showWarning(message: string, action: string = 'Cerrar'): void {
    this.snackBar.open(message, action, {
      duration: 6000,
      panelClass: ['warning-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  showInfo(message: string, action: string = 'Cerrar'): void {
    this.snackBar.open(message, action, {
      duration: 4000,
      panelClass: ['info-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  showPushNotification(title: string, options?: NotificationOptions): void {
    if (this.permission === 'granted') {
      new Notification(title, {
        icon: '/assets/icons/icon-192x192.png',
        badge: '/assets/icons/icon-72x72.png',
        ...options
      });
    }
  }

  showDogFoundNotification(dogName: string, location: string): void {
    this.showPushNotification(
      `¡Posible avistamiento de ${dogName}!`,
      {
        body: `Se ha reportado un avistamiento cerca de ${location}`,
        tag: 'dog-sighting',
        requireInteraction: true
      }
    );
  }

  showMatchNotification(dogName: string): void {
    this.showPushNotification(
      `¡Nueva coincidencia para ${dogName}!`,
      {
        body: 'Alguien ha reportado un avistamiento que podría ser tu mascota',
        tag: 'dog-match',
        requireInteraction: true
      }
    );
  }

  showChatNotification(senderName: string, message: string): void {
    this.showPushNotification(
      `Mensaje de ${senderName}`,
      {
        body: message.length > 50 ? message.substring(0, 50) + '...' : message,
        tag: 'chat-message'
      }
    );
  }
}