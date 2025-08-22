import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'bmp-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="forgot-page">
      <mat-card>
        <mat-card-header>
          <h1>Recuperar Contraseña</h1>
        </mat-card-header>
        <mat-card-content>
          <p>Componente en desarrollo...</p>
          <button mat-button routerLink="/login">Volver al Login</button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .forgot-page {
      min-height: calc(100vh - 64px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
  `]
})
export class ForgotPasswordComponent {}