import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'bmp-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  template: `
    <div class="not-found-page">
      <div class="not-found-content">
        <mat-icon class="not-found-icon">pets</mat-icon>
        <h1>404 - Página no encontrada</h1>
        <p>Lo sentimos, la página que buscas no existe.</p>
        <button mat-raised-button color="primary" routerLink="/">
          <mat-icon>home</mat-icon>
          Volver al inicio
        </button>
      </div>
    </div>
  `,
  styles: [`
    .not-found-page {
      min-height: calc(100vh - 64px);
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 16px;
    }
    
    .not-found-content {
      max-width: 400px;
    }
    
    .not-found-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: var(--text-secondary);
      margin-bottom: 16px;
    }
    
    h1 {
      color: var(--text-primary);
      margin-bottom: 16px;
    }
    
    p {
      color: var(--text-secondary);
      margin-bottom: 24px;
    }
  `]
})
export class NotFoundComponent {}