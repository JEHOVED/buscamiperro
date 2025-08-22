import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { HeaderComponent } from './core/components/header/header.component';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { AuthService } from './core/services/auth.service';
import { NotificationService } from './core/services/notification.service';

@Component({
  selector: 'bmp-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    HeaderComponent,
    SidenavComponent
  ],
  template: `
    <div class="app-container">
      <bmp-header 
        (menuToggle)="sidenav.toggle()"
        [isAuthenticated]="authService.isAuthenticated()"
        [user]="authService.currentUser()">
      </bmp-header>
      
      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav 
          #sidenav 
          mode="over" 
          class="sidenav"
          [opened]="false">
          <bmp-sidenav 
            [isAuthenticated]="authService.isAuthenticated()"
            (navigate)="sidenav.close()">
          </bmp-sidenav>
        </mat-sidenav>
        
        <mat-sidenav-content class="main-content">
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .sidenav-container {
      flex: 1;
    }
    
    .sidenav {
      width: 280px;
    }
    
    .main-content {
      padding: 16px;
      background-color: var(--background-color);
      min-height: calc(100vh - 64px);
    }
    
    @media (max-width: 768px) {
      .main-content {
        padding: 8px;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'BuscaMiPerro';

  constructor(
    public authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    // Inicializar servicios
    this.authService.initializeAuth();
    this.notificationService.requestPermission();
  }
}