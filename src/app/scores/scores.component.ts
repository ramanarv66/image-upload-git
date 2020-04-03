import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {

  result: number;
  constructor(private sharedService: SharedService, private loginService: LoginService) { }

  ngOnInit() {
    this.sharedService.getFinalResultSubjectValue().subscribe((resp: number) => {
      this.result = resp;
    });
  }

}
