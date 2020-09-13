import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-resuable-dialog',
  templateUrl: './resuable-dialog.component.html',
  styleUrls: ['./resuable-dialog.component.css']
})
export class ResuableDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
