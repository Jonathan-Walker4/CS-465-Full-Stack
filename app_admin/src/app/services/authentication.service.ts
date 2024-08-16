import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { tap } from 'rxjs/operators';
import { AuthResponse } from '../models/auth-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user: User;
  private baseUrl = 'http://localhost:3000/api'; // Base URL for backend API

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {
    this.user = new User();
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const loginUrl = `${this.baseUrl}/login`; 
    return this.http.post<AuthResponse>(loginUrl, { email, password })
      .pipe(
        tap(({ token }) => this.storeToken(token))
      );
  }

  register(user: User): Observable<AuthResponse> {
    const registerUrl = `${this.baseUrl}/register`; // Correct backend URL
    return this.http.post<AuthResponse>(registerUrl, user);
  }

  logout() {
    this.storage.removeItem('travlr-token'); // Ensure the key matches
    this.user = new User();
  }

  getToken(): string | null {
    const token = this.storage.getItem('travlr-token'); // Ensure the key matches
    return token;
  }
  
  private storeToken(token: string) {
    this.storage.setItem('travlr-token', token); // Ensure the key matches
    const payload = JSON.parse(atob(token.split('.')[1]));
    this.user.email = payload.email;
    this.user.name = payload.name;
  }
  
  getUser(): User {
    return this.user;
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    const isLoggedIn = !!token && this.isTokenValid(token); // Check if token is present and valid
    return isLoggedIn;
  }

  private isTokenValid(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp < (Date.now() / 1000);
      return !isExpired;
    } catch (error) {
      return false;
    }
  }
}
