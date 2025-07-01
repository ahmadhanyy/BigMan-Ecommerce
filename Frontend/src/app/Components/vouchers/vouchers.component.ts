import { Component, OnInit } from '@angular/core';
import { VoucherService } from '../../Services/voucher.service';
import { UserService } from '../../Services/user.service';
import { IVoucher } from '../../Interfaces/ivoucher';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrl: './vouchers.component.scss'
})
export class VouchersComponent implements OnInit {
  availableVouchers: IVoucher[] = [];
  usedVouchers: IVoucher[] = [];
  showActiveSection: boolean = true;

  constructor(private voucherService: VoucherService, private userService: UserService) {}

  ngOnInit(): void {
    // Subscribe to the loggedUserId$ observable to get real-time updates
    this.userService.loggedUserEmail$.subscribe((email) => {
      if (email) {
        this.voucherService.getVouchersByEmail(email).subscribe((res) => {
          this.usedVouchers = res.filter(voucher => voucher.isUsed);
          this.availableVouchers = res.filter(voucher => !voucher.isUsed && !voucher.isExpired);
        });
      }
    });
  }

  showActiveVouchers(): void {
    this.showActiveSection = true;
  }

  showUsedVouchers(): void {
    this.showActiveSection = false;
  }
}
