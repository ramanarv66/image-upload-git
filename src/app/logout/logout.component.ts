import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit, OnDestroy {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.isMphasisUserLoggedIn = false;
  }
  ngOnDestroy() {

    console.log('ondestry called')
  }

}
