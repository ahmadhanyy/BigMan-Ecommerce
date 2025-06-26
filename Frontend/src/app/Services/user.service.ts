import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IUser } from '../Interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loginApi = environment.loginApi;
  private apiUrl = environment.apiUrl;
  private loggedUserEmailSubject = new BehaviorSubject<string | null>(null);  // Initial user id is null
  loggedUserEmail$ = this.loggedUserEmailSubject.asObservable()  // Observable to expose the logged user email

  constructor(private httpClient: HttpClient) {}

  // Register a new user
  register(username: string, email: string, password: string): Observable<any> {
    const body = {
      username: username,
      email: email,
      password: password
    };
    return this.httpClient.post(`${this.loginApi}/register`, body).pipe(
      tap((response: any) => {
        // Store JWT token in localStorage
        if (response.jwt) {
          localStorage.setItem('jwtToken', response.jwt);
          this.loggedUserEmailSubject.next(email);  // Update the loggedUserEmailSubject
        }
      })
    );
  }

  // Login an existing user and store the JWT token
  login(email: string, password: string): Observable<any> {
    const body = {
      identifier: email,
      password: password
    };
    return this.httpClient.post(`${this.loginApi}`, body).pipe(
      tap((response: any) => {
        // Store JWT token in localStorage
        if (response.jwt) {
          localStorage.setItem('jwtToken', response.jwt);
          this.loggedUserEmailSubject.next(email);  // Update the loggedUserEmailSubject
        }
      })
    );
  }

  // Get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      return true;
    }
    else {
      return false;
    }
  }

  // Clear the token on logout
  logout(): void {
    localStorage.removeItem('jwtToken');
    this.loggedUserEmailSubject.next(null);  // Update the loggedUserEmailSubject
  }

  // Delete user by ID
  deleteUser(userDocId: string): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpClient.delete(`${this.apiUrl}/${userDocId}`, { headers });
  }

  // Get user by email
  getUserByEmail(email: string): Observable<IUser[]> {
    const token = this.getToken() // Ensure the JWT token is available
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Filter by email using query params
    return this.httpClient.get<IUser[]>(`${this.apiUrl}/users?filters[email][$eq]=${email}`, { headers });
  }

  // Update user by ID
  updateUser(userId: number, userData: IUser): Observable<IUser> {
    const token = this.getToken(); // Ensure the JWT token is available
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const newUser = {
      username: userData.username,
      email: userData.email,
      password: userData.password
    }
    return this.httpClient.put<IUser>(`${this.apiUrl}/users/${userId}`, newUser, { headers });
  }

}
