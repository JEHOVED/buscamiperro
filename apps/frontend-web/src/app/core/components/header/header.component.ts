import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';

import { User } from '@buscamiperro/shared';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'bmp-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule
  ],
  template: `
    <mat-toolbar color="primary" class="header-toolbar">
      <button 
        mat-icon-button 
        (click)="menuToggle.emit()"
        class="menu-button">
        <mat-icon>menu</mat-icon>
      </button>
      
      <div class="logo-container" routerLink="/">
        <mat-icon class="logo-icon">pets</mat-icon>
        <span class="logo-text">BuscaMiPerro</span>
      </div>
      
      <div class="spacer"></div>
      
      <div class="header-actions">
        <button 
          mat-icon-button 
          routerLink="/mapa"
          matTooltip="Mapa">
          <mat-icon>map</mat-icon>
        </button>
        
        @if (isAuthenticated) {
          <button 
            mat-icon-button 
            routerLink="/perros/nuevo"
            matTooltip="Reportar perro perdido"
            class="report-button">
            <mat-icon>add_alert</mat-icon>
          </button>
          
          <button 
            mat-icon-button 
            routerLink="/avistamientos/nuevo"
            matTooltip="Reportar avistamiento">
            <mat-icon>visibility</mat-icon>
          </button>
          
          <button 
            mat-icon-button 
            [matMenuTriggerFor]="userMenu"
            class="user-menu-button">
            @if (user?.avatarUrl) {
              <img 
                [src]="user?.avatarUrl" 
                [alt]="user?.displayName"
                class="user-avatar">
            } @else {
              <mat-icon>account_circle</mat-icon>
            }
          </button>
          
          <mat-menu #userMenu="matMenu">
            <div class="user-info">
              <span class="user-name">{{ user?.displayName }}</span>
              <span class="user-email">{{ user?.email }}</span>
            </div>
            <mat-divider></mat-divider>
            <button mat-menu-item routerLink="/perfil">
              <mat-icon>person</mat-icon>
              <span>Mi Perfil</span>
            </button>
            <button mat-menu-item routerLink="/perros">
              <mat-icon>pets</mat-icon>
              <span>Mis Perros</span>
            </button>
            <button mat-menu-item routerLink="/avistamientos">
              <mat-icon>visibility</mat-icon>
              <span>Mis Avistamientos</span>
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="logout()">
              <mat-icon>logout</mat-icon>
              <span>Cerrar Sesión</span>
            </button>
          </mat-menu>
        } @else {
          <button 
            mat-button 
            routerLink="/login"
            class="login-button">
            Iniciar Sesión
          </button>
          <button 
            mat-raised-button 
            color="accent"
            routerLink="/register"
            class="register-button">
            Registrarse
          </button>
        }
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .header-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .menu-button {
      margin-right: 8px;
    }
    
    .logo-container {
      display: flex;
      align-items: center;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      
      .logo-icon {
        margin-right: 8px;
        font-size: 28px;
      }
      
      .logo-text {
        font-size: 20px;
        font-weight: 500;
      }
    }
    
    .spacer {
      flex: 1;
    }
    
    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .report-button {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }
    
    .user-info {
      padding: 16px;
      display: flex;
      flex-direction: column;
      
      .user-name {
        font-weight: 500;
        margin-bottom: 4px;
      }
      
      .user-email {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.54);
      }
    }
    
    @media (max-width: 768px) {
      .logo-text {
        display: none;
      }
      
      .login-button,
      .register-button {
        font-size: 12px;
        padding: 0 8px;
      }
    }
  `]
})
export class HeaderComponent {
  @Input() isAuthenticated = false;
  @Input() user: User | null = null;
  @Output() menuToggle = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}