import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'bmp-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatDividerModule
  ],
  template: `
    <div class="sidenav-content">
      <div class="sidenav-header">
        <mat-icon class="logo-icon">pets</mat-icon>
        <h2>BuscaMiPerro</h2>
      </div>
      
      <mat-divider></mat-divider>
      
      <mat-nav-list>
        <a 
          mat-list-item 
          routerLink="/mapa"
          (click)="navigate.emit()"
          routerLinkActive="active">
          <mat-icon matListItemIcon>map</mat-icon>
          <span matListItemTitle>Mapa</span>
        </a>
        
        @if (isAuthenticated) {
          <a 
            mat-list-item 
            routerLink="/perros"
            (click)="navigate.emit()"
            routerLinkActive="active">
            <mat-icon matListItemIcon>pets</mat-icon>
            <span matListItemTitle>Mis Perros</span>
          </a>
          
          <a 
            mat-list-item 
            routerLink="/avistamientos"
            (click)="navigate.emit()"
            routerLinkActive="active">
            <mat-icon matListItemIcon>visibility</mat-icon>
            <span matListItemTitle>Avistamientos</span>
          </a>
          
          <mat-divider></mat-divider>
          
          <a 
            mat-list-item 
            routerLink="/perros/nuevo"
            (click)="navigate.emit()"
            class="report-item">
            <mat-icon matListItemIcon>add_alert</mat-icon>
            <span matListItemTitle>Reportar Perro Perdido</span>
          </a>
          
          <a 
            mat-list-item 
            routerLink="/avistamientos/nuevo"
            (click)="navigate.emit()">
            <mat-icon matListItemIcon>add_location</mat-icon>
            <span matListItemTitle>Reportar Avistamiento</span>
          </a>
          
          <mat-divider></mat-divider>
          
          <a 
            mat-list-item 
            routerLink="/perfil"
            (click)="navigate.emit()"
            routerLinkActive="active">
            <mat-icon matListItemIcon>person</mat-icon>
            <span matListItemTitle>Mi Perfil</span>
          </a>
        } @else {
          <a 
            mat-list-item 
            routerLink="/login"
            (click)="navigate.emit()">
            <mat-icon matListItemIcon>login</mat-icon>
            <span matListItemTitle>Iniciar Sesión</span>
          </a>
          
          <a 
            mat-list-item 
            routerLink="/register"
            (click)="navigate.emit()">
            <mat-icon matListItemIcon>person_add</mat-icon>
            <span matListItemTitle>Registrarse</span>
          </a>
        }
      </mat-nav-list>
      
      <div class="sidenav-footer">
        <mat-divider></mat-divider>
        <div class="footer-content">
          <p class="app-version">v1.0.0</p>
          <p class="footer-text">Ayudando a reunir familias</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sidenav-content {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .sidenav-header {
      padding: 24px 16px;
      display: flex;
      align-items: center;
      background: linear-gradient(135deg, var(--primary-color), #1565c0);
      color: white;
      
      .logo-icon {
        margin-right: 12px;
        font-size: 32px;
      }
      
      h2 {
        margin: 0;
        font-weight: 500;
      }
    }
    
    mat-nav-list {
      flex: 1;
      padding-top: 8px;
    }
    
    .report-item {
      background-color: rgba(255, 64, 129, 0.1);
      margin: 4px 8px;
      border-radius: 8px;
      
      mat-icon {
        color: var(--accent-color);
      }
    }
    
    .active {
      background-color: rgba(25, 118, 210, 0.1);
      
      mat-icon {
        color: var(--primary-color);
      }
    }
    
    .sidenav-footer {
      margin-top: auto;
      
      .footer-content {
        padding: 16px;
        text-align: center;
        
        .app-version {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.54);
          margin: 0 0 4px 0;
        }
        
        .footer-text {
          font-size: 11px;
          color: rgba(0, 0, 0, 0.38);
          margin: 0;
          font-style: italic;
        }
      }
    }
  `]
})
export class SidenavComponent {
  @Input() isAuthenticated = false;
  @Output() navigate = new EventEmitter<void>();
}