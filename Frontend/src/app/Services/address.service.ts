import { Injectable } from '@angular/core';
import { IAddress } from '../Interfaces/iaddress';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

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

  getAddressByEmail(email: string): Observable<IAddress[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<{data: IAddress[]}>(`${this.apiUrl}/addresses?populate=*&filters[email][$eq]=${email}`, { headers }).pipe(
      map(res => res.data)
    );
  }

  addAddress(address: IAddress): Observable<IAddress> {
    const newAddress = {
      data: {
        buildingNo: address.buildingNo,
        street: address.street,
        city: address.city,
        government: address.government,
        moreInfo: address.moreInfo,
        phone: address.phone,
        email: address.email
      }
    }
    const headers = this.getHeaders();
    return this.httpClient.post<IAddress>(`${this.apiUrl}/addresses`, newAddress, { headers });
  }

  updateAddress(addressDocId: string, address: IAddress): Observable<IAddress> {
  const newAddress = {
    data: {
      buildingNo: address.buildingNo,
      street: address.street,
      city: address.city,
      government: address.government,
      moreInfo: address.moreInfo,
      phone: address.phone,
      email: address.email
    }
  };
    const headers = this.getHeaders();
    return this.httpClient.put<IAddress>(`${this.apiUrl}/addresses/${addressDocId}`, newAddress, { headers });
  }

  deleteAddress(addressDocId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.delete(`${this.apiUrl}/addresses/${addressDocId}`, { headers });
  }

}
