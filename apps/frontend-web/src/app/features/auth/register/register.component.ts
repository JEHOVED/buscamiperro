import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'bmp-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="register-page">
      <mat-card class="register-card">
        <mat-card-header>
          <mat-icon class="logo-icon">pets</mat-icon>
          <h1>Registro - BuscaMiPerro</h1>
        </mat-card-header>
        <mat-card-content>
          <p>Componente de registro en desarrollo...</p>
          <button mat-raised-button color="primary" routerLink="/login">
            <mat-icon>arrow_back</mat-icon>
            Volver al Login
          </button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .register-page {
      min-height: calc(100vh - 64px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    
    .register-card {
      max-width: 400px;
      text-align: center;
    }
    
    .logo-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: var(--primary-color);
    }
  `]
})
export class RegisterComponent {}