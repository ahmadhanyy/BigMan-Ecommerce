import { Component } from '@angular/core';
import { MessageService } from '../../Services/message.service';
import { IMessage } from '../../Interfaces/imessage';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-admin-message',
  templateUrl: './admin-message.component.html',
  styleUrl: './admin-message.component.scss'
})
export class AdminMessageComponent {
  message: IMessage[] = [];
  isLoading: boolean = true;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private messageService: MessageService, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.fetchMessage(this.currentPage);
  }

  fetchMessage(pageNumber: number){
    this.messageService.getAllMessages(pageNumber).subscribe(
      (res) => {
        this.isLoading = false;
        console.log('res: ', res)
        this.message = res.data;
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
    this.fetchMessage(newPage);
  }
}
