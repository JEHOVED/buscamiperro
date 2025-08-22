import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { LoginDto } from '@buscamiperro/shared';

@Component({
  selector: 'bmp-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="login-page">
      <div class="login-container">
        <mat-card class="login-card">
          <mat-card-header class="login-header">
            <div class="logo-section">
              <mat-icon class="logo-icon">pets</mat-icon>
              <h1>BuscaMiPerro</h1>
            </div>
            <p>Inicia sesión para encontrar a tu mejor amigo</p>
          </mat-card-header>

          <mat-card-content>
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Correo electrónico</mat-label>
                <input 
                  matInput 
                  type="email" 
                  formControlName="email"
                  placeholder="tu@email.com">
                <mat-icon matSuffix>email</mat-icon>
                @if (loginForm.get('email')?.hasError('required') && loginForm.get('email')?.touched) {
                  <mat-error>El correo es requerido</mat-error>
                }
                @if (loginForm.get('email')?.hasError('email') && loginForm.get('email')?.touched) {
                  <mat-error>Ingresa un correo válido</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Contraseña</mat-label>
                <input 
                  matInput 
                  [type]="hidePassword ? 'password' : 'text'" 
                  formControlName="password"
                  placeholder="Tu contraseña">
                <button 
                  mat-icon-button 
                  matSuffix 
                  type="button"
                  (click)="hidePassword = !hidePassword">
                  <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
                @if (loginForm.get('password')?.hasError('required') && loginForm.get('password')?.touched) {
                  <mat-error>La contraseña es requerida</mat-error>
                }
                @if (loginForm.get('password')?.hasError('minlength') && loginForm.get('password')?.touched) {
                  <mat-error>La contraseña debe tener al menos 6 caracteres</mat-error>
                }
              </mat-form-field>

              <div class="form-actions">
                <button 
                  mat-raised-button 
                  color="primary" 
                  type="submit"
                  [disabled]="loginForm.invalid || isLoading"
                  class="login-button">
                  @if (isLoading) {
                    <mat-spinner diameter="20"></mat-spinner>
                  } @else {
                    <mat-icon>login</mat-icon>
                  }
                  Iniciar Sesión
                </button>

                <a 
                  mat-button 
                  routerLink="/forgot-password"
                  class="forgot-link">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </form>

            <mat-divider class="divider">
              <span class="divider-text">O continúa con</span>
            </mat-divider>

            <div class="social-login">
              <button 
                mat-stroked-button 
                (click)="loginWithGoogle()"
                [disabled]="isLoading"
                class="social-button google-button">
                <mat-icon svgIcon="google"></mat-icon>
                Google
              </button>

              <button 
                mat-stroked-button 
                (click)="loginWithFacebook()"
                [disabled]="isLoading"
                class="social-button facebook-button">
                <mat-icon svgIcon="facebook"></mat-icon>
                Facebook
              </button>
            </div>
          </mat-card-content>

          <mat-card-actions class="card-actions">
            <p class="register-text">
              ¿No tienes cuenta?
              <a routerLink="/register" class="register-link">Regístrate aquí</a>
            </p>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: calc(100vh - 64px);
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 16px;
    }

    .login-container {
      width: 100%;
      max-width: 400px;
    }

    .login-card {
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border-radius: 16px;
    }

    .login-header {
      text-align: center;
      padding: 24px 24px 16px;
      
      .logo-section {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 8px;
        
        .logo-icon {
          font-size: 32px;
          width: 32px;
          height: 32px;
          margin-right: 8px;
          color: var(--primary-color);
        }
        
        h1 {
          margin: 0;
          color: var(--primary-color);
          font-weight: 500;
        }
      }
      
      p {
        margin: 0;
        color: var(--text-secondary);
        font-size: 14px;
      }
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 8px;
      
      .login-button {
        height: 48px;
        font-size: 16px;
        
        mat-spinner {
          margin-right: 8px;
        }
      }
      
      .forgot-link {
        align-self: center;
        font-size: 14px;
      }
    }

    .divider {
      margin: 24px 0;
      position: relative;
      
      .divider-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 0 16px;
        color: var(--text-secondary);
        font-size: 12px;
      }
    }

    .social-login {
      display: flex;
      gap: 12px;
      
      .social-button {
        flex: 1;
        height: 44px;
        
        mat-icon {
          margin-right: 8px;
        }
      }
      
      .google-button {
        border-color: #db4437;
        color: #db4437;
        
        &:hover {
          background-color: rgba(219, 68, 55, 0.04);
        }
      }
      
      .facebook-button {
        border-color: #4267b2;
        color: #4267b2;
        
        &:hover {
          background-color: rgba(66, 103, 178, 0.04);
        }
      }
    }

    .card-actions {
      padding: 16px 24px 24px;
      justify-content: center;
      
      .register-text {
        margin: 0;
        font-size: 14px;
        color: var(--text-secondary);
        
        .register-link {
          color: var(--primary-color);
          text-decoration: none;
          font-weight: 500;
          
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    @media (max-width: 480px) {
      .login-page {
        padding: 8px;
      }
      
      .social-login {
        flex-direction: column;
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;
  returnUrl = '/';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Obtener URL de retorno
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    // Si ya está autenticado, redirigir
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const credentials: LoginDto = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.notificationService.showSuccess('¡Bienvenido de vuelta!');
            this.router.navigate([this.returnUrl]);
          } else {
            this.notificationService.showError(
              response.message || 'Error al iniciar sesión'
            );
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.notificationService.showError('Error de conexión');
        }
      });
    }
  }

  loginWithGoogle() {
    this.isLoading = true;
    this.authService.loginWithGoogle().subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.notificationService.showSuccess('¡Bienvenido!');
          this.router.navigate([this.returnUrl]);
        }
      },
      error: () => {
        this.isLoading = false;
        this.notificationService.showError('Error al iniciar sesión con Google');
      }
    });
  }

  loginWithFacebook() {
    this.isLoading = true;
    this.authService.loginWithFacebook().subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.notificationService.showSuccess('¡Bienvenido!');
          this.router.navigate([this.returnUrl]);
        }
      },
      error: () => {
        this.isLoading = false;
        this.notificationService.showError('Error al iniciar sesión con Facebook');
      }
    });
  }
}