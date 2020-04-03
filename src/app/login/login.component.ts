import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { SharedService } from '../shared/shared.service';

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
  constructor(private router: Router, private loginService: LoginService, private sharedService: SharedService) { }

  ngOnInit() {
  }
  login() {
    this.loginService.setBtnName('LogOut');
    const email = this.loginForm.value.email;
    console.log('user name ' + email)
    if (email.indexOf('mphasis.com') > 0) {
      console.log(email);
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
