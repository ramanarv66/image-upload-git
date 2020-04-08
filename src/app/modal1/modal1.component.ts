import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-modal1',
  templateUrl: './modal1.component.html',
  styleUrls: ['./modal1.component.css']
})
export class Modal1Component implements OnInit {

  title: string;
  closeBtnName: string;
  bodyMsg: string;

  //@Input() list: any[] = [];
  name: string;

  constructor(public bsModalRef: BsModalRef, private sharedService: SharedService) { }

  ngOnInit() {

  }
  handle() {
    this.bsModalRef.hide();
    this.sharedService.setResponse('hello button clicked');
  }

}
