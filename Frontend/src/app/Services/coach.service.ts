import { Injectable } from '@angular/core';
import { ICoach } from '../Interfaces/icoach';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getCoaches(currentPage: number): Observable<ICoach[]> {
    return this.httpClient.get<ICoach[]>(`${this.apiUrl}/coaches?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=20`);
  }

  getCoachById(id: number): Observable<ICoach> {
    return this.httpClient.get<ICoach>(`${this.apiUrl}/coaches?filters[id][$eq]=${id}&populate=*`);
  }

  getCoachByDocId(docId: string): Observable<ICoach> {
    return this.httpClient.get<ICoach>(`${this.apiUrl}/coaches?filters[documentId][$eq]=${docId}&populate=*`);
  }

  getSortedCoaches(sort: string, currentPage: number): Observable<any> {
    let url = `${this.apiUrl}/coaches?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=20`;
    // Sorting
    switch (sort) {
      case 'experience':
        url += `&sort=experiance:desc`;
        break;
      case 'price-low':
        url += `&sort=salary:asc`;
        break;
      case 'price-high':
        url += `&sort=salary:desc`;
        break;
      case 'newest':
        url += `&sort=createdAt:desc`;
        break;
    }
    return this.httpClient.get<any>(url);
  }

  convertListTo2DList(prodsList: ICoach[], size: number): ICoach[][] {
    const rows: ICoach[][] = [];
    for (let i = 0; i < prodsList.length; i += size) {
      rows.push(prodsList.slice(i, i + 4));
    }
    return rows;
  }

}
