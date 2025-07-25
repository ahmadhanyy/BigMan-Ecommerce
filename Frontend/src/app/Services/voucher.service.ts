import { Injectable } from '@angular/core';
import { IVoucher } from '../Interfaces/ivoucher';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

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

  getAvailableVouchers(email: string): Observable<IVoucher[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<{ data: IVoucher[] }>(`${this.apiUrl}/vouchers?populate=*&filters[email][$eq]=${email}&filters[isUsed][$eq]=false&filters[isExpired][$eq]=false`, { headers }).pipe(
      map(response => response.data)
    );
  }

  getAllVouchers(currentPage: number): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.get<any>(`${this.apiUrl}/vouchers?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=20`, { headers });
  }

  getVouchersByEmail(email: string): Observable<IVoucher[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<{ data: IVoucher[] }>(`${this.apiUrl}/vouchers?populate=*&filters[email][$eq]=${email}`, { headers }).pipe(
      map(response => response.data)
    );
  }

  updateVoucher(voucher: IVoucher): Observable<IVoucher> {
    const headers = this.getHeaders();
    const updatedVoucher = {
      data: {
        email: voucher.email,
        voucherCode: voucher.voucherCode,
        value: voucher.value,
        isExpired: voucher.isExpired,
        expiryDate: voucher.expiryDate,
        isUsed: voucher.isUsed,
        usageDate: voucher.usageDate
      }
    }
    return this.httpClient.put<IVoucher>(`${this.apiUrl}/vouchers/${voucher.documentId}`, updatedVoucher, { headers });
  }

  deleteVoucher(voucherDocId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.delete(`${this.apiUrl}/vouchers/${voucherDocId}`, { headers });
  }
}
