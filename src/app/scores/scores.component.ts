import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { LoginService } from '../login.service';
import { ScoreService } from '../score.service';
import { ScoreListResponse, ScoreResponse } from '../model/score-response';
import { CandidateInterface, DisplayScores } from '../model/candidate-interface';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import * as xlsx from 'xlsx';
import {ResuableDialogComponent} from '../resuable-dialog/resuable-dialog.component';

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
  showExcellent: boolean;
  excellent = 0;
  good = 0;
  cantry = 0;
  notcleared = 0;
  todayDate: string;
  showEmailSuccess: boolean;
  showSpinner: boolean;
  ELEMENT_DATA: CandidateInterface[] = [];
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource = new MatTableDataSource<CandidateInterface>(this.ELEMENT_DATA);
  dataSource2 = new MatTableDataSource<DisplayScores>();
  dataSource3 = new MatTableDataSource<DisplayScores>();
  dataSource4 = new MatTableDataSource<DisplayScores>();
  dataSource5 = new MatTableDataSource<DisplayScores>();

  scoresData = [];
  showGood: boolean;
  showCantry: boolean;
  showRejected: boolean;
  totalCandidates = 0;
  columnDefs = [
    { headerName: 'Email', field: 'email' },
    { headerName: 'Score', field: 'score' },
    { headerName: 'id', field: 'id' }
  ];
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'phone', 'username', 'score', 'status', 'email'];
  displayHoverColumns: string[] = ['username', 'score'];
  constructor(public sharedService: SharedService
    ,         public dialog: MatDialog, public scoreService: ScoreService, public loginService: LoginService) { }

  displayExcellentScores: DisplayScores[] = [];
  displayGoodScores: DisplayScores[] = [];
  displayCanScores: DisplayScores[] = [];
  displayRejectedScores: DisplayScores[] = [];


  ngOnInit() {
    this.sharedService.getFinalResultSubjectValue().subscribe((resp: number) => {
      this.result = resp;
      this.scoreService.getScores().subscribe((resp: CandidateInterface[]) => {
        this.showSpinner = false;

        console.log(resp);
        this.scoresData = resp['scoresList'];
        this.scoreService.scoreData = this.scoresData;
        this.dataSource.data = this.scoresData;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.scoresData.forEach(a => {
          const displayExcellentScoreObj = new DisplayScores();
          const displayGoodScoreObj = new DisplayScores();
          const displayCantryScoreObj = new DisplayScores();
          const displayRejectedScoreObj = new DisplayScores();
          this.totalCandidates = this.totalCandidates + 1;
          if (a.score <= 5) {
            this.notcleared = this.notcleared + 1;
            displayRejectedScoreObj.score = a.score;
            displayRejectedScoreObj.status = 'Rejected';
            displayRejectedScoreObj.username = a.username;
            this.displayRejectedScores.push(displayRejectedScoreObj);
          } else if (a.score > 5 && a.score < 8) {
            this.cantry = this.cantry + 1;
            displayCantryScoreObj.score = a.score;
            displayCantryScoreObj.status = 'CanTry';
            displayCantryScoreObj.username = a.username;
            this.displayCanScores.push(displayCantryScoreObj);
          } else if (a.score >= 8 && a.score < 12) {
            this.good = this.good + 1;
            displayGoodScoreObj.score = a.score;
            displayGoodScoreObj.status = 'Good';
            displayGoodScoreObj.username = a.username;
            this.displayGoodScores.push(displayGoodScoreObj);
          } else if (a.score >= 12) {
            this.excellent = this.excellent + 1;
            displayExcellentScoreObj.score = a.score;
            displayExcellentScoreObj.status = 'Excellent';
            displayExcellentScoreObj.username = a.username;

            this.displayExcellentScores.push(displayExcellentScoreObj);
          }
        }

        );


      }, error => this.showSpinner = false);
    });
    this.getDate();
    this.showSpinner = true;
    this.dataSource2.data = this.displayExcellentScores;
    this.dataSource3.data = this.displayGoodScores;
    this.dataSource4.data = this.displayCanScores;
    this.dataSource5.data = this.displayRejectedScores;
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Scores-Sheet' + '( ' + this.totalCandidates + ' )' + 'Candidates');
    xlsx.writeFile(wb, 'Scores ' + this.getDate() + '.xlsx');
  }
  applyFilter(val: string) {
    this.dataSource.filter = val;
  }
  getDate(): string {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let time = today.getHours() + '_' + today.getMinutes() + '_' + today.getSeconds();
    return this.todayDate = mm + '/' + dd + '/' + yyyy + '/' + time;
  }

  excellentEnter(event: any) {
    console.log(event.currentTarget.id);
    if (event.currentTarget.id === 'excellent') {
      this.showExcellent = true;
    }
    if (event.currentTarget.id === 'good') {
      this.showGood = true;
    }
    if (event.currentTarget.id === 'canTry') {
      this.showCantry = true;
    }
    if (event.currentTarget.id === 'rejected') {
      this.showRejected = true;
    }
  }
  excellentLeave(event: any) {
    if (event.currentTarget.id === 'excellent') {
      this.showExcellent = false;
    }
    if (event.currentTarget.id === 'good') {
      this.showGood = false;
    }
    if (event.currentTarget.id === 'canTry') {
      this.showCantry = false;
    }
    if (event.currentTarget.id === 'rejected') {
      this.showRejected = false;
    }
  }
  emailClick(a: number, email: string, firstname: string) {
    // this.showEmailSuccess = true;
    // setTimeout(() => { this.showEmailSuccess = false; }, 60000);
    let status = '';
    const score = a;
    const dialogRef =  this.dialog.open(ResuableDialogComponent, {
      data: { dialogText: 'emailDialog' },
    });
    if (a <= 5) {

      status = 'rejected;';
      this.scoreService.sendScoresEmail(email, status, score, firstname);
    } else if (a > 5 && a < 8) {

      status = 'canTry';
      this.scoreService.sendScoresEmail(email, status, score, firstname);
    } else if (a >= 8 && a < 12) {

      status = 'good';
      this.scoreService.sendScoresEmail(email, status, score, firstname);
    } else if (a >= 12) {
      status = 'excellent';
      this.scoreService.sendScoresEmail(email, status, score, firstname);

    }
  }
}
