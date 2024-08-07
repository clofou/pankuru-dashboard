import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:8080';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private currentPassword: string | null = null; // Ajout d'une variable pour stocker le mot de passe

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = this.isBrowser() ? localStorage.getItem('currentUser') : null;
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/personne/connexion`, { username, password })
      .pipe(
        map(user => {
          if (user && user.token && this.isBrowser()) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.currentPassword = password; // Stocker le mot de passe
          }
          return user;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));;
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.currentPassword = null; // Réinitialiser le mot de passe
    this.router.navigate(['/connexion']);
  }

  hasRole(role: string): boolean {
    return this.currentUserValue && this.currentUserValue.role && this.currentUserValue.role === role;
  }

  getUsername(): string | null {
    let user = this.currentUserSubject.value;
    console.log("===========================================" + user.email);
    return user ? user.email : null;
  }

  getPassword(): string | null {
    console.log("===========================================" + this.currentPassword);
    return this.currentPassword; // Retourner le mot de passe stocké
  }

  getRole(): string {
    let user = this.currentUserValue;
    return user && user.role && Array.isArray(user.role) ? user.role[0] : '';
  }
  
}
