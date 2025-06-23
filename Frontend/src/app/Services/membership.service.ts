import { Injectable } from '@angular/core';
import { IMembership } from '../Interfaces/imembership';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getMemberships(): Observable<IMembership[]> {
    return this.httpClient.get<IMembership[]>(`${this.apiUrl}/memberships`);
  }
}
