import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-order-placed-modal',
  templateUrl: './order-placed-modal.component.html',
  styleUrl: './order-placed-modal.component.scss'
})
export class OrderPlacedModalComponent {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  constructor(private viewportScroller: ViewportScroller) {}

  closeModal() {
    this.viewportScroller.scrollToPosition([0, 0]); // scroll to top
    this.close.emit();
  }

}
