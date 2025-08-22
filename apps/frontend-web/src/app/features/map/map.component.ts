import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'bmp-map',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="map-page">
      <div class="map-header">
        <h1>Mapa de Perros Perdidos</h1>
        <p>Encuentra perros perdidos y reporta avistamientos en tu área</p>
      </div>

      <div class="map-filters">
        <mat-chip-set>
          <mat-chip-option 
            [selected]="selectedFilter === 'all'"
            (click)="setFilter('all')">
            Todos
          </mat-chip-option>
          <mat-chip-option 
            [selected]="selectedFilter === 'lost'"
            (click)="setFilter('lost')">
            <mat-icon>pets</mat-icon>
            Perros Perdidos
          </mat-chip-option>
          <mat-chip-option 
            [selected]="selectedFilter === 'sightings'"
            (click)="setFilter('sightings')">
            <mat-icon>visibility</mat-icon>
            Avistamientos
          </mat-chip-option>
        </mat-chip-set>
      </div>

      <div class="map-container" #mapContainer>
        @if (isLoading) {
          <div class="loading-overlay">
            <mat-spinner></mat-spinner>
            <p>Cargando mapa...</p>
          </div>
        } @else {
          <div class="map-placeholder">
            <mat-icon>map</mat-icon>
            <h3>Mapa de Leaflet</h3>
            <p>Aquí se mostrará el mapa interactivo con:</p>
            <ul>
              <li>📍 Ubicaciones de perros perdidos</li>
              <li>👁️ Avistamientos reportados</li>
              <li>🎯 Tu ubicación actual</li>
            </ul>
            <button mat-raised-button color="primary" (click)="initializeMap()">
              <mat-icon>my_location</mat-icon>
              Activar Mapa
            </button>
          </div>
        }
      </div>

      <div class="map-legend">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Leyenda</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="legend-item">
              <mat-icon color="warn">pets</mat-icon>
              <span>Perro perdido</span>
            </div>
            <div class="legend-item">
              <mat-icon color="accent">visibility</mat-icon>
              <span>Avistamiento</span>
            </div>
            <div class="legend-item">
              <mat-icon color="primary">my_location</mat-icon>
              <span>Tu ubicación</span>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="quick-actions">
        <button 
          mat-fab 
          color="accent" 
          class="fab-report"
          routerLink="/perros/nuevo">
          <mat-icon>add_alert</mat-icon>
        </button>
        <button 
          mat-fab 
          color="primary" 
          class="fab-sighting"
          routerLink="/avistamientos/nuevo">
          <mat-icon>visibility</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .map-page {
      height: calc(100vh - 80px);
      display: flex;
      flex-direction: column;
    }

    .map-header {
      text-align: center;
      margin-bottom: 16px;
      
      h1 {
        margin: 0 0 8px 0;
        color: var(--primary-color);
      }
      
      p {
        margin: 0;
        color: var(--text-secondary);
      }
    }

    .map-filters {
      margin-bottom: 16px;
      display: flex;
      justify-content: center;
      
      mat-chip-option {
        margin: 0 4px;
      }
    }

    .map-container {
      flex: 1;
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 0.9);
      z-index: 1000;
      
      p {
        margin-top: 16px;
        color: var(--text-secondary);
      }
    }

    .map-placeholder {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      color: var(--text-secondary);
      
      mat-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        margin-bottom: 16px;
        color: var(--primary-color);
      }
      
      h3 {
        margin: 0 0 16px 0;
        color: var(--text-primary);
      }
      
      ul {
        text-align: left;
        margin: 16px 0;
      }
      
      button {
        margin-top: 16px;
      }
    }

    .map-legend {
      position: absolute;
      top: 80px;
      right: 16px;
      z-index: 1000;
      
      mat-card {
        min-width: 200px;
      }
      
      .legend-item {
        display: flex;
        align-items: center;
        margin: 8px 0;
        
        mat-icon {
          margin-right: 8px;
        }
      }
    }

    .quick-actions {
      position: fixed;
      bottom: 24px;
      right: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      z-index: 1000;
    }

    .fab-report {
      background-color: var(--accent-color) !important;
    }

    .fab-sighting {
      background-color: var(--primary-color) !important;
    }

    @media (max-width: 768px) {
      .map-legend {
        position: static;
        margin-top: 16px;
      }
      
      .quick-actions {
        bottom: 16px;
        right: 16px;
        gap: 12px;
      }
      
      .fab-report,
      .fab-sighting {
        width: 48px;
        height: 48px;
      }
    }
  `]
})
export class MapComponent implements OnInit, OnDestroy {
  selectedFilter: 'all' | 'lost' | 'sightings' = 'all';
  isLoading = false;
  private map: any;

  ngOnInit() {
    // Inicialización del componente
  }

  ngOnDestroy() {
    // Limpiar recursos del mapa si existe
    if (this.map) {
      this.map.remove();
    }
  }

  setFilter(filter: 'all' | 'lost' | 'sightings') {
    this.selectedFilter = filter;
    // Aquí se filtrarían los marcadores del mapa
    console.log('Filter changed to:', filter);
  }

  initializeMap() {
    this.isLoading = true;
    
    // Simular carga del mapa
    setTimeout(() => {
      this.isLoading = false;
      console.log('Map initialized');
      // Aquí se inicializaría Leaflet
    }, 2000);
  }
}