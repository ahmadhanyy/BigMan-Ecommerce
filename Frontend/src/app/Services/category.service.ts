import { Injectable } from '@angular/core';
import { ICategory } from '../Interfaces/icategory';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(`${this.apiUrl}/categories`);
  }
}
