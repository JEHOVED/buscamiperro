import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap, catchError, of } from 'rxjs';

import { 
  User, 
  LoginDto, 
  RegisterDto, 
  AuthResponse, 
  ApiResponse 
} from '@buscamiperro/shared';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'bmp_access_token';
  private readonly REFRESH_TOKEN_KEY = 'bmp_refresh_token';
  private readonly USER_KEY = 'bmp_user';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  // Signals para el nuevo Angular
  public currentUser = signal<User | null>(null);
  public isAuthenticated = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  initializeAuth(): void {
    const token = this.getToken();
    const user = this.getStoredUser();
    
    if (token && user) {
      this.setCurrentUser(user);
      // Verificar si el token sigue siendo válido
      this.verifyToken().subscribe();
    }
  }

  login(credentials: LoginDto): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(
      `${environment.apiUrl}/auth/login`,
      credentials
    ).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.handleAuthSuccess(response.data);
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of({
          success: false,
          message: 'Error al iniciar sesión',
          errors: [error.message]
        });
      })
    );
  }

  register(userData: RegisterDto): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(
      `${environment.apiUrl}/auth/register`,
      userData
    ).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.handleAuthSuccess(response.data);
        }
      }),
      catchError(error => {
        console.error('Register error:', error);
        return of({
          success: false,
          message: 'Error al registrarse',
          errors: [error.message]
        });
      })
    );
  }

  loginWithGoogle(): Observable<ApiResponse<AuthResponse>> {
    // Implementar OAuth con Google
    return this.http.post<ApiResponse<AuthResponse>>(
      `${environment.apiUrl}/auth/google`,
      {}
    ).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.handleAuthSuccess(response.data);
        }
      })
    );
  }

  loginWithFacebook(): Observable<ApiResponse<AuthResponse>> {
    // Implementar OAuth con Facebook
    return this.http.post<ApiResponse<AuthResponse>>(
      `${environment.apiUrl}/auth/facebook`,
      {}
    ).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.handleAuthSuccess(response.data);
        }
      })
    );
  }

  refreshToken(): Observable<ApiResponse<AuthResponse>> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      return of({ success: false, message: 'No refresh token available' });
    }

    return this.http.post<ApiResponse<AuthResponse>>(
      `${environment.apiUrl}/auth/refresh`,
      { refreshToken }
    ).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.handleAuthSuccess(response.data);
        }
      }),
      catchError(error => {
        this.logout();
        return of({
          success: false,
          message: 'Error al renovar token',
          errors: [error.message]
        });
      })
    );
  }

  logout(): void {
    // Llamar al endpoint de logout si es necesario
    this.http.post(`${environment.apiUrl}/auth/logout`, {}).subscribe();
    
    // Limpiar almacenamiento local
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    
    // Resetear estado
    this.setCurrentUser(null);
    
    // Redirigir al login
    this.router.navigate(['/login']);
  }

  forgotPassword(email: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${environment.apiUrl}/auth/forgot-password`,
      { email }
    );
  }

  resetPassword(token: string, newPassword: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${environment.apiUrl}/auth/reset-password`,
      { token, newPassword }
    );
  }

  private verifyToken(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(
      `${environment.apiUrl}/auth/me`
    ).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.setCurrentUser(response.data);
        } else {
          this.logout();
        }
      }),
      catchError(() => {
        this.logout();
        return of({ success: false, message: 'Token inválido' });
      })
    );
  }

  private handleAuthSuccess(authData: AuthResponse): void {
    // Guardar tokens
    localStorage.setItem(this.TOKEN_KEY, authData.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, authData.refreshToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authData.user));
    
    // Actualizar estado
    this.setCurrentUser(authData.user);
  }

  private setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
    this.currentUser.set(user);
    this.isAuthenticated.set(!!user);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  private getStoredUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }
}