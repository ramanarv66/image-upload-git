import { Injectable } from '@angular/core';
import { ScoreRequest } from './model/score-request';
import { HttpClient } from '@angular/common/http';
import { ScoreListResponse } from './model/score-response';
import { Observable } from 'rxjs';
import { CandidateInterface } from "./model/candidate-interface";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  scoreData: any;
  constructor(private http: HttpClient) { }

  saveScores(scoreRequest: ScoreRequest) {
    this.http.post('http://localhost:8080/upload/save-answers', scoreRequest).subscribe(
      (resp: boolean) => {
        confirm('Successfully Submitted');
      }, (error: Error) => {
        confirm('Error While submitting test, please ask HR for further actioin');
      }
    );

  }
  // getScores(): Observable<ScoreListResponse> {
  //   return this.http.get<ScoreListResponse>('http://localhost:8080/upload/scores');
  // }
  getScores(): Observable<CandidateInterface[]> {
    return this.http.get<CandidateInterface[]>(environment.getScoresUrl);
  }

  sendScoresEmail(email: string, status: string, score: number, name: string): void {
    // let scoreReq = {};
    // scoreReq['email'] = email;
    // scoreReq['score'] = score;
    // scoreReq['status'] = status;
    // scoreReq['firstname'] = name;
    let scoreObj = new ScoreRequest();
    scoreObj.email = email;
    scoreObj.firstname = name;
    scoreObj.status = status;
    scoreObj.score = score;
    this.http.post(environment.sendStatusEmail, scoreObj).subscribe(() => { });
  }
}
