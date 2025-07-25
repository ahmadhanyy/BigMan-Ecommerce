import { Injectable } from '@angular/core';
import { IMessage } from '../Interfaces/imessage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient,
              private userService: UserService) {}

  private getHeaders(): HttpHeaders {
    const token = this.userService.getToken(); // Ensure the JWT token is available
    if (!token) {
      throw new Error('No token found');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllMessages(currentPage: number): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.get<any>(`${this.apiUrl}/messages?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=20&sort=createdAt:desc`, { headers });
  }

  getMessagesByEmail(email: string): Observable<IMessage[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<{ data: IMessage[]}>(`${this.apiUrl}/messages?populate=*&filters[email][$eq]=${email}`, { headers }).pipe(
      map(response => response.data)
    );
  }

  deleteMessage(messageDocId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.delete(`${this.apiUrl}/messages/${messageDocId}`, { headers });
  }
}
