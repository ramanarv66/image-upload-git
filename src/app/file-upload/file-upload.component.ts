import { Component, OnInit } from '@angular/core';
import { QuestionOptions, OptionsAll } from '../model/question-options';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  fileContent: any = null;
  temp: any;
  eachOpt: string;
  questions = [];
  eachQuestions = [];
  eachOptions = [];
  tempArray = [];
  options = [];
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
    console.log(this.finalOptions)
    for (let index = 0; index < this.finalOptions.length; index++) {


    }
  }
  formate(): void {

    if (this.eachQuestions) {
      this.showError = true;
    }
    this.questions.forEach(a => console.log(a));
    for (let index = 0; index < this.questions.length; index = index + 2) {
      const tempQuestion = new QuestionOptions();
      tempQuestion.question = this.questions[index];
      this.eachQuestions.push(this.questions[index]);
      this.options.push((this.questions[index + 1]));
      this.showError = false;
    }
    this.options.forEach(a => {
      a.split('.').forEach(x => {
        if (x !== '') {

          const temp = '' + x.substring(0, x.length - 1).trim();
          if (temp !== '') {
            let obj = new OptionsAll();
            this.finalOptions.push(obj)
          }

        }
      });
    });
  }

  test1() {
    //a) callable b)Runnable c)Threads d)None e)d
    this.sampleArray.forEach(a => {
      console.log(a);
      a.split('.').forEach(x => { this.tempArray.push(x); console.log(x) })
    });
    // this.sampleArray.forEach(a => {
    //   console.log(a);
    //   a.split(')').forEach(x => { x.split('').forEach(z => { this.tempArray.push(z); console.log(z) }) })
    // });
    console.log('okkkkkkkkkkkk')
    // console.log(this.tempArray)

    this.tempArray.forEach(element => {
      const str = '' + element;
      console.log(str.substring(0, str.length - 1));
      this.finalOptions_.push(str.substring(0, str.length - 1));
    });
  }

}
