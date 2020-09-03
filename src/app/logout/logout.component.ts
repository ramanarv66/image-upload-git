import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../login.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit, OnDestroy {

  constructor(public loginService: LoginService, public sharedService: SharedService) { }

  ngOnInit() {
    this.loginService.isMphasisUserLoggedIn = false;
    if (this.sharedService.noQuestionsFound) {
      this.loginService.isCandidate = false;
      return;
    }
    if (this.loginService.isMphasisUserLoggedIn) {
      this.sharedService.noQuestionsFound = false;
    }
    if (this.sharedService.uploadSuccess) {
      this.sharedService.noQuestionsFound = false;
    }
    this.loginService.successLogin = false;
  }
  ngOnDestroy() {

    console.log('ondestry called');
  }

}
