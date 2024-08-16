import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  // Method to get trips from the server
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.baseUrl}/trips`);
  }

  // Method to get a single trip by its code
  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/trips/${tripCode}`);
  }

  // Method to add a new trip to the server
  addTrip(trip: Trip): Observable<Trip> {
    const headers = this.createAuthorizationHeader();
    return this.http.post<Trip>(`${this.baseUrl}/trips`, trip, { headers });
  }

  // Method to update an existing trip on the server
  updateTrip(trip: Trip): Observable<Trip> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<Trip>(`${this.baseUrl}/trips/${trip.code}`, trip, { headers });
  }

  // Method to login the user, returns an AuthResponse with the JWT
  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  // Method to register a new user, returns an AuthResponse with the JWT
  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  // Helper method to handle both login and register API calls
  private handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    const formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };
    return this.http.post<AuthResponse>(`${this.baseUrl}/${endpoint}`, formData);
  }

  // Helper method to create the Authorization header
  private createAuthorizationHeader(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Method to get the JWT token from local storage
  private getToken(): string | null {
    return this.storage.getItem('travlr-token');
  }
}
