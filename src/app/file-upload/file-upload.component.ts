import { Component, OnInit } from '@angular/core';
import { QuestionOptions, OptionsAll } from '../model/question-options';
import { TempOptions } from '../temp-options';
import { HttpClient } from '@angular/common/http';
import { QuestionPaperRequest } from '../question-paper-request';
import { LoginService } from '../login.service';
import { QuestionPaperResponse } from '../model/question-paper-response';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  fileContent: any = null;
  //questionAnswersMap = new Map();
  temp: any;
  score: number;
  selected: string;
  eachOpt: string;
  questions = [];
  onlyAnswers = [];
  eachQuestions = [];
  eachOptions = [];
  madOptions: TempOptions;
  tempArray = [];
  options = [];
  tempABCD = [];
  chunkedArray = [];
  finalOptions = [];
  finalAnswers = [];
  tempActualAnswers = [];
  userAnswers = [];
  questionOptions: QuestionOptions[] = [];
  showError: boolean;
  message: string;
  sample: string[] = ['a', ' callable b', 'Runnable c', 'Threads d', 'None e', 'd'];
  sampleArray: string[] = ['a.callable b.Runnable c.Threads d.None e.d', 'a.8 b.9 c.3 d.11 e.b', 'a.true b.false c.compilation issue d.Runtime exception e.b'];
  constructor(private http: HttpClient, private loginService: LoginService, private sharedService: SharedService) { }

  ngOnInit() {
  }


  public onChange(fileList: FileList): void {
    const file = fileList[0];
    const fileReader = new FileReader();


    fileReader.onload = (e) => {
      console.log(fileReader.result);
      this.temp = fileReader.result.toString().split('\n');

      for (let i = 0; i < this.temp.length; ++i) {
        if (this.temp[i].trim()) {
          this.questions[i] = this.temp[i].trim();
        }

      }
    };


    fileReader.readAsText(file);
  }

  processQuestions(fileContent: any): any {
    console.log(fileContent);
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
          // this.tempABCD = this.divideArray(this.tempArray, 4);
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
      // this.tempABCD = this.divideArray(this.finalOptions, 4);
      this.showError = false;
      questionsFinal.push(tempQuestion);
      id++;
    }
    this.questionOptions = questionsFinal;
    console.log(this.questionOptions);
    // this code is to get the answers
    this.finalAnswers = this.getOnlyAnswers(this.onlyAnswers);
    console.log(this.finalAnswers);
    this.sharedService.setAnswersKey(this.finalAnswers);
    this.sharedService.uploadSuccess = true;
    const questionPaperRequest = new QuestionPaperRequest();
    questionPaperRequest.questionOptions = this.questionOptions;
    this.sharedService.setQuestionOptions(this.questionOptions);
    localStorage.setItem('questions', '' + this.questions);
    questionPaperRequest.questionOptions = this.questionOptions;
    console.log(questionPaperRequest);
    this.http.post('http://localhost:8080/upload/save-questions', questionPaperRequest).
      subscribe((resp: boolean) => {
        console.log(resp);
      }, () => { })
      // questionPaperRequest.versionId = 22;
      // questionPaperRequest.questionPaperContent = '' + this.questions;
      // questionPaperRequest.questionPaperContent = questionPaperRequest.questionPaperContent.replace(',', ' ');
      // console.log(questionPaperRequest.questionPaperContent.replace(',', ' '));
      // questionPaperRequest.uploadedBy = 'Ram'
      ;
    // this.http.post('http://localhost:8081/upload/save-questions', questionPaperRequest).subscribe((resp: boolean) => {
    //   console.log(resp);
    // }, () => { })
    // this.http.post('http://localhost:8081/upload/save-questions', questionPaperRequest).subscribe((resp: boolean) => {
    //   console.log(resp);
    // }, () => { })


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
    this.loginService.questionAnswersMap.set(val.target.id, val.target.value);
  }


}
