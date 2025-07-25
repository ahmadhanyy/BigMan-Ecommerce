import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor(private viewportScroller: ViewportScroller) { }

  onLinkClick(){
    this.viewportScroller.scrollToPosition([0, 0]); // scroll to top
  }

}
