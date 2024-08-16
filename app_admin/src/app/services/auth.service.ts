import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {
    this.user = new User();
  }

  login(user: User, password: string) {
    return this.http.post<{ token: string }>('/api/login', { email: user.email, password })
      .pipe(
        tap(({ token }) => this.storeToken(token))
      ).subscribe();
  }

  register(user: User) {
    return this.http.post('/api/register', user);
  }

  logout() {
    this.storage.removeItem('token');
    this.user = new User();
  }

  getToken(): string | null {
    return this.storage.getItem('token');
  }
  
  private storeToken(token: string) {
    try {
      this.storage.setItem('token', token);
      
      // Split the JWT to decode the payload
      const payload = JSON.parse(atob(token.split('.')[1]));
  
      // Assign the decoded values to the user object
      this.user.email = payload.email;
      this.user.name = payload.name;
  
      console.log('Token stored successfully:', payload);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  }
  

  getUser(): User {
    return this.user;
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    const isLoggedIn = !!token;
    console.log('isLoggedIn check:', isLoggedIn);
    return isLoggedIn;
}

}
