import { Injectable } from '@angular/core';
import { IBranch } from '../Interfaces/ibranch';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getBranches(): Observable<IBranch[]> {
    return this.httpClient.get<IBranch[]>(`${this.apiUrl}/branches`);
  }
}
