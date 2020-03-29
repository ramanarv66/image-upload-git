import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

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
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
  }
  login() {
    this.loginService.setBtnName('LogOut');
    const email = this.loginForm.value.email;
    if (email.indexOf('mphasis.com') > 0) {
      console.log(email);
      this.router.navigate(['upload']);
      this.loginService.isMphasisUserLoggedIn = true;
    } else {
      this.router.navigate(['question-paper']);
      this.loginService.isMphasisUserLoggedIn = false;
    }

  }



}
