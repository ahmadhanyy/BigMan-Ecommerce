import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { ModalService } from '../../Services/modal.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-order-placed-modal',
  templateUrl: './order-placed-modal.component.html',
  styleUrl: './order-placed-modal.component.scss'
})
export class OrderPlacedModalComponent {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  constructor(private userService: UserService,
              private modalService: ModalService,
              private viewportScroller: ViewportScroller
  ) {
    console.log('OrderDialogComponent initialized');
  }

  closeModal() {
    this.viewportScroller.scrollToPosition([0, 0]); // scroll to top
    this.close.emit();
  }

}
