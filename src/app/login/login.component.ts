import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { SharedService } from '../shared/shared.service';
import { HttpClient } from '@angular/common/http';
import { PatternResponse } from '../model/pattern-response';
import {RegisterRequest} from "../model/register-request";
import {RegisterResponse} from "../model/register-response";
import {RegisterService} from "../register/register.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showError: boolean;
  errorMessage = 'No Candidate found, Please complete registration';
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  result: number;
  showSpinner: boolean;
  constructor(private router: Router, private http: HttpClient, private renderer: Renderer2,
    private loginService: LoginService, private sharedService: SharedService, public  snackBar: MatSnackBar) { }

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
    const password = this.loginForm.value.password;

    console.log('user name ' + email)
    if (email.indexOf('mphasis.com') > 0) {
      console.log(email);
        this.loginService.successLogin = true;
      this.router.navigate(['upload']);
      this.loginService.mphaisUserName = email;
      this.loginService.isMphasisUserLoggedIn = true;
      this.showSnackBar('Login Success');
      this.sharedService.getFinalResultSubjectValue().subscribe((resp: number) => {
        this.result = resp;
      });
    } else {
      let validateRequest = new RegisterRequest();
      validateRequest.email = email;
      validateRequest.password  = password;
      this.showSpinner = true;
      this.loginService.validateCandidate(validateRequest).subscribe((resp:RegisterResponse)=>{
        console.log(resp);
        if(resp.message === 'validuser'){
          this.router.navigate(['question-paper']);
          this.loginService.candidateUserName = email;
          this.loginService.isMphasisUserLoggedIn = false;
          this.loginService.isCandidate = true;
          this.showSpinner = false;
          this.showSnackBar('Login Success');
        } else {
          this.showSpinner = false;
          this.showError = true;
          this.router.navigate(['login']);
          this.showSnackBar(this.errorMessage);
        }
      }, error => { this.showError = true;  this.showSpinner = false; this.showSnackBar(this.errorMessage)});

    }


  }
  showSnackBar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-primary']

    });
  }



}
