import {Component, OnInit, ViewChild} from '@angular/core';
import {CandidateInterface} from "../model/candidate-interface";
import {ScoreService} from "../score.service";
import { Chart } from 'chart.js';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  /*@ViewChild(BaseChartDirective, {static:true}) chart: BaseChartDirective;
  constructor() { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
*/
  scoresData: any;
  Linechart = [];
  pieChart = [];
  doughnutChart = [];
  polarChart = [];
  excellent = 0;
  good = 0;
  cantry = 0;
  notcleared = 0;
  constructor(public scoreService: ScoreService) { }
  ngOnInit() {
    this.scoreService.getScores().subscribe((resp: CandidateInterface[]) => {

      this.scoresData = resp['scoresList'];
      console.log(this.scoresData);
      this.scoresData.forEach( a => {
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
      this.Linechart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: ['Excellent', 'Good', 'Cantry', 'Rejected'],
          datasets: [{
            data: [this.excellent, this.good, this.cantry, this.notcleared],
            borderColor: '#70B9FF',
            backgroundColor: "#af53ff",
          }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }
            ],
            yAxes: [{
              display: true,
              stacked: true
            }
            ],
          }
        }
      });
      this.pieChart = new Chart('canvas-pie', {
        type: 'pie',
        data: {
          labels: ['Excellent', 'Good', 'Cantry', 'Rejected'],
          datasets: [
            {
              data: [this.excellent, this.good, this.cantry, this.notcleared],
              borderColor: '#70B9FF',
              backgroundColor: [
                "#3cb371",
                "#6eb5ff",
                "#ff8123",
                "#e41831",
              ],
              fill: true
            }
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
      this.doughnutChart = new Chart('canvas-doughnut', {
        type: 'doughnut',
        data: {
          labels: ['Excellent', 'Good', 'Cantry', 'Rejected'],
          datasets: [
            {
              data: [this.excellent, this.good, this.cantry, this.notcleared],
              borderColor: '#70B9FF',
              backgroundColor: [
                "#23FF82",
                "#8C94FF",
                "#FFA469",
                "#ff8123",
              ],
              fill: true
            }
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: false
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
      this.polarChart = new Chart('canvas-polar', {
        type: 'polarArea',
        data: {
          labels: ['Excellent', 'Good', 'Cantry', 'Rejected'],
          datasets: [
            {
              data: [this.excellent, this.good, this.cantry, this.notcleared],
              borderColor: '#70B9FF',
              backgroundColor: [
                '#F7464A', '#46BFBD', '#FDB45C', '#70B9FF'
              ],
            }
          ],
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: false
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }
}
