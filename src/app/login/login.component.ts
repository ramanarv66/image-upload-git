import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { SharedService } from '../shared/shared.service';
import { HttpClient } from '@angular/common/http';
import { PatternResponse } from '../model/pattern-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  result: number;
  constructor(private router: Router, private http: HttpClient, private renderer: Renderer2,
    private loginService: LoginService, private sharedService: SharedService) { }

  testResult(): void {
    this.http.get('http://localhost:8080/getpaper').subscribe((res: PatternResponse) => {
      console.log(res);
    });

  }
  @HostListener('document:keydown.control.t', ['$event'])
  doSomething(event) {
    alert();
    event.preventDefault();
  }

  ngOnInit() {
    this.renderer.listen(document, 'keydown.meta.k', (event) => {
      alert('hello1')
    });
    window.addEventListener('beforeunload', (event) => {
      console.log(event);
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Chrome requires returnValue to be set.
      alert('before unload Click not allowed');
      event.returnValue = '';

    });
  }
  // onRightClick($event) {
  //   alert('Right Click not allowed');
  //   return false;
  // }
  login() {
    this.loginService.setBtnName('LogOut');
    const email = this.loginForm.value.email;
    console.log('user name ' + email)
    if (email.indexOf('mphasis.com') > 0) {
      console.log(email);
        this.loginService.successLogin = true;
      this.router.navigate(['upload']);
      this.loginService.mphaisUserName = email;
      this.loginService.isMphasisUserLoggedIn = true;
      this.sharedService.getFinalResultSubjectValue().subscribe((resp: number) => {
        this.result = resp;
      });
    } else {

      this.router.navigate(['question-paper']);
      this.loginService.candidateUserName = email;
      this.loginService.isMphasisUserLoggedIn = false;
      this.loginService.isCandidate = true;
    }


  }




}
