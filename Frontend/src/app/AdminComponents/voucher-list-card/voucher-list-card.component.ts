import { Component, Input } from '@angular/core';
import { IVoucher } from '../../Interfaces/ivoucher';

@Component({
  selector: 'app-voucher-list-card',
  templateUrl: './voucher-list-card.component.html',
  styleUrl: './voucher-list-card.component.scss'
})
export class VoucherListCardComponent {
  @Input() voucher!: IVoucher;

  editVoucher(){}

  removeVoucher(){}
}
