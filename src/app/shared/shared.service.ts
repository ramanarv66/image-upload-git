import { Injectable } from '@angular/core';
import { QuestionOptions } from '../model/question-options';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  questionOptions: QuestionOptions[] = [];
  finalAnswers = [];
  noQuestionsFound: boolean;
  uploadSuccess: boolean;
  finalResult: number;
  finalResultSubject = new BehaviorSubject<number>(0);
  constructor() { }
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
}
