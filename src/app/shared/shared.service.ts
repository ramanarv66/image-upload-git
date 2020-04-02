import { Injectable } from '@angular/core';
import { QuestionOptions } from '../model/question-options';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  questionOptions: QuestionOptions[] = [];
  finalAnswers = [];
  noQuestionsFound: boolean;
  uploadSuccess: boolean;
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
}
