import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "./model/register-request";
import {RegisterResponse} from "./model/register-response";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isMphasisUserLoggedIn: boolean;
    successLogin: boolean;

  questionAnswersMap = new Map();
  loginBtnSubject = new BehaviorSubject('');
  btnLabel = 'Login';
  candidateUserName: string;
  mphaisUserName: string;
  isCandidate: boolean;
  constructor(public http:HttpClient) { }

  setBtnName(btnName: string) {
    this.loginBtnSubject.next(btnName);
  }
  getBtnName(): Observable<string> {
    return this.loginBtnSubject.asObservable();
  }
  validateCandidate(candidateRequest: RegisterRequest):Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(environment.validateUrl,candidateRequest);

  }
}
