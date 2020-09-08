import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as xlsx from 'xlsx';
import {CandidateInterface} from '../model/candidate-interface';
import {SharedService} from "../shared/shared.service";
import {MatSort, MatTableDataSource} from "@angular/material";
import {MatPaginator} from '@angular/material/paginator';
@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
   canidateData: CandidateInterface[] = [];
  ELEMENT_DATA: CandidateInterface[] = [];
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'phone', 'city', 'username'];
  dataSource = new MatTableDataSource<CandidateInterface>(this.ELEMENT_DATA);
  clubs = [
    {
      position: 1,
      name: "Liverpool",
      played: 20,
      won: 19,
      drawn: 1,
      lost: 0,
      points: 58
    },
    {
      position: 2,
      name: "Leicester City",
      played: 21,
      won: 14,
      drawn: 3,
      lost: 4,
      points: 45
    },
    {
      position: 3,
      name: "Manchester City",
      played: 21,
      won: 14,
      drawn: 2,
      lost: 5,
      points: 44
    },
    {
      position: 4,
      name: "Chelsea",
      played: 21,
      won: 11,
      drawn: 3,
      lost: 7,
      points: 36
    },
    {
      position: 5,
      name: "Manchester United",
      played: 21,
      won: 8,
      drawn: 7,
      lost: 6,
      points: 31
    }
  ];
  constructor(private shared:SharedService) {


  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.shared.getCandidatesList().subscribe((response: CandidateInterface[])=>{
      this.canidateData = response;
      this.ELEMENT_DATA = response;
      console.log(this.canidateData['candidateDtoList']);
      this.dataSource.data= this.ELEMENT_DATA['candidateDtoList'];
      console.log(response);

    },()=>{});
  }
  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }
  applyFilter(val: string) {
    this.dataSource.filter = val;
  }

}
