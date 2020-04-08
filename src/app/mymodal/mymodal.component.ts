import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Modal1Component } from '../modal1/modal1.component';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-mymodal',
  templateUrl: './mymodal.component.html',
  styleUrls: ['./mymodal.component.css']
})
export class MymodalComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService, private sharedService: SharedService) {
    this.getResponseFromModal();
    this.sharedService.getResponse().subscribe((res: any) => {
      console.log(res);
    }, () => { });
  }

  ngOnInit() {

  }
  openModalWithComponent() {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component',
      name: 'Ramana'
    };
    this.bsModalRef = this.modalService.show(Modal1Component, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  getResponseFromModal() {

  }

}
