import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  btnName: string;
  constructor(private router: Router, public loginService: LoginService) {

    this.loginService.getBtnName().subscribe((resp: string) => {
      this.btnName = resp;
    });
  }

  ngOnInit() {
    this.btnName = 'Login';
  }
  login(): void {
    if (this.btnName === 'LogOut') {
      this.router.navigate(['logout']);
      this.loginService.setBtnName('Login');
    } else {
      this.router.navigate(['login']);

    }
  }
  register(){
    this.router.navigate(['register']);
  }
}
