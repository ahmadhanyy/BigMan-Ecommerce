import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IUser } from '../Interfaces/iuser';
import { Inject, PLATFORM_ID, Injector  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserInformationService } from './user-information.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loginApi = environment.loginApi;
  private apiUrl = environment.apiUrl;
  private _userInfoService!: UserInformationService;

  constructor(
    private injector: Injector,
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private get userInfoService(): UserInformationService {
    if (!this._userInfoService) {
      this._userInfoService = this.injector.get(UserInformationService);
    }
    return this._userInfoService;
  }

  // Register a new user
  register(username: string, email: string, password: string): Observable<any> {
    const body = {
      username: username,
      email: email,
      password: password
    };
    return this.httpClient.post(`${this.loginApi}/register`, body).pipe(
      tap((response: any) => {
        // Store JWT token in a cookie
        if (response.jwt) {
          this.setCookie('jwtToken', response.jwt, 2); // store for 2 days
          this.setCookie('email', response.user.email, 2); // store for 2 days
          console.log('change log subject to ', email);
          this.userInfoService.loggedUserEmailSubject.next(email);  // Update the loggedUserEmailSubject
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
        // Store JWT token in a cookie
        if (response.jwt) {
          this.setCookie('jwtToken', response.jwt, 2); // store for 2 days
          this.setCookie('email', response.user.email, 2); // store for 2 days
          console.log('change log subject to ', email);
          this.userInfoService.loggedUserEmailSubject.next(email);  // Update the loggedUserEmailSubject
        }
      })
    );
  }

  getAllUsers(currentPage: number): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpClient.get<any>(`${this.apiUrl}/users?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=20&sort=createdAt:desc`, { headers });
  }

  // Get the token from the cookie
  getToken(): string | null {
    return this.getCookie('jwtToken');
  }

    // Get the token from the cookie
    getEmail(): string | null {
      return this.getCookie('email');
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
    console.log('change log subject from logout() to null');
    this.userInfoService.loggedUserEmailSubject.next(null);
    this.deleteCookie('jwtToken');
    this.deleteCookie('email');
  }

  // Delete user by ID
  deleteUser(userDocId: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpClient.delete(`${this.apiUrl}/${userDocId}`, { headers }).pipe(
      tap(() => {
        // Clear the cookies and update the loggedUserEmailSubject
        this.deleteCookie('jwtToken');
        this.deleteCookie('email');
        console.log('change log subject to null');
        this.userInfoService.loggedUserEmailSubject.next(null);  // Update the loggedUserEmailSubject
      })
    );
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

  private setCookie(name: string, value: string, days: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      const encodedValue = encodeURIComponent(value);
      document.cookie = `${name}=${encodedValue}; expires=${expires}; path=/; secure`;
    }
  }

  private getCookie(name: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const cookies = document.cookie.split('; ');
      for (let cookie of cookies) {
        const [key, val] = cookie.split('=');
        if (key === name) return decodeURIComponent(val);
      }
    }
    return null;
  }

  private deleteCookie(name: string): void {
    if (isPlatformBrowser(this.platformId)) {
      document.cookie = `${name}=; Max-Age=0; path=/; secure`;
    }
  }


}
