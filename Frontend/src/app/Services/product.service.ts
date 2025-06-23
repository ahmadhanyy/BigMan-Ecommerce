import { Injectable } from '@angular/core';
import { IProduct } from '../Interfaces/iproduct';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${this.apiUrl}/products?populate=*`);
  }

  getProductsByCatId(catId: number): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${this.apiUrl}/products?filters[catId][$eq]=${catId}&populate=*`);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${this.apiUrl}/products?filters[id][$eq]=${id}&populate=*`);
  }

  getProductByDocId(prodDocId: string): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${this.apiUrl}/products?filters[documentId][$eq]=${prodDocId}&populate=*`);
  }

  convertListTo2DList(prodsList: IProduct[], size: number): IProduct[][] {
    const rows: IProduct[][] = [];
    for (let i = 0; i < prodsList.length; i += size) {
      rows.push(prodsList.slice(i, i + 4));
    }
    return rows;
  }
}
