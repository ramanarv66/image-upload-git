import { Component, OnInit } from '@angular/core';
import { QuestionOptions, OptionsAll } from '../model/question-options';
import { TempOptions } from '../temp-options';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  fileContent: any = null;
  temp: any;
  selected: string;
  eachOpt: string;
  questions = [];
  eachQuestions = [];
  eachOptions = [];
  madOptions: TempOptions;
  tempArray = [];
  options = [];
  tempABCD = [];
  chunked_arr = [];
  finalOptions: OptionsAll[] = [];
  finalOptions_ = [];
  questionOptions: QuestionOptions[] = [];
  showError: boolean;
  sample: string[] = ['a', ' callable b', 'Runnable c', 'Threads d', 'None e', 'd'];
  sampleArray: string[] = ['a.callable b.Runnable c.Threads d.None e.d', 'a.8 b.9 c.3 d.11 e.b', 'a.true b.false c.compilation issue d.Runtime exception e.b'];
  constructor() { }

  ngOnInit() {
  }


  public onChange(fileList: FileList): void {
    let file = fileList[0];
    let fileReader = new FileReader();


    fileReader.onload = (e) => {
      console.log(fileReader.result);
      this.temp = fileReader.result.toString().split('\n');

      for (var i = 0; i < this.temp.length; ++i) {
        this.questions[i] = this.temp[i].trim();

      }
    }


    fileReader.readAsText(file);
  }

  processQuestions(fileContent: any): any {
    console.log(fileContent);
  }
  revalidate(): void {
    // console.log(this.eachQuestions);
    // console.log(this.tempArray);
    console.log('jjjjjjjjjjjjjj')
    console.log(this.eachQuestions);
    console.log('final options')
    console.log(this.tempABCD)
    let mad: TempOptions[] = [];

    this.tempABCD.forEach(a => { mad.push(a) });
    console.log(mad)

  }

  divideOptions(element: string): string[] {
    console.log(element)
    if (element) {
      element.split('.').forEach(firstOption => {
        const tempOption = '' + firstOption.substring(0, firstOption.length - 1).trim();
        if (tempOption !== '') {
          this.tempArray.push(tempOption);
          //this.tempABCD = this.divideArray(this.tempArray, 4);
        }

      });
      return this.tempArray;
    }

  }
  formate(): void {
    let mad: TempOptions[] = [];
    let madQue = new TempOptions();
    if (this.eachQuestions) {
      this.showError = true;
    }

    let questions: QuestionOptions[] = [];

    this.questions.forEach(a => console.log(a));
    let id = 1;
    for (let index = 0; index < this.questions.length; index = index + 2) {
      const tempQuestion = new QuestionOptions();
      tempQuestion.question = this.questions[index];
      tempQuestion.id = id;

      const eachOptionAnswers = this.questions[index + 1];
      if (eachOptionAnswers !== '') {
        this.finalOptions_ = this.divideOptions(eachOptionAnswers);
        if (this.finalOptions_) {
          this.finalOptions_.forEach(element => {
            if (element !== '') {
              tempQuestion.options.push(element);
            }
          });
        }
      }


      this.finalOptions_ = [];
      this.tempArray = [];
      // this.tempABCD = this.divideArray(this.finalOptions_, 4);
      this.showError = false;
      questions.push(tempQuestion);
      id++;
    }
    this.questionOptions = questions;
    console.log(this.questionOptions);

  }


  test1() {
    //a) callable b)Runnable c)Threads d)None e)d
    this.sampleArray.forEach(a => {
      console.log(a);
      a.split('.').forEach(x => { this.tempArray.push(x); console.log(x) })
    });
    console.log('okkkkkkkkkkkk');

    this.tempArray.forEach(element => {
      const str = '' + element;
      console.log();
      if (str.substring(0, str.length - 1) !== '') {
        this.finalOptions_.push(str.substring(0, str.length - 1));
      }
    });
    console.log(this.finalOptions_);
    let index = 0;
    const size = 4;
    while (index < this.finalOptions_.length) {
      this.chunked_arr.push(this.finalOptions_.slice(index, size + index));
      index += size;
    }
    console.log(this.chunked_arr);
  }

  divideArray(arr: any[], size: number): any[] {
    let index = 0;
    while (index < arr.length) {
      this.chunked_arr.push(arr.slice(index, size + index));
      index += size;
    }
    return this.chunked_arr;
  }

}
