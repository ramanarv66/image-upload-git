import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { LoginService } from '../login.service';
import { ScoreService } from '../score.service';
import { ScoreListResponse, ScoreResponse } from '../model/score-response';
import {CandidateInterface} from "../model/candidate-interface";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import * as xlsx from "xlsx";

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
  excellent = 0;
  good = 0;
  cantry = 0;
  notcleared = 0;
  todayDate:string;
  ELEMENT_DATA: CandidateInterface[] = [];
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource = new MatTableDataSource<CandidateInterface>(this.ELEMENT_DATA);
scoresData = [];
  showSpinner: boolean;
  totalCandidates = 0;
  columnDefs = [
    { headerName: 'Email', field: 'email' },
    { headerName: 'Score', field: 'score' },
    { headerName: 'id', field: 'id' }
  ];
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'phone', 'city', 'username', 'score', 'status'];
  constructor(public sharedService: SharedService, public scoreService: ScoreService, public loginService: LoginService) { }

  ngOnInit() {
    this.sharedService.getFinalResultSubjectValue().subscribe((resp: number) => {
      this.result = resp;
    });
    this.getDate();
    this.showSpinner = true;
    this.scoreService.getScores().subscribe((resp: CandidateInterface[]) => {
    this.showSpinner = false;
      console.log(resp);
      this.scoresData = resp['scoresList'];
      this.dataSource.data = this.scoresData;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.scoresData.forEach( a => {
        this.totalCandidates = this.totalCandidates + 1;
        if(a.score <= 5){
          this.notcleared = this.notcleared +1;
        } else if(a.score > 5 && a.score < 8){
          this.cantry = this.cantry +1;
        } else if(a.score >=8 && a.score < 12){
          this.good = this.good + 1;
        }else if(a.score >=12){
          this.excellent = this.excellent +1;
        }
      })

    }, error => this.showSpinner = false);
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Scores-Sheet' + '( '+ this.totalCandidates + ' )'+'Candidates');
    xlsx.writeFile(wb, 'Scores '+this.getDate()+'.xlsx');
  }
  applyFilter(val: string) {
    this.dataSource.filter = val;
  }
  getDate(): string{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var time = today.getHours()+ '_' + today.getMinutes() + '_' + today.getSeconds();
  return  this.todayDate = mm + '/' + dd + '/' + yyyy + '/' + time;
  }
}
