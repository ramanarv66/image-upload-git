import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-waring-modal',
  templateUrl: './waring-modal.component.html',
  styleUrls: ['./waring-modal.component.css']
})
export class WaringModalComponent implements OnInit {
  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }



  ngOnInit() {
  }


}
