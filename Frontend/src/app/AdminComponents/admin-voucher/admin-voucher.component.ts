import { Component, OnInit } from '@angular/core';
import { VoucherService } from '../../Services/voucher.service';
import { IVoucher } from '../../Interfaces/ivoucher';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-admin-voucher',
  templateUrl: './admin-voucher.component.html',
  styleUrl: './admin-voucher.component.scss'
})
export class AdminVoucherComponent implements OnInit {
  vouchers: IVoucher[] = [];
  isLoading: boolean = true;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private voucherService: VoucherService, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.fetchVouchers(this.currentPage);
  }

  fetchVouchers(pageNumber: number){
    this.voucherService.getAllVouchers(pageNumber).subscribe(
      (res) => {
        this.isLoading = false;
        console.log('res: ', res)
        this.vouchers = res.data;
        this.currentPage = res.meta.pagination.page;
        this.totalPages = res.meta.pagination.pageCount;
      },
      (err) => {
        this.isLoading = true;
        console.error(err);
      }
    )
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  onPageChanged(newPage: number) {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.fetchVouchers(newPage);
  }

}
