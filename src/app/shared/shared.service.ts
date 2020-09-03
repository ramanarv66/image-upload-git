import { Injectable } from '@angular/core';
import { QuestionOptions } from '../model/question-options';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { ScoreListResponse } from '../model/score-response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  questionOptions: QuestionOptions[] = [];
  finalAnswers = [];
  noQuestionsFound: boolean;
  uploadSuccess: boolean;
  finalResult: number;
  responseFromModal = new BehaviorSubject<any>('');
  finalResultSubject = new BehaviorSubject<number>(0);
  constructor(private http: HttpClient) { }
  setQuestionOptions(quesOptions: QuestionOptions[]) {
    this.questionOptions = quesOptions;

  }
  getQuestionOptions(): QuestionOptions[] {
    return this.questionOptions;
  }

  setAnswersKey(answers: string[]) {
    this.finalAnswers = answers;
  }
  getAnswerKey(): string[] {
    return this.finalAnswers;
  }
  setFinalResultSubjectValue(result: number) {
    this.finalResultSubject.next(result);
  }

  getFinalResultSubjectValue(): Observable<number> {
    return this.finalResultSubject.asObservable();
  }
  setResponse(resp: any): void {
    this.responseFromModal.next(resp);
  }
  getResponse(): Observable<any> {
    return this.responseFromModal.asObservable();
  }


}
