import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'bmp-dog-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dog-list-page">
      <h1>Mis Perros</h1>
      <p>Lista de perros perdidos - En desarrollo</p>
    </div>
  `,
  styles: [`
    .dog-list-page {
      padding: 16px;
    }
  `]
})
export class DogListComponent {}