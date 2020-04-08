import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Modal1Component } from '../modal1/modal1.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  time: number;
  msg: string;
  finalMsg: string;
  finalMsg2: string;
  minutes: number;
  minutes_: number;
  hours_: number;
  msg1: boolean;
  msg2: boolean;
  bsModalRef: BsModalRef;
  CurrentTime: any;
  counter: number;
  constructor(private modalService: BsModalService) {


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

  ngOnInit() {
    this.minutes_ = new Date().getMinutes();
    this.hours_ = new Date().getHours();

    let abc: any = Date.now();
    // console.log(abc)
    this.counter = 0;
    this.msg1 = true;
    let myObservable = timer(1000, 1000);
    // myObservable.subscribe(a => console.log(a))
    myObservable.subscribe(x => {
      this.time = x;
      //console.log(this.time);
      // if (this.time === 59) { this.time = 60; }
      this.finalMsg = 'You left with ' + 45 + ' minutes';
      if (this.time !== 0) {
        let a = this.time % 5;

        //console.log('a value.................' + a)
        if (a === 0) {

          let b = 45 - this.counter;
          //console.log('............' + this.counter);
          this.finalMsg2 = 'You left with ' + b + ' minutes';
          this.msg2 = true;
          this.msg1 = false;
          if (b === 43) {
            // confirm('Timeup!! Questions have been submitted')
            this.openModalWithComponent();
          }
          this.counter++;

        }
        this.msg2 = true;
      }

      if (this.time === 60) {
        this.minutes = this.time % 60;
        //console.log('minutes' + this.minutes);
      }

      // if (this.minutes === 0) {
      //   this.msg = `You have completed ${this.minutes} minutes`;
      // }
      this.msg = `You have completed ${this.hours_ + ':' + this.minutes_ + ':' + this.minutes} minutes`;
    });
  }
  mapTest(): void {
    let nameAgeMapping = new Map();

    nameAgeMapping.set('Lokesh', 37);
    nameAgeMapping.set('Raj', 35);
    nameAgeMapping.set('John', 40);
    nameAgeMapping.set('John', 66);

    //Iterate over map keys
    for (let key of nameAgeMapping.keys()) {
      console.log(key);                   //Lokesh Raj John
    }

    //Iterate over map values
    for (let value of nameAgeMapping.values()) {
      console.log(value);                 //37 35 40
    }



  }


}
