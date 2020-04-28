import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { LoginService } from '../login.service';
import { ScoreService } from '../score.service';
import { ScoreListResponse, ScoreResponse } from '../model/score-response';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {

  result: number;
  scores: ScoreListResponse;
  scoreList: ScoreResponse[] = [];
  rowData: ScoreResponse[] = [];
  columnDefs = [
    { headerName: 'Email', field: 'email' },
    { headerName: 'Score', field: 'score' },
    { headerName: 'id', field: 'id' }
  ];

  constructor(public sharedService: SharedService, public scoreService: ScoreService, public loginService: LoginService) { }

  ngOnInit() {
    this.sharedService.getFinalResultSubjectValue().subscribe((resp: number) => {
      this.result = resp;
    });
    this.scoreService.getScores().subscribe((resp: ScoreListResponse) => {
      this.scoreList = resp.scoresList;
      this.rowData = resp.scoresList;
      console.log(this.scoreList);
    });
  }

}
