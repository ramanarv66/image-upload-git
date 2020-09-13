import { Component, OnInit } from '@angular/core';
import { QuestionOptions } from '../model/question-options';
import { SharedService } from '../shared/shared.service';
import { ScoreRequest } from '../model/score-request';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';
import { ScoreService } from '../score.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Modal1Component } from '../modal1/modal1.component';
import { timer } from 'rxjs';
import {ScoreResponse} from "../model/score-response";

@Component({
  selector: 'app-question-paper',
  templateUrl: './question-paper.component.html',
  styleUrls: ['./question-paper.component.css']
})
export class QuestionPaperComponent implements OnInit {

  fileContent: any = null;
  questionAnswersMap = new Map();
  temp: any;
  score: number;
  questions = [];
  onlyAnswers = [];
  eachQuestions = [];
  tempArray = [];
  chunkedArray = [];
  finalOptions = [];
  finalAnswers = [];
  tempActualAnswers = [];
  userAnswers = [];
  questionOptions: QuestionOptions[] = [];
  showError: boolean;
  paperUpload: boolean;
  isSubmitted: boolean;
  message: string;
  items = [];
  paper: any;
  pageOfItems: Array<any>;
  // Variables for timer

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

  // Variables ended
  constructor(private sharedService: SharedService, private modalService: BsModalService,
    private scoreService: ScoreService,
    private loginService: LoginService) {
    console.log(this.sharedService.getQuestionOptions());
    this.questionOptions = this.sharedService.getQuestionOptions();
    console.log(this.questionOptions)
    this.finalAnswers = this.sharedService.getAnswerKey();
    if (this.questionOptions.length === 0) {
      this.paperUpload = true;
      this.sharedService.noQuestionsFound = true;
    }
  }


  ngOnInit() {

    this.createTimer();
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  divideOptions(element: string): string[] {
    let i = 0;
    if (element) {
      element.split('.').forEach(firstOption => {
        const tempOption = '' + firstOption.substring(0, firstOption.length - 1).trim();
        if (tempOption !== '') {
          // this.tempArray.push(tempOption);
          if (i === 0) {
            this.tempArray[i] = 'a.' + tempOption;
          }
          if (i === 1) {
            this.tempArray[i] = 'b.' + tempOption;
          }
          if (i === 2) {
            this.tempArray[i] = 'c.' + tempOption;
          }
          if (i === 3) {
            this.tempArray[i] = 'd.' + tempOption;
          }

          i++;
        }

      });
      return this.tempArray;
    }

  }

  getOnlyAnswers(answers: string[]): string[] {

    answers.forEach(a => {
      this.tempActualAnswers.push(a.substr(a.length - 1, a.length));
    });

    return this.tempActualAnswers;

  }
  formate(): void {
    if (this.eachQuestions) {
      this.showError = true;
    }

    const questionsFinal: QuestionOptions[] = [];
    this.questions.forEach(a => console.log(a));
    let id = 1;
    for (let index = 0; index < this.questions.length; index = index + 2) {
      const tempQuestion = new QuestionOptions();
      if (this.questions[index] !== '' && this.questions[index] !== undefined) {
        tempQuestion.question = this.questions[index];
        tempQuestion.id = id;
        const eachOptionAnswers = this.questions[index + 1];
        this.onlyAnswers.push(eachOptionAnswers);
        if (eachOptionAnswers !== undefined && eachOptionAnswers !== '') {
          this.finalOptions = this.divideOptions(eachOptionAnswers);
          if (this.finalOptions) {
            this.finalOptions.forEach(element => {
              if (element !== '' && element !== undefined) {
                tempQuestion.options.push(element);
              }
            });
          }
        }
      }
      this.finalOptions = [];
      this.tempArray = [];
      this.showError = false;
      questionsFinal.push(tempQuestion);
      id++;
    }
    this.questionOptions = questionsFinal;
    console.log(this.questionOptions);
    this.finalAnswers = this.getOnlyAnswers(this.onlyAnswers);
    console.log(this.finalAnswers);

  }

  divideArray(arr: any[], size: number): any[] {
    let index = 0;
    while (index < arr.length) {
      this.chunkedArray.push(arr.slice(index, size + index));
      index += size;
    }
    return this.chunkedArray;
  }
  optionValue(val: any) {
    this.questionAnswersMap.set(val.target.id, val.target.value);
  }

  validateAnswers(): void {
    this.isSubmitted = true;

    if (this.userAnswers.length !== this.finalAnswers.length) {
    }

    for (const key of this.questionAnswersMap.keys()) {
      console.log(key);
    }
    for (const value of this.questionAnswersMap.values()) {
      this.userAnswers.push(value.substr(0, 1));
    }
    let count = 0;
    for (let index = 0; index < this.userAnswers.length; index++) {

      if (this.userAnswers[index] === this.finalAnswers[index]) {
        console.log(this.userAnswers[index]);
        console.log(this.finalAnswers[index]);
        count++;
      }
      this.score = count;

    }
   /* if (this.score >= 0) {
      this.message = ' Thanks for taking test, Please wait.. You will get the result soon !!!!';

    }*/
    console.log('Corrected answers are ' + count);
    this.sharedService.finalResult = count;
    this.sharedService.setFinalResultSubjectValue(count);
    const scoreRequest = new ScoreRequest();
    scoreRequest.email = this.loginService.candidateUserName;
    scoreRequest.score = count;
    this.sharedService.saveScores(scoreRequest).subscribe((resp: ScoreResponse)=>{
      if( resp.message){
        this.message = ' Thanks for taking test, Please wait.. You will get the result soon !!!!';
      }
    })
   // this.scoreService.saveScores(scoreRequest);
    this.userAnswers = [];

  }
  // this method opens a modal

  openModalWithComponent() {
    const initialState = {
      // list: [
      //   'Open a modal with component',
      //   'Pass your data',
      //   'Do something else',
      //   '...'
      // ],
      // title: 'Modal with component',
      // name: 'Ramana'
      title: 'Time Up Modal',
      bodyMsg: 'Your time is Up!!! Questions will be auto submitted'
    };
    this.bsModalRef = this.modalService.show(Modal1Component, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }


  // this method creates a timer
  createTimer(): void {

    this.minutes_ = new Date().getMinutes();
    this.hours_ = new Date().getHours();

    this.counter = 1;
    this.msg1 = true;
    const myObservable = timer(1000, 1000);
    myObservable.subscribe(x => {
      this.time = x;
      this.finalMsg = 'You left with ' + 60 + ' minutes';
      if (this.time !== 0) {
        let a = this.time % 60;

        if (a === 0) {

          let b = 60 - this.counter;
          this.finalMsg2 = 'You left with ' + b + ' minutes';
          this.msg2 = true;
          this.msg1 = false;
          if (b === 60) {
            this.isSubmitted = true;
            this.openModalWithComponent();
          }
          this.counter++;

        }
        this.msg2 = true;
      }

      if (this.time === 60) {
        this.minutes = this.time % 60;
      }

      this.msg = `You have completed ${this.hours_ + ':' + this.minutes_ + ':' + this.minutes} minutes`;
    });

  }


}
