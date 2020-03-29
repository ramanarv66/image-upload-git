import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isMphasisUserLoggedIn: boolean;
  loginBtnSubject = new BehaviorSubject('');
  btnLabel = 'Login';
  constructor() { }

  setBtnName(btnName: string) {
    this.loginBtnSubject.next(btnName);
  }
  getBtnName(): Observable<string> {
    return this.loginBtnSubject.asObservable();
  }
}
