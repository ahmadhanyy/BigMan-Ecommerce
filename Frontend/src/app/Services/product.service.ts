import { Injectable } from '@angular/core';
import { IProdVariant, IProduct } from '../Interfaces/iproduct';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
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

  getProducts(currentPage: number): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${this.apiUrl}/products?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=20`);
  }

  getProductsByCatId(catId: number, currentPage: number): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${this.apiUrl}/products?filters[categories][id][$eq]=${catId}&populate=*&pagination[page]=${currentPage}&pagination[pageSize]=20`);
  }

  getDiscountByCategory(catName: string): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${this.apiUrl}/products?filters[discountPrecent][$gte]=1&filters[categories][name][$eq]=${catName}&populate=*&pagination[limit]=15`);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${this.apiUrl}/products?&filters[id][$eq]=${id}&populate=*`);
  }

  getProductByDocId(prodDocId: string): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${this.apiUrl}/products?filters[documentId][$eq]=${prodDocId}&populate=*`);
  }

  updateVariantQuantity(documentId: string, variant: IProdVariant): Observable<any> {
    const newvariant = {
      data: {
        color: variant.color,
        size: variant.size,
        quantity: variant.quantity
      }
    };
    const headers = this.getHeaders();
    return this.httpClient.put(`${this.apiUrl}/prod-variants/${documentId}`, newvariant, { headers });
  }


  convertListTo2DList(prodsList: IProduct[], size: number): IProduct[][] {
    const rows: IProduct[][] = [];
    for (let i = 0; i < prodsList.length; i += size) {
      rows.push(prodsList.slice(i, i + 4));
    }
    return rows;
  }
}
