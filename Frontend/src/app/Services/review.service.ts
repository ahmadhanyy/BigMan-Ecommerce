import { Injectable } from '@angular/core';
import { IReview } from '../Interfaces/ireview';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

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

  getReviewsByProdDocId(prodDocId: string): Observable<IReview[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<IReview[]>(`${this.apiUrl}/reviews?populate=*&filters[prodDocId][$eq]=${prodDocId}`, { headers });
  }

  getReviewsByCoachDocId(coachDocId: string): Observable<IReview[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<IReview[]>(`${this.apiUrl}/reviews?populate=*&filters[coachDocId][$eq]=${coachDocId}`, { headers });
  }

  addReview(review: string): Observable<IReview> {
    const headers = this.getHeaders();
    return this.httpClient.post<IReview>(`${this.apiUrl}/reviews`, review, { headers });
  }

  updateReview(reviewDocId: string, review: string): Observable<IReview> {
    const headers = this.getHeaders();
    return this.httpClient.put<IReview>(`${this.apiUrl}/reviews/${reviewDocId}`, review, { headers });
  }

  deleteReview(reviewDocId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.delete(`${this.apiUrl}/reviews/${reviewDocId}`, { headers });
  }
}
